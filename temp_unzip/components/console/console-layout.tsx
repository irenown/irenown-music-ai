"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  PlusCircle,
  FolderOpen,
  User,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ConsoleLayoutProps {
  children: React.ReactNode
}

const mainNavItems = [
  { icon: Home, label: "Dashboard", href: "/console" },
  { icon: PlusCircle, label: "Create New", href: "/console/create", highlight: true },
  { icon: FolderOpen, label: "My Projects", href: "/console/projects", badge: 47 },
]

const accountNavItems = [
  { icon: User, label: "Profile", href: "/console/account/profile" },
  { icon: CreditCard, label: "Billing", href: "/console/account/billing" },
  { icon: BarChart3, label: "Usage", href: "/console/account/usage" },
]

const otherNavItems = [
  { icon: Settings, label: "Settings", href: "/console/settings" },
  { icon: HelpCircle, label: "Support", href: "/console/support" },
]

export function ConsoleLayout({ children }: ConsoleLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const isActive = (href: string) => {
    if (href === "/console") return pathname === "/console"
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] sm:w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/irenown-logo.png" alt="iRenown" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-irenown-gradient">iRenown</span>
          </Link>
          <button
            className="lg:hidden absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground touch-target"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 smooth-scroll">
          {/* Main Section */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Main</p>
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group touch-target",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 active:bg-muted/70",
                    item.highlight && !isActive(item.href) && "text-irenown-light hover:text-irenown-cream",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform group-hover:scale-110",
                      item.highlight && "text-irenown-light",
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                      {item.badge}
                    </Badge>
                  )}
                  {item.highlight && <Sparkles className="w-4 h-4 text-irenown-light animate-pulse" />}
                </Link>
              ))}
            </div>
          </div>

          {/* Account Section */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Account</p>
            <div className="space-y-1">
              {accountNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group touch-target",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 active:bg-muted/70",
                  )}
                >
                  <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Section */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Other</p>
            <div className="space-y-1">
              {otherNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group touch-target",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 active:bg-muted/70",
                  )}
                >
                  <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Sidebar Footer - User Card */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-irenown-light to-irenown-dark flex items-center justify-center text-primary-foreground font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground">Creator Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-14 sm:h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center px-3 sm:px-4 lg:px-6 gap-2 sm:gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground touch-target"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Search - Hidden on very small screens */}
          <div
            className={cn(
              "relative flex-1 max-w-xl transition-all duration-300 hidden sm:block",
              searchFocused && "max-w-2xl",
            )}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search songs..."
              className="pl-10 bg-muted/50 border-transparent focus:border-primary/50 focus:bg-muted h-10"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>

          {/* Mobile Search Icon */}
          <button className="sm:hidden p-2 text-muted-foreground hover:text-foreground touch-target">
            <Search className="w-5 h-5" />
          </button>

          {/* Spacer for mobile */}
          <div className="flex-1 sm:hidden" />

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Create Button (Desktop) */}
            <Button
              asChild
              size="sm"
              className="hidden md:flex bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light text-primary-foreground"
            >
              <Link href="/console/create">
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New
              </Link>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    2
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-80 max-w-sm">
                <div className="p-3 border-b border-border">
                  <p className="font-semibold">Notifications</p>
                </div>
                <div className="p-2 space-y-2 max-h-[60vh] overflow-y-auto smooth-scroll">
                  <div className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer active:bg-muted/70">
                    <p className="text-sm font-medium">Your song is ready!</p>
                    <p className="text-xs text-muted-foreground">"Summer Dreams" has finished processing</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer active:bg-muted/70">
                    <p className="text-sm font-medium">Usage reminder</p>
                    <p className="text-xs text-muted-foreground">You've used 75% of your monthly songs</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="p-2 border-t border-border">
                  <Button variant="ghost" className="w-full text-sm">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 h-10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-irenown-light to-irenown-dark flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    JD
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-3 border-b border-border">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                  <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">Creator Plan</Badge>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/console" className="cursor-pointer">
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/console/projects" className="cursor-pointer">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    My Projects
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/console/account/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/console/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/console/support" className="cursor-pointer">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content - Added padding for mobile bottom nav */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto pb-24 lg:pb-6">{children}</main>

        {/* Mobile Bottom Navigation - Enhanced with safe area */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border pb-safe">
          <div className="flex items-center justify-around py-2">
            <Link
              href="/console"
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors touch-target min-w-[60px]",
                pathname === "/console" ? "text-primary" : "text-muted-foreground active:text-foreground",
              )}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px] sm:text-xs">Home</span>
            </Link>
            <Link
              href="/console/create"
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors touch-target min-w-[60px]",
                pathname === "/console/create" ? "text-primary" : "text-muted-foreground active:text-foreground",
              )}
            >
              <div className="relative">
                <PlusCircle className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-irenown-light rounded-full animate-pulse" />
              </div>
              <span className="text-[10px] sm:text-xs">Create</span>
            </Link>
            <Link
              href="/console/projects"
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors touch-target min-w-[60px]",
                pathname.startsWith("/console/projects")
                  ? "text-primary"
                  : "text-muted-foreground active:text-foreground",
              )}
            >
              <FolderOpen className="w-5 h-5" />
              <span className="text-[10px] sm:text-xs">Library</span>
            </Link>
            <Link
              href="/console/account/profile"
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors touch-target min-w-[60px]",
                pathname.includes("/account") ? "text-primary" : "text-muted-foreground active:text-foreground",
              )}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] sm:text-xs">Account</span>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground touch-target min-w-[60px] active:text-foreground">
                  <Menu className="w-5 h-5" />
                  <span className="text-[10px] sm:text-xs">More</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mb-2">
                <DropdownMenuItem asChild>
                  <Link href="/console/account/billing" className="cursor-pointer">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Billing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/console/account/usage" className="cursor-pointer">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Usage
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/console/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/console/support" className="cursor-pointer">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </div>
  )
}
