"use client"

import { useState } from "react"
import type { ProjectData } from "./studio-interface"
import { Button } from "@/components/ui/button"
import { Play, Pause, Download, Share2, RotateCcw, Music, Mic, Sliders, ChevronDown, Check, Plus } from "lucide-react"

interface ResultsViewProps {
  projectData: ProjectData
  result: any
  onNewProject: () => void
}

export function ResultsView({ projectData, result, onNewProject }: ResultsViewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrack, setActiveTrack] = useState<"final" | "vocal" | "instrumental">("final")
  const [currentTime, setCurrentTime] = useState(0)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""

  const togglePlay = () => {
    const audio = document.getElementById("main-player") as HTMLAudioElement
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  const getAudioUrl = (type: string) => {
    if (!result) return ""
    let path = ""
    switch (type) {
      case "final": path = result.mix_url; break;
      case "vocal": path = result.vocal_url; break;
      case "instrumental": path = result.instrumental_url; break;
      default: return ""
    }
    if (path.startsWith('http')) return path;
    return `${apiUrl}${path}`;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const tracks = [
    { id: "final", name: "Final Mix", icon: Music, description: "Complete mastered track" },
    { id: "vocal", name: "Vocals Only", icon: Mic, description: "Enhanced vocal stem" },
    { id: "instrumental", name: "Instrumental", icon: Sliders, description: "AI-generated music" },
  ] as const

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 mb-4">
          <Check className="h-8 w-8 text-accent" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Your Track is Ready!</h1>
        <p className="text-muted-foreground mt-1">Preview, download, or share your creation</p>
      </div>

      {/* Main Player */}
      <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-6">
        {/* Track Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              <Music className="h-8 w-8 text-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-lg truncate max-w-[250px] sm:max-w-none">
                {projectData.vocalFile?.name.replace(/\.[^/.]+$/, "") || "New Track"}
              </p>
              <p className="text-sm text-muted-foreground">
                {projectData.genre} • {projectData.key} • {projectData.tempo} BPM
              </p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${projectData.qualityTier === "premium" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
              }`}
          >
            {projectData.qualityTier === "premium" ? "Premium Quality" : "Standard Quality"}
          </div>
        </div>

        {/* Waveform / Progress */}
        <div className="relative h-24 rounded-lg bg-secondary/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center gap-[2px] p-2">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all ${i < (currentTime / projectData.duration) * 100
                  ? "bg-gradient-to-t from-primary to-accent"
                  : "bg-muted-foreground/30"
                  }`}
                style={{
                  height: `${20 + Math.sin(i * 0.2) * 30 + Math.random() * 40}%`,
                }}
              />
            ))}
          </div>
          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-foreground"
            style={{ left: `${(currentTime / projectData.duration) * 100}%` }}
          >
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-mono">{formatTime(currentTime)}</span>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={togglePlay}
              className="h-14 w-14 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
            >
              <audio
                id="main-player"
                src={getAudioUrl(activeTrack)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onTimeUpdate={(e) => setCurrentTime(Math.floor(e.currentTarget.currentTime))}
              />
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>
          </div>

          <span className="text-sm text-muted-foreground font-mono">{formatTime(projectData.duration)}</span>
        </div>
      </div>

      {/* Track Selection (for Premium) */}
      {projectData.qualityTier === "premium" && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Available Tracks</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id)}
                className={`p-4 rounded-xl border text-left transition-all ${activeTrack === track.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card/50 hover:border-primary/50"
                  }`}
              >
                <track.icon
                  className={`h-5 w-5 mb-2 ${activeTrack === track.id ? "text-primary" : "text-muted-foreground"}`}
                />
                <p className="font-medium text-foreground text-sm">{track.name}</p>
                <p className="text-xs text-muted-foreground">{track.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
        <Button
          className="col-span-2 sm:flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary gap-2"
          asChild
        >
          <a href={getAudioUrl(activeTrack)} download={`${projectData.vocalFile?.name.replace(/\.[^/.]+$/, "") || "irenown_track"}.mp3`}>
            <Download className="h-4 w-4" />
            Download {projectData.qualityTier === "premium" ? "All Formats" : "MP3"}
            <ChevronDown className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="outline" className="border-border bg-card/50 gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
        <Button variant="outline" className="border-border bg-card/50 gap-2">
          <RotateCcw className="h-4 w-4" />
          Regenerate
        </Button>
        <Button variant="outline" onClick={onNewProject} className="col-span-2 sm:flex-none border-border bg-card/50 gap-2">
          <Plus className="h-4 w-4" />
          New Track
        </Button>
      </div>

      {/* Download Options */}
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <p className="text-sm font-medium text-foreground mb-3">Download Options</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <button className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 transition-all">
            <Download className="h-4 w-4 text-muted-foreground" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">MP3</p>
              <p className="text-xs text-muted-foreground">320kbps</p>
            </div>
          </button>
          {projectData.qualityTier === "premium" && (
            <>
              <button className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 transition-all">
                <Download className="h-4 w-4 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">WAV</p>
                  <p className="text-xs text-muted-foreground">Lossless</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 transition-all">
                <Download className="h-4 w-4 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">FLAC</p>
                  <p className="text-xs text-muted-foreground">Lossless</p>
                </div>
              </button>
              <button className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/50 hover:border-primary/50 transition-all">
                <Download className="h-4 w-4 text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">Stems</p>
                  <p className="text-xs text-muted-foreground">ZIP Package</p>
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{formatTime(projectData.duration)}</p>
          <p className="text-xs text-muted-foreground">Duration</p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{projectData.key}</p>
          <p className="text-xs text-muted-foreground">Key</p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{projectData.tempo}</p>
          <p className="text-xs text-muted-foreground">BPM</p>
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{projectData.genre}</p>
          <p className="text-xs text-muted-foreground">Genre</p>
        </div>
      </div>
    </div>
  )
}
