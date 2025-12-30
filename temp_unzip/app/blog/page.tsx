import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const posts = [
  {
    title: "The Future of AI in Music Production",
    excerpt: "How artificial intelligence is transforming the way we create, produce, and distribute music.",
    image: "/futuristic-music-studio-ai-visualization.jpg",
    category: "Industry",
    date: "Dec 20, 2024",
    readTime: "5 min read",
  },
  {
    title: "5 Tips for Recording Better Vocals at Home",
    excerpt: "Professional-quality vocal recordings don't require a professional studio. Here's how to get started.",
    image: "/home-recording-studio-microphone.jpg",
    category: "Tips",
    date: "Dec 15, 2024",
    readTime: "4 min read",
  },
  {
    title: "Behind the Algorithm: How Our AI Creates Music",
    excerpt: "A deep dive into the technology that powers iRenown's instrumental generation.",
    image: "/neural-network-music-visualization-abstract.jpg",
    category: "Technology",
    date: "Dec 10, 2024",
    readTime: "8 min read",
  },
  {
    title: "Artist Spotlight: How Sarah Used AI to Launch Her Career",
    excerpt: "From bedroom producer to streaming success - one artist's journey with iRenown.",
    image: "/female-artist-music-producer-studio.jpg",
    category: "Stories",
    date: "Dec 5, 2024",
    readTime: "6 min read",
  },
  {
    title: "Understanding Music Copyright in the AI Era",
    excerpt: "What you need to know about rights, licensing, and ownership when using AI tools.",
    image: "/legal-documents-music-copyright.jpg",
    category: "Legal",
    date: "Nov 28, 2024",
    readTime: "7 min read",
  },
  {
    title: "New Feature: Real-Time Collaboration",
    excerpt: "Announcing our latest update that lets you collaborate with artists around the world.",
    image: "/remote-collaboration-music-production.jpg",
    category: "Product",
    date: "Nov 22, 2024",
    readTime: "3 min read",
  },
]

const categories = ["All", "Industry", "Tips", "Technology", "Stories", "Legal", "Product"]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Blog"
        description="Insights, tutorials, and stories from the world of AI-powered music production."
        badge="Latest Posts"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === "All"
                    ? "bg-primary text-primary-foreground glow-silver"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </AnimatedSection>

          <AnimatedSection className="mb-12">
            <article className="group rounded-2xl border border-border bg-card/50 overflow-hidden transition-all hover:border-primary/50 hover:glow-silver">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={posts[0].image || "/placeholder.svg"}
                    alt={posts[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs font-medium text-primary mb-2">{posts[0].category}</span>
                  <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{posts[0].excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{posts[0].date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {posts[0].readTime}
                    </span>
                  </div>
                  <Link href="#" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(1).map((post, i) => (
              <AnimatedSection key={post.title} delay={i * 100}>
                <article className="group h-full rounded-2xl border border-border bg-card/50 overflow-hidden transition-all hover:border-primary/50 hover:glow-silver">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary">{post.category}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
