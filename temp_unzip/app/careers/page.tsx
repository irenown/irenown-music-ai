import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign, ArrowRight, Sparkles, Heart, Zap, Globe } from "lucide-react"

const perks = [
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive medical, dental, and vision coverage" },
  { icon: Zap, title: "Equity Package", description: "Meaningful ownership stake in the company" },
  { icon: Globe, title: "Remote First", description: "Work from anywhere in the world" },
  { icon: Sparkles, title: "Learning Budget", description: "$2,000 annual budget for courses and conferences" },
]

const openings = [
  {
    title: "Senior AI/ML Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$180k - $250k",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "San Francisco / Remote",
    type: "Full-time",
    salary: "$140k - $180k",
  },
  {
    title: "Audio DSP Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$160k - $220k",
  },
  {
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
  },
  {
    title: "Customer Success Manager",
    department: "Operations",
    location: "New York / Remote",
    type: "Full-time",
    salary: "$90k - $120k",
  },
]

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Join Our Team"
        description="Help us build the future of AI-powered music production. We're looking for passionate people who want to make an impact."
        badge="Careers"
      />

      {/* Perks Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Why Join iRenown?</h2>
            <p className="mt-4 text-muted-foreground">
              We take care of our team so they can focus on building amazing things
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk, i) => (
              <AnimatedSection key={perk.title} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl border border-border bg-card/50 transition-all hover:border-primary/50 hover:glow-silver">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <perk.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Open Positions</h2>
            <p className="mt-4 text-muted-foreground">Find your next opportunity with us</p>
          </AnimatedSection>

          <div className="space-y-4 max-w-4xl mx-auto">
            {openings.map((job, i) => (
              <AnimatedSection key={job.title} delay={i * 100}>
                <div className="group rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:glow-silver cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-primary mb-1">{job.department}</p>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <Button className="shrink-0 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Don't see your role */}
          <AnimatedSection delay={500} className="mt-12 text-center">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-foreground mb-2">Don't see your role?</h3>
              <p className="text-muted-foreground mb-4">
                We're always looking for talented people. Send us your resume and we'll keep you in mind for future
                openings.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-silver">
                Send Your Resume
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
