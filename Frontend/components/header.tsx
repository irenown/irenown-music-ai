"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Equalizer } from "@/components/equalizer"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "border-b border-border/50 bg-background/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 transition-all duration-300 group-hover:scale-110">
              <Image src="/irenown-logo.png" alt="iRenown" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-bronze-gradient">iRenown</span>
            </span>
            <Equalizer className="ml-2 hidden sm:flex" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="/studio" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Studio
            </Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-bronze transition-all duration-300 hover:scale-105 shine-effect"
              asChild
            >
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border/50 py-4 md:hidden animate-slide-up">
            <nav className="flex flex-col gap-4">
              <Link href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                How It Works
              </Link>
              <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Pricing
              </Link>
              <Link href="/studio" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                Studio
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-bronze" asChild>
                  <Link href="/auth/signup">Get Started Free</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
