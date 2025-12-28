import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description: string
  badge?: string
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {badge && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 animate-pulse-glow">
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
        )}

        <h1 className="text-3xl font-bold text-bronze-gradient sm:text-4xl lg:text-5xl text-balance">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl text-pretty">{description}</p>
      </div>
    </div>
  )
}
