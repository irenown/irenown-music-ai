import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[128px] animate-ambient-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[128px] animate-ambient-glow delay-500" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 animate-pulse-glow">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Start free, no credit card required</span>
          </div>

          {/* Headline - Updated to bronze gradient */}
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            Ready to Create Your Next <span className="text-bronze-gradient">Hit</span>?
          </h2>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Join 10,000+ musicians who are already creating professional tracks with AI. Your voice, our
            technology—let&apos;s make music magic together.
          </p>

          {/* CTA - Updated glow to bronze */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-bronze gap-2 text-base px-8 transition-all duration-300 hover:scale-105 shine-effect"
            >
              Start Creating Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-card/50 text-foreground hover:bg-card hover:border-primary/50 text-base px-8 transition-all duration-300"
            >
              View Pricing
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap gap-8 justify-center text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> 2 free songs every month
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <span className="text-primary">✓</span> Cancel anytime
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
