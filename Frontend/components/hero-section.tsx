"use client"

import { Button } from "@/components/ui/button"
import { Play, Sparkles, ArrowRight } from "lucide-react"
import { WaveformVisualizer } from "@/components/waveform-visualizer"
import { AnimatedSection } from "@/components/animated-section"
import { ParticleBackground } from "@/components/particle-background"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-32">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-primary/10 blur-[128px] animate-ambient-glow" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-accent/10 blur-[128px] animate-ambient-glow delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/5 blur-[200px] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <AnimatedSection animation="slide-left">
            {/* Badge */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 sm:px-4 py-1.5 animate-pulse-glow">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">AI-Powered Music Production</span>
            </div>

            {/* Headline */}
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl text-balance">
              Transform Your <span className="text-irenown-gradient shimmer">Voice</span> Into Professional Tracks
            </h1>

            {/* Subheadline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Upload your vocals and let AI create studio-quality instrumentals, mix, and master your music in minutes.
              No production skills required.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-irenown gap-2 transition-all duration-300 hover:scale-105 shine-effect touch-target w-full sm:w-auto"
                asChild
              >
                <Link href="/auth/signup">
                  Start Creating Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border bg-card/50 text-foreground hover:bg-card hover:border-primary/50 gap-2 transition-all duration-300 touch-target w-full sm:w-auto"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 sm:mt-12 grid grid-cols-2 xs:grid-cols-3 gap-6 sm:gap-8">
              {[
                { value: "50K+", label: "Songs Created" },
                { value: "10K+", label: "Artists" },
                { value: "4.9/5", label: "Rating" },
              ].map((stat, i) => (
                <AnimatedSection key={stat.label} delay={i * 100} animation="slide-up">
                  <div className="min-w-[80px]">
                    <p className="text-xl sm:text-3xl font-bold text-irenown-gradient">{stat.value}</p>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* Right Content - Interactive Demo */}
          <AnimatedSection animation="slide-right" delay={200}>
            <div className="relative mt-8 lg:mt-0">
              <div className="relative rounded-2xl border border-border bg-card/50 p-4 sm:p-6 backdrop-blur-sm gradient-border">
                {/* Studio Interface Preview */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Track Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 sm:h-10 sm:w-10 rounded-lg bg-primary/20 flex items-center justify-center animate-scale-bounce shrink-0">
                        <span className="text-base sm:text-lg">🎤</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm sm:text-base truncate">Your Vocal Track</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">3:24 • C Major • 120 BPM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-[10px] sm:text-xs text-accent font-medium hidden sm:inline">
                        Processing
                      </span>
                    </div>
                  </div>

                  {/* Waveform */}
                  <WaveformVisualizer />

                  {/* Genre Selection */}
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Generated Instrumental</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {["Pop", "R&B", "Hip-Hop", "Rock", "Electronic"].map((genre, i) => (
                        <span
                          key={genre}
                          className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium transition-all cursor-pointer hover:scale-105 touch-target ${i === 0
                              ? "bg-primary text-primary-foreground glow-irenown"
                              : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                            }`}
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Creating your track...</span>
                      <span className="text-primary font-medium">78%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full transition-all duration-1000 animate-pulse"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements - Hidden on very small screens */}
              <div className="hidden sm:block absolute -top-4 -right-4 rounded-xl border border-border bg-card p-2.5 sm:p-3 shadow-xl animate-float glow-irenown">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <span className="text-xs sm:text-sm">🎹</span>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-medium text-foreground">AI Instrumental</p>
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground">Studio Quality</p>
                  </div>
                </div>
              </div>

              <div
                className="hidden sm:block absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-2.5 sm:p-3 shadow-xl animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-xs sm:text-sm">✨</span>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-medium text-foreground">Auto Mastering</p>
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground">Radio Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
