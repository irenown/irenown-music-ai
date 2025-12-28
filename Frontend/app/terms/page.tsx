import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader title="Terms of Service" description="Last updated: December 20, 2024" badge="Legal" />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card/50 p-8 lg:p-12 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using iRenown, you agree to be bound by these Terms of Service and all applicable laws
                  and regulations. If you do not agree with any of these terms, you are prohibited from using or
                  accessing this platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">2. Use License</h2>
                <p className="text-muted-foreground mb-4">
                  Permission is granted to use iRenown for personal and commercial music creation subject to the
                  following conditions:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You must have the right to use any vocals or audio you upload</li>
                  <li>You may not use the service to create harmful, illegal, or infringing content</li>
                  <li>You may not attempt to reverse engineer our AI technology</li>
                  <li>You may not resell or redistribute the platform itself</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">3. Content Ownership</h2>
                <p className="text-muted-foreground">
                  You retain full ownership and rights to all music you create using iRenown. We grant you a perpetual,
                  royalty-free license to use, distribute, and monetize your created content in any way you choose. This
                  includes streaming, downloads, synchronization, and public performance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">4. Subscription Terms</h2>
                <p className="text-muted-foreground">
                  Subscriptions are billed monthly or annually as selected. You may cancel at any time and retain access
                  until the end of your billing period. Refunds are handled on a case-by-case basis. Usage limits reset
                  at the beginning of each billing cycle.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">5. Prohibited Uses</h2>
                <p className="text-muted-foreground mb-4">You may not use iRenown to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Create content that infringes on others' copyrights or intellectual property</li>
                  <li>Generate music impersonating real artists without authorization</li>
                  <li>Produce hateful, harmful, or illegal content</li>
                  <li>Overwhelm our systems with automated requests</li>
                  <li>Circumvent usage limits or security measures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  iRenown is provided "as is" without warranties of any kind. We shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages resulting from your use of or inability to use
                  the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">7. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We will notify users of significant changes
                  via email or platform notification. Continued use of the service after changes constitutes acceptance
                  of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">8. Contact</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact{" "}
                  <a href="mailto:legal@irenown.com" className="text-primary hover:underline">
                    legal@irenown.com
                  </a>
                </p>
              </section>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
