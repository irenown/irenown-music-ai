"use client"

import { useState } from "react"
import { StudioHeader } from "./studio-header"
import { StudioSidebar } from "./studio-sidebar"
// import { UploadSection } from "./upload-section" // Changed to dynamic below
import { ProcessingView } from "./processing-view"
import { ResultsView } from "./results-view"
import { apiClient } from "@/lib/api"
import dynamic from "next/dynamic"

const UploadSection = dynamic(() => import("./upload-section").then(mod => mod.UploadSection), { ssr: false })

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
  jobId?: string
  result?: any
}

export function StudioInterface() {
  const [state, setState] = useState<StudioState>("upload")
  const [projectData, setProjectData] = useState<ProjectData>({
    vocalFile: null,
    genre: "Pop",
    mood: "Upbeat",
    key: "C Major",
    tempo: 120,
    duration: 30, // Default duration 30s
    qualityTier: "standard",
  })

  const handleStartProcessing = async () => {
    if (!projectData.vocalFile) return

    setState("processing")

    try {
      const formData = new FormData()
      formData.append("vocal", projectData.vocalFile)
      formData.append("genre", projectData.genre)
      formData.append("bpm", projectData.tempo.toString())
      formData.append("key", projectData.key)
      formData.append("duration", projectData.duration.toString())
      formData.append("name", projectData.vocalFile.name.replace(/\.[^/.]+$/, ""))

      const data = await apiClient.request('/api/produce', {
        method: "POST",
        body: formData,
      });

      setProjectData((prev) => ({ ...prev, jobId: data.jobId }))
    } catch (error: any) {
      console.error("Production Error:", error)
      setState("upload")
      alert(`Failed to start production: ${error.message || "Unknown error"}`)
    }
  }

  const handleFinishProcessing = (result: any) => {
    setProjectData((prev) => ({ ...prev, result }))
    setState("results")
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
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        <StudioSidebar projectData={projectData} setProjectData={setProjectData} state={state} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {state === "upload" && (
            <UploadSection
              projectData={projectData}
              setProjectData={setProjectData}
              onStartProcessing={handleStartProcessing}
            />
          )}
          {state === "processing" && (
            <ProcessingView projectData={projectData} onFinish={handleFinishProcessing} />
          )}
          {state === "results" && (
            <ResultsView projectData={projectData} result={projectData.result} onNewProject={handleNewProject} />
          )}
        </main>
      </div>
    </div>
  )
}
