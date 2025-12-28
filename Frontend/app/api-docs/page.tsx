import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { Code, Copy, ExternalLink, Zap, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const endpoints = [
  {
    method: "POST",
    path: "/api/v1/tracks",
    description: "Create a new track from vocal upload",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/v1/tracks/{id}",
    description: "Get track status and details",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/v1/tracks/{id}/download",
    description: "Download finished track",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/v1/genres",
    description: "List available genres",
    auth: false,
  },
  {
    method: "POST",
    path: "/api/v1/analyze",
    description: "Analyze audio for key and tempo",
    auth: true,
  },
]

const codeExample = `const response = await fetch('https://api.irenown.com/v1/tracks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'multipart/form-data'
  },
  body: formData
});

const track = await response.json();
console.log(track.id); // Track ID for status polling`

export default function APIDocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <PageHeader
        title="API Documentation"
        description="Integrate iRenown into your applications with our RESTful API."
        badge="Developer"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection>
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl border border-border bg-card/50 p-6">
                    <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <a
                          href="#authentication"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          Authentication
                        </a>
                      </li>
                      <li>
                        <a
                          href="#endpoints"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          Endpoints
                        </a>
                      </li>
                      <li>
                        <a
                          href="#examples"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          Code Examples
                        </a>
                      </li>
                      <li>
                        <a
                          href="#rate-limits"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          Rate Limits
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                    <Zap className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-2">Get API Access</h3>
                    <p className="text-sm text-muted-foreground mb-4">API access is available on Studio tier plans.</p>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      Upgrade to Studio
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Authentication */}
              <AnimatedSection id="authentication">
                <div className="rounded-2xl border border-border bg-card/50 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Authentication</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    All API requests require authentication using a Bearer token. Include your API key in the
                    Authorization header:
                  </p>
                  <div className="rounded-xl bg-background border border-border p-4 font-mono text-sm">
                    <code className="text-primary">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>
              </AnimatedSection>

              {/* Endpoints */}
              <AnimatedSection id="endpoints" delay={100}>
                <div className="rounded-2xl border border-border bg-card/50 p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Globe className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">Endpoints</h2>
                  </div>

                  <div className="space-y-4">
                    {endpoints.map((endpoint) => (
                      <div
                        key={endpoint.path}
                        className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors"
                      >
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${
                            endpoint.method === "POST"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="text-sm text-foreground font-mono flex-1">{endpoint.path}</code>
                        {endpoint.auth && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Code Example */}
              <AnimatedSection id="examples" delay={200}>
                <div className="rounded-2xl border border-border bg-card/50 p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Code className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-bold text-foreground">Code Example</h2>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  <div className="rounded-xl bg-background border border-border p-4 overflow-x-auto">
                    <pre className="text-sm text-muted-foreground font-mono">
                      <code>{codeExample}</code>
                    </pre>
                  </div>
                </div>
              </AnimatedSection>

              {/* Rate Limits */}
              <AnimatedSection id="rate-limits" delay={300}>
                <div className="rounded-2xl border border-border bg-card/50 p-6 lg:p-8">
                  <h2 className="text-xl font-bold text-foreground mb-4">Rate Limits</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 text-muted-foreground font-medium">Tier</th>
                          <th className="text-left py-3 text-muted-foreground font-medium">Requests/Hour</th>
                          <th className="text-left py-3 text-muted-foreground font-medium">Concurrent Jobs</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-3 text-foreground">Studio</td>
                          <td className="py-3 text-foreground">1,000</td>
                          <td className="py-3 text-foreground">10</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-foreground">Enterprise</td>
                          <td className="py-3 text-foreground">Unlimited</td>
                          <td className="py-3 text-foreground">Custom</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </AnimatedSection>

              {/* Full Docs Link */}
              <AnimatedSection delay={400}>
                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">Need more details?</h3>
                    <p className="text-sm text-muted-foreground">
                      View our complete API reference with all parameters and responses.
                    </p>
                  </div>
                  <Button className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 glow-silver">
                    Full Documentation
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
