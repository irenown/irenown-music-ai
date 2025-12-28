import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Check, X } from "lucide-react"

const licenseRights = {
  included: [
    "Unlimited streaming on all platforms (Spotify, Apple Music, etc.)",
    "Commercial use in videos, podcasts, and advertisements",
    "Sync licensing for film, TV, and games",
    "Public performance rights",
    "Modification and derivative works",
    "Worldwide distribution rights",
    "Perpetual (forever) license",
    "No royalty payments to iRenown",
  ],
  excluded: [
    "Reselling generated instrumentals as sample packs",
    "Claiming AI-generated portions as solely human-created for awards",
    "Using for illegal or harmful purposes",
    "Misrepresenting the nature of the content",
  ],
}

export default function LicensePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="Content License"
        description="Understand your rights when creating music with iRenown."
        badge="Legal"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">You Own Your Music</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All music created with iRenown belongs to you. We grant you a comprehensive commercial license that
                gives you complete freedom to use, distribute, and monetize your creations.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 lg:grid-cols-2">
            <AnimatedSection delay={100}>
              <div className="rounded-2xl border border-border bg-card/50 p-6 h-full">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="h-5 w-5 text-green-400" />
                  </span>
                  What You Can Do
                </h3>
                <ul className="space-y-3">
                  {licenseRights.included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="h-5 w-5 shrink-0 text-green-400 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="rounded-2xl border border-border bg-card/50 p-6 h-full">
                <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                    <X className="h-5 w-5 text-red-400" />
                  </span>
                  Restrictions
                </h3>
                <ul className="space-y-3">
                  {licenseRights.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <X className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={300} className="mt-12">
            <div className="rounded-2xl border border-border bg-card/50 p-8 space-y-6">
              <h3 className="text-xl font-bold text-foreground">Frequently Asked License Questions</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Do I need to credit iRenown?</h4>
                  <p className="text-muted-foreground">
                    No, attribution is not required. However, we always appreciate a mention!
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Can I register my songs with PROs?</h4>
                  <p className="text-muted-foreground">
                    Yes, you can register your compositions with performing rights organizations like ASCAP, BMI, or
                    SESAC.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">What happens if I cancel my subscription?</h4>
                  <p className="text-muted-foreground">
                    You keep full rights to all music created during your subscription. The license is perpetual and
                    doesn't expire.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Can I use free tier content commercially?</h4>
                  <p className="text-muted-foreground">
                    Free tier content includes a watermark and is for personal use only. Upgrade to any paid tier for
                    commercial rights.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
