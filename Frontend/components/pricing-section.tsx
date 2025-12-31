"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Zap, Crown, Loader2 } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useRouter } from "next/navigation"

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out the platform",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "1 trial song (1 minute)",
      "Standard quality output",
      "MP3 download (128kbps)",
      "5 genre presets",
      "Watermarked output",
      "Community support",
    ],
    cta: "Start for Free",
    popular: false,
    premium: false,
  }
]

export function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const router = useRouter()

  const handlePurchase = async (planId: string, type: 'subscription' | 'credit' = 'subscription', amount?: number) => {
    const user = apiClient.getUser()
    if (!user) {
      router.push('/auth/signin?redirect=/pricing')
      return
    }

    setLoadingPlan(planId === 'credits' ? `credits-${amount}` : planId)
    try {
      const { url } = await apiClient.post('/api/payments/create-checkout-session', {
        plan: planId,
        type,
        amount
      })

      if (url) window.location.href = url
    } catch (error) {
      console.error("Purchase failed:", error)
      alert("Failed to initiate payment. Please try again later.")
    } finally {
      setLoadingPlan(null)
    }
  }

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

        {/* Subscription Plans */}
        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 sm:p-8 transition-all flex flex-col ${plan.popular
                ? "border-primary bg-primary/5 lg:scale-[1.02]"
                : "border-border bg-card/50 hover:border-primary/30"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1">
                  <span className="text-xs font-semibold text-primary-foreground">Most Popular</span>
                </div>
              )}

              <div className="mb-6">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${plan.popular ? "bg-primary/20" : "bg-secondary"}`}>
                  <plan.icon className={`h-6 w-6 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 shrink-0 mt-0.5 ${plan.popular ? "text-primary" : "text-accent"}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                disabled={plan.id === 'free' || loadingPlan !== null}
                onClick={() => handlePurchase(plan.id)}
                className={`w-full h-12 ${plan.popular
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {loadingPlan === plan.id ? <Loader2 className="animate-spin" /> : plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Premium Credits Section */}
        <div className="rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Premium Quality</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Buy Premium Credits</h3>
              <p className="mt-3 text-muted-foreground text-lg">Pay only for what you need. One credit = One studio-grade song.</p>
            </div>

            <div className="grid gap-3 grid-cols-1 xs:grid-cols-2">
              {[
                { amount: 1, price: "$4.99" },
                { amount: 3, price: "$12.99", savings: "Save 13%" },
                { amount: 10, price: "$39.99", savings: "Save 20%" },
                { amount: 30, price: "$99.99", savings: "Save 33%" },
              ].map((option) => (
                <button
                  key={option.amount}
                  onClick={() => handlePurchase('credits', 'credit', option.amount)}
                  disabled={loadingPlan !== null}
                  className="group relative rounded-xl border border-border bg-card/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-card active:scale-[0.98]"
                >
                  {option.savings && (
                    <span className="absolute -top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                      {option.savings}
                    </span>
                  )}
                  <p className="text-2xl font-bold text-foreground">
                    {loadingPlan === `credits-${option.amount}` ? <Loader2 className="animate-spin inline mr-2 h-5 w-5" /> : option.price}
                  </p>
                  <p className="text-sm text-muted-foreground">{option.amount} Premium Tracks</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
