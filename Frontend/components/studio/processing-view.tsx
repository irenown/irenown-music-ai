"use client"

import { useEffect, useState } from "react"
import type { ProjectData } from "./studio-interface"
import { Mic, Wand2, Music, Sliders, Check, Loader2 } from "lucide-react"

interface ProcessingViewProps {
  projectData: ProjectData
  onFinish: (result: any) => void
}

const processingSteps = [
  {
    id: 1,
    name: "Enhancing Vocals",
    description: "Noise reduction and clarity enhancement",
    icon: Mic,
    duration: 2000,
  },
  { id: 2, name: "Analyzing Audio", description: "Detecting key, tempo, and structure", icon: Wand2, duration: 1500 },
  {
    id: 3,
    name: "Generating Instrumental",
    description: "Creating custom AI-powered music",
    icon: Music,
    duration: 3000,
  },
  { id: 4, name: "Mixing & Mastering", description: "Professional audio processing", icon: Sliders, duration: 1500 },
]

export function ProcessingView({ projectData, onFinish }: ProcessingViewProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!projectData.jobId) return

    const pollJob = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/jobs/${projectData.jobId}`, {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_DEV_KEY || "irenown_dev_key_2025",
          },
        })

        if (!response.ok) throw new Error("Failed to poll job status")

        const job = await response.json()

        // Update progress and step
        setProgress(job.progress || 0)

        // Map progress to steps
        if (job.progress <= 25) setCurrentStep(1)
        else if (job.progress <= 50) setCurrentStep(2)
        else if (job.progress <= 75) setCurrentStep(3)
        else if (job.progress <= 90) setCurrentStep(4)
        else setCurrentStep(4)

        if (job.state === "completed") {
          clearInterval(pollInterval)
          onFinish(job.result)
        } else if (job.state === "failed") {
          clearInterval(pollInterval)
          setError(job.reason || "Production failed")
        }
      } catch (err: any) {
        console.error("Polling Error:", err)
      }
    }

    const pollInterval = setInterval(pollJob, 3000)
    pollJob() // Initial call

    return () => clearInterval(pollInterval)
  }, [projectData.jobId, onFinish])

  return (
    <div className="max-w-2xl mx-auto space-y-8 pt-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Creating Your Track</h1>
        <p className="text-muted-foreground mt-1">This usually takes 2-5 minutes</p>
      </div>

      {/* Project Info */}
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Music className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
              {projectData.vocalFile?.name || "Vocal Track"}
            </p>
            <p className="text-sm text-muted-foreground">
              {projectData.genre} • {projectData.mood} • {projectData.key} • {projectData.tempo} BPM
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium mt-2 sm:mt-0 ${projectData.qualityTier === "premium" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
              }`}
          >
            {projectData.qualityTier === "premium" ? "Premium" : "Standard"}
          </div>
        </div>
      </div>

      {/* Processing Steps */}
      <div className="space-y-4">
        {processingSteps.map((step, index) => {
          const isComplete = currentStep > index
          const isCurrent = currentStep === index + 1
          const isPending = currentStep < index + 1

          return (
            <div
              key={step.id}
              className={`rounded-xl border p-4 transition-all ${isCurrent
                ? "border-primary bg-primary/10"
                : isComplete
                  ? "border-accent/50 bg-accent/5"
                  : "border-border bg-card/50"
                }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${isCurrent ? "bg-primary/20" : isComplete ? "bg-accent/20" : "bg-secondary"
                    }`}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5 text-accent" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  ) : (
                    <step.icon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isPending ? "text-muted-foreground" : "text-foreground"}`}>
                    {step.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{error ? "Error" : "Processing..."}</span>
          <span className={error ? "text-destructive font-medium" : "text-primary font-medium"}>
            {error ? "Failed" : `${progress}%`}
          </span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r rounded-full transition-all duration-300 ${error ? "from-destructive to-destructive/50" : "from-primary to-accent"
              }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {error && <p className="text-destructive text-sm text-center mt-2">{error}</p>}
      </div>

      {/* Tip */}
      <div className="text-center text-sm text-muted-foreground">
        <p>💡 Tip: You can close this tab. We&apos;ll email you when your track is ready.</p>
      </div>
    </div>
  )
}
