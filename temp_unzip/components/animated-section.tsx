"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "slide-up" | "slide-left" | "slide-right" | "fade"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "slide-up", delay = 0 }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const animationClass = {
    "slide-up": "translate-y-8",
    "slide-left": "-translate-x-8",
    "slide-right": "translate-x-8",
    fade: "",
  }[animation]

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${animationClass}`
      } ${className}`}
    >
      {children}
    </div>
  )
}
