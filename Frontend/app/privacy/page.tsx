import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader title="Privacy Policy" description="Last updated: December 20, 2024" badge="Legal" />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose prose-invert max-w-none">
              <div className="rounded-2xl border border-border bg-card/50 p-8 lg:p-12 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Account information (name, email, password)</li>
                    <li>Payment information (processed securely through Stripe)</li>
                    <li>Audio files you upload for processing</li>
                    <li>Usage data and preferences</li>
                    <li>Communications with our support team</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                  <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process your audio files and generate music</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Develop new features and services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">3. Audio File Handling</h2>
                  <p className="text-muted-foreground">
                    Your uploaded audio files are processed on secure servers and are automatically deleted within 30
                    days of processing. We do not use your audio for training our AI models without explicit consent.
                    You retain full ownership and rights to all content you create using our platform.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">4. Data Sharing</h2>
                  <p className="text-muted-foreground">
                    We do not sell your personal information. We may share information with third-party service
                    providers who assist us in operating our platform, processing payments, and delivering services. All
                    third parties are contractually obligated to protect your data.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">5. Security</h2>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your data, including encryption in
                    transit and at rest, secure server infrastructure, and regular security audits.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">6. Your Rights</h2>
                  <p className="text-muted-foreground mb-4">You have the right to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Access and download your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of marketing communications</li>
                    <li>Export your created content</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-foreground mb-4">7. Contact Us</h2>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:privacy@irenown.com" className="text-primary hover:underline">
                      privacy@irenown.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
