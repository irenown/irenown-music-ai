import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { AlertTriangle, Mail } from "lucide-react"

export default function DMCAPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="DMCA Policy"
        description="Digital Millennium Copyright Act compliance and takedown procedures."
        badge="Legal"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card/50 p-8 lg:p-12 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Our Commitment</h2>
                <p className="text-muted-foreground">
                  iRenown respects the intellectual property rights of others and expects our users to do the same. We
                  comply with the Digital Millennium Copyright Act (DMCA) and will respond promptly to notices of
                  alleged copyright infringement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Filing a DMCA Takedown Notice</h2>
                <p className="text-muted-foreground mb-4">
                  If you believe your copyrighted work has been copied in a way that constitutes copyright infringement,
                  please provide our Copyright Agent with the following information:
                </p>
                <ul className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                  <li>A physical or electronic signature of the copyright owner or authorized agent</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>
                    Identification of the material that is claimed to be infringing, with enough detail to locate it
                  </li>
                  <li>Your contact information (address, telephone number, and email address)</li>
                  <li>A statement that you have a good faith belief that use of the material is not authorized</li>
                  <li>
                    A statement that the information in the notification is accurate, and under penalty of perjury, that
                    you are authorized to act on behalf of the copyright owner
                  </li>
                </ul>
              </section>

              <section className="rounded-xl bg-destructive/10 border border-destructive/30 p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
                    <p className="text-muted-foreground text-sm">
                      Misrepresentation of infringing material may result in liability for damages. If you're not sure
                      whether material infringes your copyright, please consult an attorney before filing a notice.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Counter-Notification</h2>
                <p className="text-muted-foreground">
                  If you believe your content was removed in error, you may file a counter-notification. The
                  counter-notification must include your signature, identification of the material removed, a statement
                  under penalty of perjury that you have a good faith belief the material was removed by mistake, and
                  your consent to jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Repeat Infringers</h2>
                <p className="text-muted-foreground">
                  We will terminate the accounts of users who are determined to be repeat infringers. We reserve the
                  right to remove any content and terminate any account at our sole discretion.
                </p>
              </section>

              <section className="rounded-xl bg-primary/5 border border-primary/30 p-6">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Our Copyright Agent
                </h2>
                <p className="text-muted-foreground mb-4">Send DMCA notices and counter-notifications to:</p>
                <div className="text-muted-foreground">
                  <p>Copyright Agent</p>
                  <p>iRenown, Inc.</p>
                  <p>123 Innovation Drive</p>
                  <p>San Francisco, CA 94105</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a href="mailto:dmca@irenown.com" className="text-primary hover:underline">
                      dmca@irenown.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
