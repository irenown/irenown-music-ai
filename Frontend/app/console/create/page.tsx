"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import {
  Upload,
  Mic,
  Music,
  Play,
  Pause,
  X,
  Check,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  Clock,
  Zap,
  ArrowLeft,
  ArrowRight,
  FileAudio,
  Download,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Step = "quality" | "upload" | "style" | "review" | "processing" | "complete"
type Quality = "standard" | "premium"

const genres = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "EDM",
  "R&B",
  "Jazz",
  "Country",
  "Latin",
  "Metal",
  "Indie",
  "Classical",
  "Reggae",
]
const moods = [
  "Upbeat",
  "Energetic",
  "Melancholic",
  "Chill",
  "Dark",
  "Romantic",
  "Aggressive",
  "Dreamy",
  "Epic",
  "Peaceful",
]
const instruments = ["Guitar", "Drums", "Piano", "Synth", "Bass", "Strings", "Brass", "Saxophone", "Violin", "Flute"]
const keys = [
  "C Major",
  "C Minor",
  "D Major",
  "D Minor",
  "E Major",
  "E Minor",
  "F Major",
  "F Minor",
  "G Major",
  "G Minor",
  "A Major",
  "A Minor",
  "B Major",
  "B Minor",
]

const processingSteps = [
  { id: "upload", label: "Uploading vocal", duration: 2 },
  { id: "clean", label: "Cleaning & enhancing", duration: 15 },
  { id: "analyze", label: "Analyzing audio", duration: 8 },
  { id: "generate", label: "Generating music", duration: 45 },
  { id: "mix", label: "Mixing tracks", duration: 20 },
  { id: "master", label: "Professional mastering", duration: 10 },
  { id: "finalize", label: "Finalizing", duration: 5 },
]

export default function CreatePage() {
  const [step, setStep] = useState<Step>("quality")
  const [quality, setQuality] = useState<Quality>("standard")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingComplete, setRecordingComplete] = useState(false)
  const [songTitle, setSongTitle] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [tempoMode, setTempoMode] = useState<"auto" | "manual">("auto")
  const [tempo, setTempo] = useState(120)
  const [keyMode, setKeyMode] = useState<"auto" | "manual">("auto")
  const [selectedKey, setSelectedKey] = useState("C Major")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([])
  const [energyLevel, setEnergyLevel] = useState([5])
  const [customPrompt, setCustomPrompt] = useState("")
  const [processingStep, setProcessingStep] = useState(0)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0]
      if (file.type.startsWith("audio/") || file.name.match(/\.(mp3|wav|m4a|ogg)$/i)) {
        setUploadedFile(file)
      }
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      handleFileUpload(e.dataTransfer.files)
    },
    [handleFileUpload],
  )

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) => (prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]))
  }

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument) ? prev.filter((i) => i !== instrument) : [...prev, instrument],
    )
  }

  const startProcessing = () => {
    setStep("processing")
    setProcessingStep(0)
    setProcessingProgress(0)

    // Simulate processing
    let currentStep = 0
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setProcessingProgress(progress)

      if (progress >= ((currentStep + 1) / processingSteps.length) * 100) {
        currentStep++
        setProcessingStep(currentStep)
      }

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => setStep("complete"), 500)
      }
    }, 100)
  }

  const canProceed = () => {
    switch (step) {
      case "quality":
        return true
      case "upload":
        return !!uploadedFile
      case "style":
        return !!selectedGenre
      case "review":
        return true
      default:
        return false
    }
  }

  const nextStep = () => {
    const steps: Step[] = ["quality", "upload", "style", "review"]
    const currentIndex = steps.indexOf(step)
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1])
    } else if (step === "review") {
      startProcessing()
    }
  }

  const prevStep = () => {
    const steps: Step[] = ["quality", "upload", "style", "review"]
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  // Render steps
  const renderQualityStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Your Quality</h2>
        <p className="text-muted-foreground">Select the quality tier for your song</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* Standard */}
        <Card
          className={cn(
            "cursor-pointer transition-all hover:border-primary/50",
            quality === "standard" && "border-primary ring-2 ring-primary/20",
          )}
          onClick={() => setQuality("standard")}
        >
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3 flex items-center justify-center">
              <Music className="w-6 h-6" />
            </div>
            <CardTitle>Standard</CardTitle>
            <p className="text-sm text-muted-foreground">Included in subscription</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Good quality output</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>MP3 format (320kbps)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>Fast processing</span>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Best for:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Content</Badge>
                <Badge variant="secondary">Social media</Badge>
                <Badge variant="secondary">Demos</Badge>
              </div>
            </div>
            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">15/20 songs remaining</p>
            </div>
          </CardContent>
        </Card>

        {/* Premium */}
        <Card
          className={cn(
            "cursor-pointer transition-all hover:border-irenown-mid/50 relative overflow-hidden",
            quality === "premium" && "border-irenown-mid ring-2 ring-irenown-mid/20",
          )}
          onClick={() => setQuality("premium")}
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-irenown-mid to-irenown-dark text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
            Pro Quality
          </div>
          <CardHeader className="text-center pb-2">
            <div className="w-12 h-12 rounded-full bg-irenown-mid/20 mx-auto mb-3 flex items-center justify-center">
              <Star className="w-6 h-6 text-irenown-light" />
            </div>
            <CardTitle className="text-irenown-gradient">Premium</CardTitle>
            <p className="text-sm text-muted-foreground">$4.99 per song</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-irenown-light" />
                <span>Studio-grade quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-irenown-light" />
                <span>Professional mastering (Master-Pro)</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-irenown-light" />
                <span>Stem files included</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-irenown-light" />
                <span>WAV + FLAC + MP3 formats</span>
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Best for:</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-irenown-mid/20 text-irenown-light border-irenown-mid/30">Releases</Badge>
                <Badge className="bg-irenown-mid/20 text-irenown-light border-irenown-mid/30">Albums</Badge>
                <Badge className="bg-irenown-mid/20 text-irenown-light border-irenown-mid/30">Commercial</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderUploadStep = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Upload Your Vocal</h2>
        <p className="text-muted-foreground">Upload a vocal recording or record one directly</p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer",
          uploadedFile ? "border-green-500 bg-green-500/5" : "border-border hover:border-primary/50 hover:bg-muted/30",
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,.mp3,.wav,.m4a,.ogg"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />

        {uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setUploadedFile(null)
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Drag & drop your vocal file</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <p className="text-xs text-muted-foreground">Supported: MP3, WAV, M4A, OGG (max 50MB)</p>
          </div>
        )}
      </div>

      {/* Or Record */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-sm text-muted-foreground">OR</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className={cn("w-full h-14 bg-transparent", isRecording && "border-red-500/50 bg-red-500/5 text-red-500")}
          onClick={() => {
            if (isRecording) {
              setIsRecording(false)
              setRecordingComplete(true)
            } else {
              setIsRecording(true)
              setRecordingComplete(false)
            }
          }}
        >
          <Mic className={cn("w-5 h-5 mr-3", isRecording && "text-red-500 animate-pulse")} />
          {isRecording ? "Stop Recording" : "Record from Microphone"}
        </Button>

        {recordingComplete && !isRecording && (
          <Button
            className="w-full h-14 bg-green-500 hover:bg-green-600 text-white animate-in fade-in slide-in-from-top-2"
            onClick={() => {
              // Simulate a recorded file
              const mockFile = new File(["(mock audio data)"], `recording_${Date.now()}.wav`, { type: "audio/wav" })
              setUploadedFile(mockFile)
              setRecordingComplete(false)
            }}
          >
            <Upload className="w-5 h-5 mr-3" />
            Upload Recording
          </Button>
        )}
      </div>
    </div>
  )

  const renderStyleStep = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Your Style</h2>
        <p className="text-muted-foreground">Customize how your song will sound</p>
      </div>

      {/* Song Title */}
      <div className="space-y-2">
        <Label>Song Title (optional)</Label>
        <Input
          placeholder="Enter a title for your song..."
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          className="bg-muted/50"
        />
      </div>

      {/* Genre */}
      <div className="space-y-2">
        <Label>Genre *</Label>
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="bg-muted/50">
            <SelectValue placeholder="Select a genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mood */}
      <div className="space-y-2">
        <Label>Mood (optional)</Label>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <Badge
              key={mood}
              variant={selectedMoods.includes(mood) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors",
                selectedMoods.includes(mood) && "bg-primary text-primary-foreground",
              )}
              onClick={() => toggleMood(mood)}
            >
              {mood}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tempo */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tempo</Label>
          <Select value={tempoMode} onValueChange={(v) => setTempoMode(v as "auto" | "manual")}>
            <SelectTrigger className="bg-muted/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {tempoMode === "manual" && (
          <div className="space-y-2">
            <Label>BPM</Label>
            <Input
              type="number"
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="bg-muted/50"
              min={60}
              max={200}
            />
          </div>
        )}
      </div>

      {/* Key */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Key</Label>
          <Select value={keyMode} onValueChange={(v) => setKeyMode(v as "auto" | "manual")}>
            <SelectTrigger className="bg-muted/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto-detect</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {keyMode === "manual" && (
          <div className="space-y-2">
            <Label>Select Key</Label>
            <Select value={selectedKey} onValueChange={setSelectedKey}>
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {keys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Advanced Options */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <span className="font-medium">Advanced Options</span>
          {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {showAdvanced && (
          <div className="p-4 pt-0 space-y-6 border-t border-border">
            {/* Instrumentation */}
            <div className="space-y-2">
              <Label>Instrumentation Preference</Label>
              <div className="flex flex-wrap gap-2">
                {instruments.map((instrument) => (
                  <Badge
                    key={instrument}
                    variant={selectedInstruments.includes(instrument) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleInstrument(instrument)}
                  >
                    {instrument}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Energy Level</Label>
                <span className="text-sm text-muted-foreground">{energyLevel[0]}/10</span>
              </div>
              <Slider value={energyLevel} onValueChange={setEnergyLevel} max={10} min={1} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Calm</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Custom Prompt */}
            <div className="space-y-2">
              <Label>Custom Prompt (for pros)</Label>
              <Textarea
                placeholder="Describe your desired sound in detail..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="min-h-24 bg-muted/50"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderReviewStep = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Review & Generate</h2>
        <p className="text-muted-foreground">Review your settings before generating</p>
      </div>

      <Card className="bg-card/50">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Vocal uploaded</p>
              <p className="font-medium">{uploadedFile?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Quality</p>
              <div className="flex items-center gap-2">
                <p className="font-medium capitalize">{quality}</p>
                {quality === "premium" && <Badge className="bg-irenown-mid/20 text-irenown-light">$4.99</Badge>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Genre</p>
              <p className="font-medium">{selectedGenre}</p>
            </div>
          </div>

          {selectedMoods.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Mood</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedMoods.map((mood) => (
                    <Badge key={mood} variant="secondary" className="text-xs">
                      {mood}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Estimated processing time</p>
              <p className="font-medium">{quality === "premium" ? "8-12 minutes" : "5-8 minutes"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {quality === "premium" && (
        <div className="p-4 rounded-xl bg-irenown-mid/10 border border-irenown-mid/20">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-irenown-light mt-0.5" />
            <div>
              <p className="font-medium text-irenown-light">Premium Track - $4.99</p>
              <p className="text-sm text-muted-foreground mt-1">
                You'll be charged $4.99 for this studio-quality track with professional mastering and stem files.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderProcessingStep = () => (
    <div className="space-y-8 max-w-xl mx-auto text-center">
      <div>
        <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-6 flex items-center justify-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Generating Your Song</h2>
        <p className="text-muted-foreground">
          {songTitle || "Your song"} • {quality === "premium" ? "Premium" : "Standard"} Quality
        </p>
      </div>

      <Card className="bg-card/50 text-left">
        <CardContent className="p-6 space-y-4">
          {processingSteps.map((procStep, index) => (
            <div key={procStep.id} className="flex items-center gap-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  index < processingStep
                    ? "bg-green-500/20 text-green-500"
                    : index === processingStep
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {index < processingStep ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : index === processingStep ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className={cn("text-sm", index <= processingStep ? "text-foreground" : "text-muted-foreground")}>
                  {procStep.label}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {index < processingStep ? "Complete" : index === processingStep ? "In progress" : "Waiting"}
              </span>
            </div>
          ))}

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(processingProgress)}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Estimated time remaining: {Math.max(0, Math.round((100 - processingProgress) * 0.05))} minutes
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-muted/30">
        <p className="text-sm text-muted-foreground">
          You can close this window. We'll notify you when your song is ready!
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/console">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  )

  const renderCompleteStep = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 mx-auto mb-6 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Song is Ready!</h2>
        <p className="text-muted-foreground">"{songTitle || "Untitled"}" has been successfully generated</p>
      </div>

      {/* Player */}
      <Card className="bg-card/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-irenown-light/30 to-irenown-dark/30 flex items-center justify-center shrink-0">
              <Music className="w-10 h-10 text-foreground/40" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{songTitle || "Untitled"}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedGenre} • {quality === "premium" ? "Premium" : "Standard"} Quality
              </p>
              <div className="space-y-2">
                <Slider defaultValue={[0]} max={100} step={1} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0:00</span>
                  <span>3:24</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground mb-1">Quality</p>
          <p className="font-medium capitalize">{quality}</p>
        </div>
        <div className="p-4 rounded-xl bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground mb-1">Processing Time</p>
          <p className="font-medium">5m 32s</p>
        </div>
        <div className="p-4 rounded-xl bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground mb-1">Genre</p>
          <p className="font-medium">{selectedGenre}</p>
        </div>
        <div className="p-4 rounded-xl bg-muted/30 text-center">
          <p className="text-xs text-muted-foreground mb-1">File Size</p>
          <p className="font-medium">8.2 MB</p>
        </div>
      </div>

      {/* Download Options */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Download Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start h-12 bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light">
            <Download className="w-5 h-5 mr-3" />
            Download Final Mix (MP3 - 8.2 MB)
          </Button>
          {quality === "premium" && (
            <>
              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <FileAudio className="w-5 h-5 mr-3" />
                Download Vocal Only (WAV - 12.5 MB)
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <FileAudio className="w-5 h-5 mr-3" />
                Download Instrumental (WAV - 14.1 MB)
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                <Download className="w-5 h-5 mr-3" />
                Download All (ZIP - 35.8 MB)
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Share */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-lg">Share Your Creation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline">Share to X</Button>
            <Button variant="outline">Share to Facebook</Button>
            <Button variant="outline">Share to WhatsApp</Button>
          </div>
        </CardContent>
      </Card>

      {/* Rating */}
      <Card className="bg-card/50">
        <CardContent className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">How did we do?</p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} className="p-1 hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-muted-foreground hover:text-irenown-light hover:fill-irenown-light transition-colors" />
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Not satisfied? <button className="text-primary hover:underline">Regenerate with different style</button>
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 bg-transparent" asChild>
          <Link href="/console/projects">
            <Music className="w-4 h-4 mr-2" />
            View in Library
          </Link>
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light"
          onClick={() => {
            setStep("quality")
            setUploadedFile(null)
            setSongTitle("")
            setSelectedGenre("")
            setSelectedMoods([])
          }}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Create Another Song
        </Button>
      </div>
    </div>
  )

  return (
    <div className="pb-20 lg:pb-0">
      {/* Progress Steps */}
      {!["processing", "complete"].includes(step) && (
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
            {[
              { key: "quality", label: "Quality", num: 1 },
              { key: "upload", label: "Upload", num: 2 },
              { key: "style", label: "Style", num: 3 },
              { key: "review", label: "Review", num: 4 },
            ].map((s, index) => (
              <div key={s.key} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-2",
                    step === s.key
                      ? "text-primary"
                      : ["quality", "upload", "style", "review"].indexOf(step) > index
                        ? "text-green-500"
                        : "text-muted-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                      step === s.key
                        ? "border-primary bg-primary text-primary-foreground"
                        : ["quality", "upload", "style", "review"].indexOf(step) > index
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-muted bg-muted",
                    )}
                  >
                    {["quality", "upload", "style", "review"].indexOf(step) > index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      s.num
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">{s.label}</span>
                </div>
                {index < 3 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 h-0.5 mx-2",
                      ["quality", "upload", "style", "review"].indexOf(step) > index ? "bg-green-500" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      {step === "quality" && renderQualityStep()}
      {step === "upload" && renderUploadStep()}
      {step === "style" && renderStyleStep()}
      {step === "review" && renderReviewStep()}
      {step === "processing" && renderProcessingStep()}
      {step === "complete" && renderCompleteStep()}

      {/* Navigation */}
      {!["processing", "complete"].includes(step) && (
        <div className="flex justify-between mt-8 max-w-2xl mx-auto">
          <Button variant="outline" onClick={prevStep} disabled={step === "quality"}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light text-primary-foreground"
          >
            {step === "review" ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate My Song
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
