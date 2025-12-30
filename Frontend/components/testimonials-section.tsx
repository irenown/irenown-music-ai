import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Singer-Songwriter",
    avatar: "SC",
    rating: 5,
    quote:
      "I've been making music for 10 years and this is game-changing. I uploaded my vocals and got back a professional track that sounds like it came from a real studio session.",
  },
  {
    name: "Marcus Johnson",
    role: "Hip-Hop Artist",
    avatar: "MJ",
    rating: 5,
    quote:
      "The AI understands what I'm going for. I describe the vibe I want and it delivers beats that match my flow perfectly. Plus the mixing is on point.",
  },
  {
    name: "Elena Rodriguez",
    role: "Content Creator",
    avatar: "ER",
    rating: 5,
    quote:
      "I needed original music for my YouTube channel without copyright issues. iRenown saved me thousands in licensing fees and the quality is incredible.",
  },
  {
    name: "David Park",
    role: "Music Producer",
    avatar: "DP",
    rating: 5,
    quote:
      "I use the Premium tier for client demos. The iRenown generation quality is genuinely impressive—clients can't tell it's AI-generated until I tell them.",
  },
  {
    name: "Aisha Williams",
    role: "Indie Artist",
    avatar: "AW",
    rating: 5,
    quote:
      "Released my first EP entirely using iRenown. The key detection and tempo matching is scary accurate. It's like having a full band in my bedroom.",
  },
  {
    name: "Tom Mitchell",
    role: "Podcast Producer",
    avatar: "TM",
    rating: 5,
    quote:
      "The vocal enhancement alone is worth the subscription. My podcast intros sound radio-quality now. The custom music generation is just a bonus.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Loved by 10,000+ Musicians
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            From bedroom producers to professional artists—hear what creators are saying.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/30"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6">&quot;{testimonial.quote}&quot;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
