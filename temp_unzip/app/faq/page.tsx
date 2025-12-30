"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { ChevronDown, Search } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How does iRenown work?",
        a: "Simply upload your vocal track, choose a genre and style, and our AI will generate a custom instrumental, mix your vocals professionally, and master the final track. The entire process takes just a few minutes.",
      },
      {
        q: "What audio formats do you support?",
        a: "We support MP3, WAV, FLAC, M4A, and OGG formats for upload. For downloads, we offer MP3 (128kbps and 320kbps), WAV, and FLAC depending on your subscription tier.",
      },
      {
        q: "Do I need any music production experience?",
        a: "Not at all! iRenown is designed for everyone, from complete beginners to professional producers. Our AI handles all the technical aspects of production.",
      },
    ],
  },
  {
    category: "Pricing & Plans",
    questions: [
      {
        q: "Can I try iRenown for free?",
        a: "Yes! Our free tier gives you 2 songs per month with standard quality output. No credit card required to get started.",
      },
      {
        q: "What's the difference between Standard and Premium quality?",
        a: "Standard quality uses Stable Audio for instrumental generation and is included in all subscription tiers. Premium quality uses ElevenLabs for studio-grade output and is available as a pay-per-song option for professional releases.",
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
      },
    ],
  },
  {
    category: "Rights & Licensing",
    questions: [
      {
        q: "Do I own the music I create?",
        a: "Yes! You retain full rights to all music created using iRenown. You can stream, sell, and distribute your tracks without any restrictions or royalty payments to us.",
      },
      {
        q: "Can I use my tracks commercially?",
        a: "Yes, all paid tiers include a full commercial license. You can monetize your music on streaming platforms, in videos, advertisements, or any other commercial use.",
      },
      {
        q: "Is there a watermark on the audio?",
        a: "Free tier tracks include a subtle audio watermark. All paid tiers produce watermark-free output.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "What's the maximum file size I can upload?",
        a: "The maximum file size is 100MB for audio uploads. For longer tracks, we recommend using WAV format at 44.1kHz sample rate.",
      },
      {
        q: "How long does processing take?",
        a: "Most tracks are processed in 3-5 minutes. Premium quality tracks may take slightly longer. Pro and Studio tier members get priority processing.",
      },
      {
        q: "Can I download individual stems?",
        a: "Yes, stem downloads (separate vocal and instrumental tracks) are available for Pro and Studio tier members, as well as all Premium quality purchases.",
      },
    ],
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about iRenown. Can't find what you're looking for? Contact our support team."
        badge="FAQ"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="relative">
              <input
                type="search"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 rounded-xl border border-border bg-input px-5 pr-12 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {filteredFaqs.map((category, catIndex) => (
              <AnimatedSection key={category.category} delay={catIndex * 100}>
                <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
                  <h2 className="text-lg font-semibold text-foreground p-6 pb-0">{category.category}</h2>
                  <div className="divide-y divide-border">
                    {category.questions.map((item, i) => {
                      const id = `${category.category}-${i}`
                      const isOpen = openItems.includes(id)

                      return (
                        <div key={i} className="p-6">
                          <button
                            onClick={() => toggleItem(id)}
                            className="w-full flex items-start justify-between gap-4 text-left"
                          >
                            <span className="font-medium text-foreground">{item.q}</span>
                            <ChevronDown
                              className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              isOpen ? "max-h-96 mt-4" : "max-h-0"
                            }`}
                          >
                            <p className="text-muted-foreground">{item.a}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400} className="mt-12">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">Our support team is here to help you with any questions.</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 glow-silver"
              >
                Contact Support
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
