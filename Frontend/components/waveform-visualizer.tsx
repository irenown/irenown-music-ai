"use client"

import { useEffect, useState } from "react"

export function WaveformVisualizer() {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    // Generate random bar heights
    const generateBars = () => {
      const newBars = Array.from({ length: 64 }, () => Math.random() * 100)
      setBars(newBars)
    }

    generateBars()
    const interval = setInterval(generateBars, 150)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-24 rounded-lg bg-secondary/50 overflow-hidden p-2">
      <div className="flex items-center justify-center h-full gap-[2px]">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-1 rounded-full transition-all duration-150"
            style={{
              height: `${Math.max(10, height)}%`,
              opacity: 0.5 + height / 200,
              background: `linear-gradient(to top, oklch(0.45 0.035 65), oklch(0.82 0.035 75))`,
            }}
          />
        ))}
      </div>
      {/* Playhead - Updated glow to iRenown */}
      <div className="absolute top-2 bottom-2 left-1/3 w-0.5 bg-primary/80 rounded-full">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary glow-irenown" />
      </div>
    </div>
  )
}
