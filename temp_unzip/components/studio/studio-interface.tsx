"use client"

import { useState } from "react"
import { StudioHeader } from "./studio-header"
import { StudioSidebar } from "./studio-sidebar"
import { UploadSection } from "./upload-section"
import { ProcessingView } from "./processing-view"
import { ResultsView } from "./results-view"

export type StudioState = "upload" | "processing" | "results"
export type QualityTier = "standard" | "premium"

export interface ProjectData {
  vocalFile: File | null
  genre: string
  mood: string
  key: string
  tempo: number
  duration: number
  qualityTier: QualityTier
}

export function StudioInterface() {
  const [state, setState] = useState<StudioState>("upload")
  const [projectData, setProjectData] = useState<ProjectData>({
    vocalFile: null,
    genre: "Pop",
    mood: "Upbeat",
    key: "C Major",
    tempo: 120,
    duration: 180,
    qualityTier: "standard",
  })

  const handleStartProcessing = () => {
    setState("processing")
    // Simulate processing time
    setTimeout(() => {
      setState("results")
    }, 8000)
  }

  const handleNewProject = () => {
    setState("upload")
    setProjectData({
      vocalFile: null,
      genre: "Pop",
      mood: "Upbeat",
      key: "C Major",
      tempo: 120,
      duration: 180,
      qualityTier: "standard",
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StudioHeader />
      <div className="flex flex-1 overflow-hidden">
        <StudioSidebar projectData={projectData} setProjectData={setProjectData} state={state} />
        <main className="flex-1 overflow-auto p-6">
          {state === "upload" && (
            <UploadSection
              projectData={projectData}
              setProjectData={setProjectData}
              onStartProcessing={handleStartProcessing}
            />
          )}
          {state === "processing" && <ProcessingView projectData={projectData} />}
          {state === "results" && <ResultsView projectData={projectData} onNewProject={handleNewProject} />}
        </main>
      </div>
    </div>
  )
}
