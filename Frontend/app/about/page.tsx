import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Users, Target, Lightbulb, Award, Music, Cpu, Globe, Zap } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We believe everyone deserves access to professional music production tools, regardless of budget or experience.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We push the boundaries of AI technology to create tools that amplify human creativity, not replace it.",
  },
  {
    icon: Users,
    title: "Artist-Centric",
    description:
      "Every feature we build starts with understanding what artists actually need in their creative workflow.",
  },
  {
    icon: Award,
    title: "Quality Obsessed",
    description: "We never compromise on audio quality. Every track that leaves our platform is studio-grade.",
  },
]

const milestones = [
  { number: "10K+", label: "Active Artists", icon: Users },
  { number: "500K+", label: "Songs Created", icon: Music },
  { number: "50+", label: "Genres Supported", icon: Globe },
  { number: "99.9%", label: "Uptime", icon: Zap },
]

const techHighlights = [
  {
    icon: Cpu,
    title: "Advanced AI Models",
    description:
      "State-of-the-art neural networks trained on millions of professional tracks to understand and generate music.",
  },
  {
    icon: Music,
    title: "Studio-Grade Audio",
    description: "Industry-leading audio processing ensures every track meets professional production standards.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description: "Distributed cloud architecture delivers fast, reliable performance to creators worldwide.",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Advanced optimization enables near-instant vocal enhancement and rapid music generation.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="About iRenown"
        description="We're on a mission to democratize music production and empower creators worldwide with AI-powered tools."
        badge="Our Story"
      />

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <AnimatedSection animation="slide-left">
              <div className="relative aspect-video rounded-2xl overflow-hidden gradient-border">
                <img src="/modern-ai-music-production-studio-with-waveforms.jpg" alt="iRenown Studio" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-right" delay={200}>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-6">Built by Musicians, for Musicians</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  iRenown was born from a simple frustration: why does creating professional-quality music require
                  thousands of dollars in equipment and years of training?
                </p>
                <p>
                  Our team of musicians, producers, and AI researchers came together with a shared vision: to make
                  studio-quality music production accessible to everyone.
                </p>
                <p>
                  Today, we serve creators worldwide, from bedroom producers to professional musicians, helping them
                  bring their creative visions to life with the power of AI.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Milestones/Stats Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">iRenown by the Numbers</h2>
            <p className="mt-4 text-muted-foreground">Growing community of creators worldwide</p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, i) => (
              <AnimatedSection key={milestone.label} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card/50 p-8 h-full text-center transition-all hover:border-primary/50 hover:glow-irenown group">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mx-auto group-hover:scale-110 transition-transform">
                    <milestone.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-irenown-gradient mb-2">{milestone.number}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our Values</h2>
            <p className="mt-4 text-muted-foreground">The principles that guide everything we do</p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card/50 p-6 h-full transition-all hover:border-primary/50 hover:glow-irenown">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our Technology</h2>
            <p className="mt-4 text-muted-foreground">Cutting-edge AI powering your creativity</p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {techHighlights.map((tech, i) => (
              <AnimatedSection key={tech.title} delay={i * 100}>
                <div className="rounded-2xl border border-border bg-card/50 p-6 h-full transition-all hover:border-primary/50 hover:glow-irenown flex gap-4">
                  <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <tech.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{tech.title}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
