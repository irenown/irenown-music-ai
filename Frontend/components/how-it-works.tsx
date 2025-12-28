import { Upload, Wand2, Music, Download } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const steps = [
  {
    icon: Upload,
    title: "Upload Your Vocals",
    description:
      "Record directly or upload your vocal track. Our AI handles noise reduction and enhancement automatically.",
  },
  {
    icon: Wand2,
    title: "Choose Your Style",
    description: "Select from 50+ genres and moods. AI detects your key and tempo for perfect instrumental matching.",
  },
  {
    icon: Music,
    title: "AI Creates Magic",
    description:
      "Our AI generates a custom instrumental, professionally mixes your vocals, and masters the final track.",
  },
  {
    icon: Download,
    title: "Download & Share",
    description:
      "Get your studio-quality track in multiple formats. Ready for streaming, social media, or commercial release.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-primary/5 blur-[100px] animate-ambient-glow" />
        <div className="absolute top-1/2 right-0 h-64 w-64 rounded-full bg-accent/5 blur-[100px] animate-ambient-glow delay-500" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Updated to bronze gradient */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">How It Works</p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            From Vocals to <span className="text-bronze-gradient">Masterpiece</span> in Minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Our AI-powered pipeline handles everything a traditional studio does—in a fraction of the time.
          </p>
        </AnimatedSection>

        {/* Steps - Updated glow to bronze */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className="relative group">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
                )}

                <div className="relative rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/50 hover:glow-bronze hover:-translate-y-1">
                  {/* Step Number */}
                  <div className="absolute top-2 left-2 sm:-top-3 sm:-left-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground glow-bronze z-10">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
