"use client"

import type React from "react"

import { useCallback, useState } from "react"
import type { ProjectData } from "./studio-interface"
import { Button } from "@/components/ui/button"
import { Upload, Mic, Music, Sparkles, X } from "lucide-react"

interface UploadSectionProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  onStartProcessing: () => void
}

export function UploadSection({ projectData, setProjectData, onStartProcessing }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file && (file.type.includes("audio") || file.name.endsWith(".mp3") || file.name.endsWith(".wav"))) {
        setProjectData({ ...projectData, vocalFile: file, duration: 180 })
      }
    },
    [projectData, setProjectData],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setProjectData({ ...projectData, vocalFile: file, duration: 180 })
      }
    },
    [projectData, setProjectData],
  )

  const removeFile = () => {
    setProjectData({ ...projectData, vocalFile: null })
  }

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
          className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
            isDragging ? "border-primary bg-primary/10" : "border-border bg-card/50 hover:border-primary/50"
          }`}
        >
          <input
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.flac"
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground">Drop your vocal file here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse</p>
            </div>
            <p className="text-xs text-muted-foreground">Supports MP3, WAV, M4A, FLAC • Max 50MB • Up to 10 minutes</p>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
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
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span>or</span>
        <Button variant="outline" className="gap-2 border-border bg-card/50">
          <Mic className="h-4 w-4" />
          Record Directly
        </Button>
      </div>

      {/* Quality Tier Info */}
      <div
        className={`rounded-xl border p-4 ${
          projectData.qualityTier === "premium" ? "border-accent/50 bg-accent/5" : "border-border bg-card/50"
        }`}
      >
        <div className="flex items-start gap-3">
          <Sparkles
            className={`h-5 w-5 mt-0.5 ${
              projectData.qualityTier === "premium" ? "text-accent" : "text-muted-foreground"
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
                ? "ElevenLabs AI • LANDR Mastering • Stem Downloads • Full Commercial License"
                : "Stable Audio AI • Basic Mastering • MP3 320kbps • Commercial License"}
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
