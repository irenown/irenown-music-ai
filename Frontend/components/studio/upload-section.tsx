"use client"

import React, { useCallback, useState } from "react"
import type { ProjectData } from "./studio-interface"
import { Button } from "@/components/ui/button"
import { Upload, Mic, Music, Sparkles, X, Play, Pause, Volume2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"


interface UploadSectionProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  onStartProcessing: () => void
}

export function UploadSection({ projectData, setProjectData, onStartProcessing }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [tempRecordedFile, setTempRecordedFile] = useState<File | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMetronomeEnabled, setIsMetronomeEnabled] = useState(false)

  const mediaRecorderRef = React.useRef<any>(null)
  const chunksRef = React.useRef<any[]>([])
  const timerRef = React.useRef<any>(null)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  // Metronome Refs
  const audioContextRef = React.useRef<AudioContext | null>(null)
  const nextNoteTimeRef = React.useRef<number>(0)
  const timerIDRef = React.useRef<number | null>(null)
  const tempoRef = React.useRef<number>(projectData.tempo)

  // Update tempo ref when prop changes
  React.useEffect(() => {
    tempoRef.current = projectData.tempo
  }, [projectData.tempo])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('audio/')) {
        setProjectData({ ...projectData, vocalFile: file })
      }
    }
  }, [projectData, setProjectData])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProjectData({ ...projectData, vocalFile: file })
    }
  }, [projectData, setProjectData])

  const removeFile = useCallback(() => {
    setProjectData({ ...projectData, vocalFile: null })
  }, [projectData, setProjectData])

  // Metronome Logic
  const scheduleNote = (beatNumber: number, time: number) => {
    if (!audioContextRef.current) return;
    const osc = audioContextRef.current.createOscillator()
    const envelope = audioContextRef.current.createGain()

    osc.frequency.value = beatNumber % 4 === 0 ? 1000 : 800
    envelope.gain.value = 1
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001)
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02)

    osc.connect(envelope)
    envelope.connect(audioContextRef.current.destination)

    osc.start(time)
    osc.stop(time + 0.03)
  }

  const scheduler = () => {
    if (!audioContextRef.current) return;
    while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
      scheduleNote(0, nextNoteTimeRef.current) // Simplified to 1 beat type for now or track beat count
      const secondsPerBeat = 60.0 / tempoRef.current
      nextNoteTimeRef.current += secondsPerBeat
    }
    timerIDRef.current = window.setTimeout(scheduler, 25.0)
  }

  const startMetronome = () => {
    if (timerIDRef.current) return; // Already running

    const AudioContext = window.AudioContext || (window as any).webkitAudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }
    // Resume context if suspended (common browser policy)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    nextNoteTimeRef.current = audioContextRef.current.currentTime
    scheduler()
  }

  const stopMetronome = () => {
    if (timerIDRef.current) {
      window.clearTimeout(timerIDRef.current)
      timerIDRef.current = null
    }
    // We don't close the context here immediately if we want to restart quickly, 
    // but good practice to release resources if not recording.
    // actually, let's keep context open if recording, but if just stopping metronome... 
    // For now, let's just stop the scheduler.
  }

  // Effect to handle metronome on/off
  React.useEffect(() => {
    if (isMetronomeEnabled) {
      startMetronome();
    } else {
      stopMetronome();
    }
    // Cleanup
    return () => stopMetronome();
  }, [isMetronomeEnabled])


  const startRecording = async () => {
    try {
      // Clear any existing file to force UI reset
      if (projectData.vocalFile) {
        setProjectData({ ...projectData, vocalFile: null })
      }
      setRecordingComplete(false)
      setTempRecordedFile(null)
      setRecordingTime(0)

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" })
        const file = new File([blob], `recording_${new Date().getTime()}.wav`, { type: "audio/wav" })

        // Critical: Do NOT set projectData here. Set temp state.
        setTempRecordedFile(file)
        setRecordingComplete(true)

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)

    } catch (err) {
      console.error("Error accessing microphone:", err)
      alert("Could not access microphone. Please check permissions.")
    }
  }

  // ... (previous code)

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const handleUploadRecording = () => {
    if (tempRecordedFile) {
      setProjectData({ ...projectData, vocalFile: tempRecordedFile, duration: recordingTime })
      setRecordingComplete(false)
      setTempRecordedFile(null)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const togglePlayback = useCallback(() => {
    if (!projectData.vocalFile) return

    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      if (!audioRef.current) {
        const url = URL.createObjectURL(projectData.vocalFile)
        const audio = new Audio(url)
        audio.onended = () => setIsPlaying(false)
        audioRef.current = audio
      }
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [projectData.vocalFile, isPlaying])

  // Cleanup audio on unmount or file change
  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [projectData.vocalFile])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create New Track</h1>
        <p className="text-muted-foreground mt-1">Upload your vocals and let AI create magic</p>
      </div>

      {/* Upload Area */}
      {!projectData.vocalFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 border-dashed p-6 sm:p-12 text-center transition-all ${isDragging ? "border-primary bg-primary/10" : "border-border bg-card/50 hover:border-primary/50"
            }`}
        >
          <input
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.flac"
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full transition-colors ${isRecording ? "bg-red-500/20 animate-pulse" : "bg-primary/20"
              }`}>
              {isRecording ? (
                <Mic className="h-8 w-8 text-red-500" />
              ) : (
                <Upload className="h-8 w-8 text-primary" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">
                {isRecording ? `Recording... ${formatTime(recordingTime)}` : "Drop your vocal file here"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isRecording ? "Click Stop when finished" : "or click to browse"}
              </p>
            </div>
            {!isRecording && (
              <p className="text-xs text-muted-foreground">Supports MP3, WAV, M4A, FLAC • Max 50MB • Up to 10 minutes</p>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Music className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{projectData.vocalFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(projectData.vocalFile.size / (1024 * 1024)).toFixed(2)} MB • {Math.floor(projectData.duration / 60)}
                  :{(projectData.duration % 60).toString().padStart(2, "0")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayback}
                className={`hover:bg-primary/10 ${isPlaying ? "text-primary" : "text-muted-foreground"}`}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Waveform Preview */}
          <div className="mt-6 h-24 rounded-lg bg-secondary/50 overflow-hidden p-2">
            <div className="flex items-center justify-center h-full gap-[2px]">
              {Array.from({ length: 80 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-primary/50 to-primary"
                  style={{
                    height: `${20 + Math.sin(i * 0.3) * 30 + Math.random() * 40}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Record Option */}
      {!projectData.vocalFile && (
        <div className="flex flex-col items-center gap-4">
          {/* Metronome Toggle */}
          {/* Metronome Toggle */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <Switch
                id="metronome"
                checked={isMetronomeEnabled}
                onCheckedChange={setIsMetronomeEnabled}
              />
              <Label htmlFor="metronome" className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <Volume2 className="h-4 w-4" />
                Metronome
              </Label>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed border-primary/50 text-primary">
                  {projectData.tempo} BPM
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Tempo</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the BPM for the metronome and project.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={[projectData.tempo]}
                      onValueChange={(value) => setProjectData({ ...projectData, tempo: value[0] })}
                      min={40}
                      max={300}
                      step={1}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      value={projectData.tempo}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        if (!isNaN(val) && val > 0 && val <= 500) {
                          setProjectData({ ...projectData, tempo: val })
                        }
                      }}
                      className="w-20"
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>or</span>
            {!recordingComplete ? (
              <Button
                variant={isRecording ? "destructive" : "outline"}
                className={`gap-2 ${!isRecording && "border-border bg-card/50"}`}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
                {isRecording ? "Stop Recording" : "Record Directly"}
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setRecordingComplete(false)
                    setTempRecordedFile(null)
                    // Optionally reset recording time? 
                    // setRecordingTime(0) 
                  }}
                >
                  Redo
                </Button>
                <Button
                  className="gap-2 bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleUploadRecording}
                >
                  <Upload className="h-4 w-4" />
                  Upload Recording
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quality Tier Info */}
      <div
        className={`rounded-xl border p-4 ${projectData.qualityTier === "premium" ? "border-accent/50 bg-accent/5" : "border-border bg-card/50"
          }`}
      >
        <div className="flex items-start gap-3">
          <Sparkles
            className={`h-5 w-5 mt-0.5 ${projectData.qualityTier === "premium" ? "text-accent" : "text-muted-foreground"
              }`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-medium text-foreground">
                {projectData.qualityTier === "premium" ? "Premium Quality" : "Standard Quality"}
              </p>
              {projectData.qualityTier === "premium" && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent font-medium">$4.99</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {projectData.qualityTier === "premium"
                ? "iRenown HD Engine • Pro Mastering • Stem Downloads • Full Commercial License"
                : "iRenown Foundation Engine • Basic Mastering • MP3 320kbps • Commercial License"}
            </p>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <Button
        size="lg"
        onClick={onStartProcessing}
        disabled={!projectData.vocalFile}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="h-5 w-5 mr-2" />
        Create Track
        {projectData.qualityTier === "premium" && " • $4.99"}
      </Button>
    </div>
  )
}
