"use client"

import { useState, useEffect, useRef } from "react"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"init" | "wave" | "pulse" | "morph" | "reveal" | "complete">("init")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerY = canvas.height / 2
      const centerX = canvas.width / 2

      // Draw multiple morphing wave layers
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(175, 160, 145, ${0.15 - layer * 0.025})`
        ctx.lineWidth = 2 - layer * 0.3

        const amplitude = 80 + layer * 30 + Math.sin(time + layer) * 20
        const frequency = 0.008 - layer * 0.001
        const phaseOffset = time * (1 + layer * 0.2)

        for (let x = 0; x < canvas.width; x++) {
          const distanceFromCenter = Math.abs(x - centerX)
          const falloff = Math.exp(-distanceFromCenter * 0.001)
          const y =
            centerY +
            Math.sin(x * frequency + phaseOffset) * amplitude * falloff +
            Math.sin(x * frequency * 2 + phaseOffset * 1.5) * (amplitude * 0.3) * falloff

          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }

      // Draw circular sound ripples
      for (let i = 0; i < 6; i++) {
        const rippleTime = (time * 0.5 + i * 0.5) % 3
        const rippleRadius = rippleTime * 200
        const rippleOpacity = Math.max(0, 0.3 - rippleTime * 0.1)

        ctx.beginPath()
        ctx.strokeStyle = `rgba(175, 160, 145, ${rippleOpacity})`
        ctx.lineWidth = 1
        ctx.arc(centerX, centerY, rippleRadius, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw floating particles
      for (let i = 0; i < 50; i++) {
        const angle = (i / 50) * Math.PI * 2 + time * 0.2
        const radius = 150 + Math.sin(time + i) * 100
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius * 0.6
        const size = 1 + Math.sin(time * 2 + i) * 0.5
        const opacity = 0.3 + Math.sin(time + i * 0.5) * 0.2

        ctx.beginPath()
        ctx.fillStyle = `rgba(196, 181, 166, ${opacity})`
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("wave"), 100),
      setTimeout(() => setPhase("pulse"), 800),
      setTimeout(() => setPhase("morph"), 1600),
      setTimeout(() => setPhase("reveal"), 2400),
      setTimeout(() => setPhase("complete"), 3200),
      setTimeout(() => onComplete(), 3800),
    ]

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-all duration-600 ${
        phase === "complete" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Canvas waveform background */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === "reveal" || phase === "complete" ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-40" />

      {/* Central morphing shape */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`relative transition-all duration-1000 ease-out ${
            phase === "init"
              ? "scale-0 opacity-0"
              : phase === "wave"
                ? "scale-50 opacity-50"
                : phase === "pulse"
                  ? "scale-100 opacity-100"
                  : phase === "morph"
                    ? "scale-110 opacity-100"
                    : phase === "reveal"
                      ? "scale-150 opacity-0"
                      : "scale-200 opacity-0"
          }`}
        >
          {/* Outer glow ring */}
          <div
            className="absolute -inset-20 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(175, 160, 145, 0.2) 0%, transparent 70%)",
              animation: "breathe 2s ease-in-out infinite",
            }}
          />

          {/* Spinning orbital rings */}
          {[0, 60, 120].map((rotation, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `rotate(${rotation}deg)`,
                animation: `spin-slow ${8 + i * 2}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
              }}
            >
              <div
                className="absolute w-40 h-40 rounded-full border border-primary/20"
                style={{
                  transform: "rotateX(70deg)",
                }}
              />
            </div>
          ))}

          {/* Center audio bars */}
          <div className="relative flex items-center justify-center gap-1">
            {[...Array(12)].map((_, i) => {
              const height = 20 + Math.sin(i * 0.8) * 30
              return (
                <div
                  key={i}
                  className="w-1 rounded-full bg-gradient-to-t from-primary/30 via-primary to-primary/30"
                  style={{
                    height: `${height}px`,
                    animation: `equalizer-bar 0.8s ease-in-out infinite`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Horizontal scan lines effect */}
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${
          phase === "morph" || phase === "reveal" ? "opacity-100" : "opacity-0"
        }`}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            style={{
              top: `${20 + i * 10}%`,
              animation: `scan-line 2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Corner accent lines */}
      <div
        className={`absolute inset-8 transition-all duration-700 ${
          phase === "pulse" || phase === "morph" || phase === "reveal" ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top left */}
        <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-primary to-transparent animate-width-expand" />
        <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-primary to-transparent animate-height-expand" />
        {/* Top right */}
        <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-primary to-transparent animate-width-expand" />
        <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary to-transparent animate-height-expand" />
        {/* Bottom left */}
        <div className="absolute bottom-0 left-0 w-16 h-px bg-gradient-to-r from-primary to-transparent animate-width-expand" />
        <div className="absolute bottom-0 left-0 w-px h-16 bg-gradient-to-t from-primary to-transparent animate-height-expand" />
        {/* Bottom right */}
        <div className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-primary to-transparent animate-width-expand" />
        <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-primary to-transparent animate-height-expand" />
      </div>

      {/* Text reveal at the end */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
          phase === "reveal" ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-extralight tracking-[0.3em] text-irenown-gradient animate-text-glow">
          iRenown
        </h1>
        <div className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent animate-width-expand" />
        <p className="mt-4 text-sm tracking-[0.4em] uppercase text-muted-foreground/70">AI Music Production</p>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes equalizer-bar {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @keyframes scan-line {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        @keyframes width-expand {
          from { width: 0; }
          to { width: 4rem; }
        }

        @keyframes height-expand {
          from { height: 0; }
          to { height: 4rem; }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(175, 160, 145, 0.3); }
          50% { text-shadow: 0 0 40px rgba(175, 160, 145, 0.6), 0 0 60px rgba(175, 160, 145, 0.3); }
        }

        .animate-width-expand {
          animation: width-expand 0.8s ease-out forwards;
        }

        .animate-height-expand {
          animation: height-expand 0.8s ease-out forwards;
        }

        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
