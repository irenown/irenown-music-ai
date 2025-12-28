"use client"

import type { ProjectData, StudioState } from "./studio-interface"
import { Music, Sparkles, Settings2, Clock, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface StudioSidebarProps {
  projectData: ProjectData
  setProjectData: (data: ProjectData) => void
  state: StudioState
}

const genres = ["Pop", "Hip-Hop", "R&B", "Rock", "Electronic", "Jazz", "Country", "Latin", "Classical", "Indie"]
const moods = ["Upbeat", "Melancholic", "Energetic", "Chill", "Dark", "Romantic", "Epic", "Funky"]
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

export function StudioSidebar({ projectData, setProjectData, state }: StudioSidebarProps) {
  const isDisabled = state === "processing"

  return (
    <aside className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-border bg-card/30 p-4 overflow-y-auto max-h-[40vh] lg:max-h-full">
      <div className="space-y-6">
        {/* Quality Tier */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Quality Tier</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={isDisabled}
              onClick={() => setProjectData({ ...projectData, qualityTier: "standard" })}
              className={`p-3 rounded-lg border text-left transition-all ${projectData.qualityTier === "standard"
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/50 hover:border-primary/50"
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Zap
                className={`h-4 w-4 mb-1 ${projectData.qualityTier === "standard" ? "text-primary" : "text-muted-foreground"}`}
              />
              <p className="text-xs font-medium text-foreground">Standard</p>
              <p className="text-[10px] text-muted-foreground">Included</p>
            </button>
            <button
              disabled={isDisabled}
              onClick={() => setProjectData({ ...projectData, qualityTier: "premium" })}
              className={`p-3 rounded-lg border text-left transition-all ${projectData.qualityTier === "premium"
                  ? "border-accent bg-accent/10"
                  : "border-border bg-secondary/50 hover:border-accent/50"
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Sparkles
                className={`h-4 w-4 mb-1 ${projectData.qualityTier === "premium" ? "text-accent" : "text-muted-foreground"}`}
              />
              <p className="text-xs font-medium text-foreground">Premium</p>
              <p className="text-[10px] text-muted-foreground">$4.99</p>
            </button>
          </div>
        </div>

        {/* Genre */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Genre</h3>
          </div>
          <Select
            disabled={isDisabled}
            value={projectData.genre}
            onValueChange={(value) => setProjectData({ ...projectData, genre: value })}
          >
            <SelectTrigger className="bg-secondary/50 border-border">
              <SelectValue placeholder="Select genre" />
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
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Mood</h3>
          </div>
          <Select
            disabled={isDisabled}
            value={projectData.mood}
            onValueChange={(value) => setProjectData({ ...projectData, mood: value })}
          >
            <SelectTrigger className="bg-secondary/50 border-border">
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent>
              {moods.map((mood) => (
                <SelectItem key={mood} value={mood}>
                  {mood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Key */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Key</h3>
            <div className="flex items-center gap-2">
              <Label htmlFor="auto-detect" className="text-xs text-muted-foreground">
                Auto
              </Label>
              <Switch id="auto-detect" defaultChecked disabled={isDisabled} />
            </div>
          </div>
          <Select
            disabled={isDisabled}
            value={projectData.key}
            onValueChange={(value) => setProjectData({ ...projectData, key: value })}
          >
            <SelectTrigger className="bg-secondary/50 border-border">
              <SelectValue placeholder="Select key" />
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

        {/* Tempo */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Tempo</h3>
            </div>
            <span className="text-xs text-muted-foreground">{projectData.tempo} BPM</span>
          </div>
          <Slider
            disabled={isDisabled}
            value={[projectData.tempo]}
            onValueChange={(value) => setProjectData({ ...projectData, tempo: value[0] })}
            min={60}
            max={180}
            step={1}
            className="cursor-pointer"
          />
        </div>

        {/* Project Info */}
        <div className="pt-4 border-t border-border space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Project Info</h3>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              Duration: {Math.floor(projectData.duration / 60)}:
              {(projectData.duration % 60).toString().padStart(2, "0")}
            </p>
            <p>Format: {projectData.qualityTier === "premium" ? "WAV / FLAC" : "MP3 320kbps"}</p>
            <p>Stems: {projectData.qualityTier === "premium" ? "Included" : "Not included"}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
