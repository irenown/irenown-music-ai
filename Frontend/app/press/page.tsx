import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Mail } from "lucide-react"

const pressReleases = [
  {
    date: "Dec 15, 2024",
    title: "iRenown Raises $25M Series A to Democratize Music Production",
    excerpt: "Funding led by Andreessen Horowitz will accelerate AI model development and global expansion.",
  },
  {
    date: "Nov 28, 2024",
    title: "iRenown Launches Premium Quality Tier with ElevenLabs Partnership",
    excerpt: "New premium tier delivers studio-grade music generation for professional releases.",
  },
  {
    date: "Oct 10, 2024",
    title: "iRenown Surpasses 50,000 Songs Created in First Year",
    excerpt: "Platform sees rapid adoption among independent artists and content creators worldwide.",
  },
  {
    date: "Aug 22, 2024",
    title: "iRenown Introduces Real-Time Collaboration Features",
    excerpt: "New tools enable artists to collaborate on projects remotely in real-time.",
  },
]

const mediaLogos = [
  { name: "TechCrunch", logo: "/techcrunch-logo-generic.png" },
  { name: "The Verge", logo: "/the-verge-logo.png" },
  { name: "Wired", logo: "/wired-logo.jpg" },
  { name: "Billboard", logo: "/billboard-logo.jpg" },
  { name: "Rolling Stone", logo: "/rolling-stone-logo.jpg" },
]

export default function PressPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Press & Media"
        description="Get the latest news about iRenown. For press inquiries, please contact our communications team."
        badge="Newsroom"
      />

      <section className="py-12 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">Featured in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
            {mediaLogos.map((media) => (
              <img
                key={media.name}
                src={media.logo || "/placeholder.svg"}
                alt={media.name}
                className="h-8 object-contain grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-8">Latest News</h2>

              <div className="space-y-6">
                {pressReleases.map((release, i) => (
                  <AnimatedSection key={release.title} delay={i * 100}>
                    <article className="group rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:glow-silver cursor-pointer">
                      <time className="text-xs text-muted-foreground">{release.date}</time>
                      <h3 className="text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2">{release.excerpt}</p>
                      <Button variant="link" className="mt-4 p-0 h-auto text-primary">
                        Read More <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <AnimatedSection animation="slide-right">
                <div className="rounded-2xl border border-border bg-card/50 p-6">
                  <h3 className="font-semibold text-foreground mb-4">Press Contact</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For press inquiries, interviews, and media requests:
                  </p>
                  <a href="mailto:press@irenown.com" className="flex items-center gap-2 text-primary hover:underline">
                    <Mail className="h-4 w-4" />
                    press@irenown.com
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-right" delay={200}>
                <div className="rounded-2xl border border-border bg-card/50 p-6">
                  <h3 className="font-semibold text-foreground mb-4">Brand Assets</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download our logo, product screenshots, and brand guidelines.
                  </p>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground">
                    <Download className="mr-2 h-4 w-4" />
                    Download Press Kit
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="slide-right" delay={300}>
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Founded</dt>
                      <dd className="text-foreground font-medium">2023</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Headquarters</dt>
                      <dd className="text-foreground font-medium">San Francisco, CA</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Songs Created</dt>
                      <dd className="text-foreground font-medium">50,000+</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Active Users</dt>
                      <dd className="text-foreground font-medium">10,000+</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Total Funding</dt>
                      <dd className="text-foreground font-medium">$28M</dd>
                    </div>
                  </dl>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
