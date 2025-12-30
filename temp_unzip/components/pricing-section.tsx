import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap, Crown } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out the platform",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "2 songs per month",
      "Standard quality (Stable Audio)",
      "MP3 download (128kbps)",
      "5 genre presets",
      "Watermarked output",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
    premium: false,
  },
  {
    name: "Creator",
    description: "For content creators and hobbyists",
    price: "$14.99",
    period: "/month",
    icon: Sparkles,
    features: [
      "20 songs per month",
      "Standard quality (Stable Audio)",
      "MP3 download (320kbps)",
      "All 50+ genres",
      "No watermark",
      "Basic vocal effects",
      "Email support",
    ],
    cta: "Start Creating",
    popular: true,
    premium: false,
  },
  {
    name: "Pro",
    description: "For professional musicians",
    price: "$39.99",
    period: "/month",
    icon: Crown,
    features: [
      "50 songs per month",
      "Standard quality (Stable Audio)",
      "WAV & FLAC downloads",
      "Custom style prompts",
      "Advanced vocal effects",
      "Priority processing",
      "Priority support",
    ],
    cta: "Go Pro",
    popular: false,
    premium: false,
  },
  {
    name: "Studio",
    description: "For studios and power users",
    price: "$99.99",
    period: "/month",
    icon: Crown,
    features: [
      "Unlimited songs",
      "Standard quality (Stable Audio)",
      "All formats + stems",
      "API access",
      "Team collaboration",
      "White-label option",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
    premium: false,
  },
]

const premiumPricing = {
  title: "Premium Quality",
  subtitle: "Pay-per-song with ElevenLabs",
  description: "Studio-grade quality for professional releases",
  options: [
    { songs: 1, price: "$4.99", savings: null },
    { songs: 3, price: "$12.99", savings: "Save 13%" },
    { songs: 10, price: "$39.99", savings: "Save 20%" },
    { songs: 30, price: "$99.99", savings: "Save 33%" },
  ],
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[300px] sm:h-[500px] w-[300px] sm:w-[500px] rounded-full bg-accent/10 blur-[128px]" />
        <div className="absolute bottom-0 left-0 h-[300px] sm:h-[500px] w-[300px] sm:w-[500px] rounded-full bg-primary/10 blur-[128px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground text-pretty">
            Start free, upgrade when you need more. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Subscription Plans - Horizontal scroll on mobile */}
        <div className="relative mb-10 sm:mb-16">
          {/* Mobile scroll hint gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none lg:hidden" />

          <div className="flex lg:grid gap-4 sm:gap-6 lg:grid-cols-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scrollbar-hide snap-x snap-mandatory">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-5 sm:p-6 transition-all flex-shrink-0 w-[280px] sm:w-[300px] lg:w-auto snap-start ${
                  plan.popular
                    ? "border-primary bg-primary/5 lg:scale-[1.02]"
                    : "border-border bg-card/50 hover:border-primary/30"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1">
                    <span className="text-xs font-semibold text-primary-foreground whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-5 sm:mb-6">
                  <div
                    className={`mb-4 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${
                      plan.popular ? "bg-primary/20" : "bg-secondary"
                    }`}
                  >
                    <plan.icon
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-5 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check
                        className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-accent"}`}
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full touch-target ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Quality Section */}
        <div className="rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5 sm:p-8 lg:p-12">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-center">
            {/* Left Content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 sm:px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">{premiumPricing.subtitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground lg:text-3xl">{premiumPricing.title}</h3>
              <p className="mt-3 text-muted-foreground text-base sm:text-lg">{premiumPricing.description}</p>
              <ul className="mt-5 sm:mt-6 space-y-2">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  ElevenLabs-powered music generation
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  Professional LANDR mastering included
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  Stem downloads (vocal + instrumental)
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  Full commercial license
                </li>
              </ul>
            </div>

            {/* Right - Pricing Options */}
            <div className="grid gap-3 grid-cols-2">
              {premiumPricing.options.map((option) => (
                <button
                  key={option.songs}
                  className="group relative rounded-xl border border-border bg-card/50 p-3 sm:p-4 text-left transition-all hover:border-primary/50 hover:bg-card active:scale-[0.98] touch-target"
                >
                  {option.savings && (
                    <span className="absolute -top-2 right-2 sm:right-3 rounded-full bg-accent px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-accent-foreground whitespace-nowrap">
                      {option.savings}
                    </span>
                  )}
                  <p className="text-xl sm:text-2xl font-bold text-foreground">{option.price}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {option.songs} premium {option.songs === 1 ? "track" : "tracks"}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
