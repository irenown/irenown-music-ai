import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Play, Clock, BookOpen, Zap } from "lucide-react"

const tutorials = [
  {
    title: "Getting Started with iRenown",
    description: "A complete walkthrough of the platform from signup to your first track",
    duration: "12 min",
    level: "Beginner",
    thumbnail: "/tutorial-video-thumbnail-music-production.jpg",
  },
  {
    title: "Recording Professional Vocals at Home",
    description: "Tips and techniques for capturing studio-quality vocals in any environment",
    duration: "18 min",
    level: "Beginner",
    thumbnail: "/vocal-recording-tutorial.jpg",
  },
  {
    title: "Mastering Genre Selection",
    description: "How to choose the perfect genre and style for your track",
    duration: "10 min",
    level: "Beginner",
    thumbnail: "/music-genre-selection-interface.jpg",
  },
  {
    title: "Advanced Style Prompts",
    description: "Write effective prompts to get exactly the sound you're looking for",
    duration: "15 min",
    level: "Intermediate",
    thumbnail: "/ai-prompt-writing-music.jpg",
  },
  {
    title: "Using Vocal Effects Like a Pro",
    description: "Deep dive into autotune, reverb, and other vocal processing options",
    duration: "22 min",
    level: "Intermediate",
    thumbnail: "/vocal-effects-processing-tutorial.jpg",
  },
  {
    title: "Mixing Your Final Track",
    description: "Balance vocals and instrumentals for the perfect final mix",
    duration: "25 min",
    level: "Intermediate",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    title: "Premium Quality: When to Use It",
    description: "Understanding the differences between standard and premium tiers",
    duration: "8 min",
    level: "All Levels",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    title: "API Integration Guide",
    description: "Integrate iRenown into your existing workflow with our API",
    duration: "30 min",
    level: "Advanced",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
]

const levelColors = {
  Beginner: "bg-green-500/20 text-green-400",
  Intermediate: "bg-yellow-500/20 text-yellow-400",
  Advanced: "bg-red-500/20 text-red-400",
  "All Levels": "bg-primary/20 text-primary",
}

export default function TutorialsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Tutorials"
        description="Learn how to get the most out of iRenown with our step-by-step video tutorials."
        badge="Learn"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-wrap gap-2 mb-12">
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  level === "All"
                    ? "bg-primary text-primary-foreground glow-silver"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                }`}
              >
                {level}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tutorials.map((tutorial, i) => (
              <AnimatedSection key={tutorial.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-border bg-card/50 overflow-hidden transition-all hover:border-primary/50 hover:glow-silver cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={tutorial.thumbnail || "/placeholder.svg"}
                      alt={tutorial.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center glow-silver">
                        <Play className="h-8 w-8 text-primary-foreground ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tutorial.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${levelColors[tutorial.level as keyof typeof levelColors]}`}
                    >
                      {tutorial.level}
                    </span>
                    <h3 className="text-base font-semibold text-foreground mt-2 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tutorial.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={800} className="mt-16">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-primary">Structured Learning</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Follow Our Learning Path</h3>
                  <p className="text-muted-foreground max-w-xl">
                    Go from beginner to pro with our curated learning path. Complete all modules and earn your iRenown
                    certification.
                  </p>
                </div>
                <button className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 glow-silver">
                  <Zap className="h-5 w-5" />
                  Start Learning Path
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
