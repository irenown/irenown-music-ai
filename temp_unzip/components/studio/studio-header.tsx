"use client"

import { Button } from "@/components/ui/button"
import { Settings, HelpCircle, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function StudioHeader() {
  return (
    <header className="h-14 border-b border-border bg-card/50 flex items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="relative h-8 w-8">
          <Image src="/irenown-logo.png" alt="iRenown" fill className="object-contain" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">
          <span className="text-bronze-gradient">iRenown</span>
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">Studio</span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm text-foreground">Account</span>
        </Button>
      </div>
    </header>
  )
}
