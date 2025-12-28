"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { IntroAnimation } from "./intro-animation"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
    // Small delay before showing content for smooth transition
    setTimeout(() => setContentVisible(true), 100)
  }, [])

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className={`transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  )
}
