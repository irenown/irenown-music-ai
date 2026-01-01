import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { docContent } from "@/lib/docs-content"

export default async function DocDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const doc = docContent[slug]

    if (!doc) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="pt-24 lg:pt-32 pb-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/docs"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Documentation
                    </Link>

                    <AnimatedSection>
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{doc.title}</h1>
                        <p className="text-xl text-muted-foreground mb-12">{doc.description}</p>
                    </AnimatedSection>

                    <div className="space-y-12">
                        {doc.sections.map((section, i) => (
                            <AnimatedSection key={section.id} delay={i * 100}>
                                <div id={section.id} className="scroll-mt-32">
                                    <div className="flex gap-4 p-6 rounded-2xl border border-border bg-card/50 transition-all hover:border-primary/30 group">
                                        <div className="mt-1 flex-shrink-0">
                                            <CheckCircle2 className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{section.subtitle}</h3>
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                {section.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    <AnimatedSection delay={600} className="mt-16 pt-12 border-t border-border">
                        <div className="rounded-2xl bg-gradient-to-r from-irenown-dark/20 to-irenown-mid/20 p-8 text-center">
                            <h3 className="text-xl font-bold text-foreground mb-2">Ready to try it out?</h3>
                            <p className="text-muted-foreground mb-6">
                                Experience the power of iRenown AI for yourself.
                            </p>
                            <Link href="/studio">
                                <button className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:scale-105">
                                    Go to Studio
                                </button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </div>

            <Footer />
        </main>
    )
}

export async function generateStaticParams() {
    return Object.keys(docContent).map((slug) => ({
        slug,
    }))
}
