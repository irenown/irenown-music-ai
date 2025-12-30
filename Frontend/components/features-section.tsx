import { Mic, Music2, Sliders, Zap, Globe, Shield, Sparkles, Clock } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const features = [
  {
    icon: Mic,
    title: "AI Vocal Enhancement",
    description:
      "Professional noise reduction, pitch correction, and vocal clarity powered by our iRenown Neural Vocal Engine.",
    highlight: true,
  },
  {
    icon: Music2,
    title: "Smart Key Detection",
    description: "Automatically detects your vocal's key and tempo to generate perfectly matched instrumentals.",
    highlight: false,
  },
  {
    icon: Sliders,
    title: "Pro Mixing & Mastering",
    description: "Industry-standard processing with the iRenown Master-Pro Suite for radio-ready final tracks.",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get your professionally produced track in under 5 minutes, not days or weeks.",
    highlight: true,
  },
  {
    icon: Globe,
    title: "50+ Genres",
    description: "From Pop to Hip-Hop, R&B to EDM—generate any style that fits your vision.",
    highlight: false,
  },
  {
    icon: Shield,
    title: "Commercial License",
    description: "Full rights to your music. Stream, sell, or share without restrictions.",
    highlight: false,
  },
  {
    icon: Sparkles,
    title: "Premium Quality Tier",
    description: "iRenown HD Generation Core for studio-grade professional releases.",
    highlight: true,
  },
  {
    icon: Clock,
    title: "Stem Downloads",
    description: "Get separate vocal and instrumental tracks for further editing in your DAW.",
    highlight: false,
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[128px] animate-ambient-glow" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Updated to bronze gradient */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Everything You Need to Create <span className="text-bronze-gradient">Hit Songs</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Professional music production tools powered by cutting-edge AI, designed for musicians at every level.
          </p>
        </AnimatedSection>

        {/* Features Grid - Updated glow to bronze */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 75}>
              <div
                className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${feature.highlight
                    ? "border-primary/50 bg-primary/5 hover:bg-primary/10 hover:glow-bronze"
                    : "border-border bg-card/50 hover:border-primary/30 hover:bg-card"
                  }`}
              >
                {/* Icon */}
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${feature.highlight
                      ? "bg-primary/20 group-hover:bg-primary/30"
                      : "bg-secondary group-hover:bg-primary/20"
                    }`}
                >
                  <feature.icon
                    className={`h-6 w-6 transition-colors ${feature.highlight ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                      }`}
                  />
                </div>

                {/* Content */}
                <h3 className="text-base font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
