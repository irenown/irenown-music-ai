import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Book, Code, Zap, Upload, Music, Sliders, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    slug: "getting-started",
    icon: Zap,
    title: "Getting Started",
    description: "Learn the basics and create your first track",
    links: [
      { label: "Quick Start Guide", id: "quick-start" },
      { label: "Platform Overview", id: "platform-overview" },
      { label: "Account Setup", id: "account-setup" },
    ],
  },
  {
    slug: "uploading-vocals",
    icon: Upload,
    title: "Uploading Vocals",
    description: "Best practices for vocal recording and upload",
    links: [
      { label: "Supported Formats", id: "supported-formats" },
      { label: "Recording Tips", id: "recording-tips" },
      { label: "Audio Requirements", id: "audio-requirements" },
    ],
  },
  {
    slug: "ai-generation",
    icon: Music,
    title: "AI Generation",
    description: "Understanding instrumental and mixing options",
    links: [
      { label: "Genre Selection", id: "genre-selection" },
      { label: "Style Prompts", id: "style-prompts" },
      { label: "Quality Tiers", id: "quality-tiers" },
    ],
  },
  {
    slug: "mixing-mastering",
    icon: Sliders,
    title: "Mixing & Mastering",
    description: "Fine-tune your final track",
    links: [
      { label: "Vocal Effects", id: "vocal-effects" },
      { label: "Mix Controls", id: "mix-controls" },
      { label: "Mastering Options", id: "mastering-options" },
    ],
  },
  {
    slug: "exporting",
    icon: Download,
    title: "Exporting",
    description: "Download and share your finished music",
    links: [
      { label: "File Formats", id: "file-formats" },
      { label: "Stem Downloads", id: "stem-downloads" },
      { label: "Sharing Options", id: "sharing-options" },
    ],
  },
  {
    slug: "api-reference",
    icon: Code,
    title: "API Reference",
    description: "Integrate iRenown into your workflow",
    links: [
      { label: "Authentication", id: "authentication" },
      { label: "Endpoints", id: "endpoints" },
      { label: "Webhooks", id: "webhooks" },
    ],
  },
]

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Documentation"
        description="Everything you need to know about using iRenown. From getting started to advanced features."
        badge="Docs"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="search"
                placeholder="Search documentation..."
                className="w-full h-14 rounded-xl border border-border bg-input px-5 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <Book className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, i) => (
              <AnimatedSection key={section.title} delay={i * 100}>
                <div className="group h-full rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:glow-silver flex flex-col">
                  <Link href={`/docs/${section.slug}`} className="block mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4 transition-colors group-hover:bg-primary/20">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </Link>

                  <ul className="space-y-2 mt-auto">
                    {section.links.map((link) => (
                      <li key={link.id}>
                        <Link
                          href={`/docs/${section.slug}#${link.id}`}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 py-1"
                        >
                          <ArrowRight className="h-3 w-3" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={600} className="mt-12">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Need More Help?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 text-primary hover:underline">
                  Contact Support <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
