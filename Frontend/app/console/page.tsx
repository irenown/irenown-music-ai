"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Music,
  TrendingUp,
  Clock,
  Heart,
  Play,
  Download,
  MoreHorizontal,
  Plus,
  Star,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Lightbulb,
  BookOpen,
  ChevronRight,
  Zap,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api"

export default function ConsoleDashboard() {
  const [playingSong, setPlayingSong] = useState<string | null>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [usage, setUsage] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = apiClient.getUser()
        setUser(u)

        const [projData, usageData] = await Promise.all([
          apiClient.get('/api/projects'),
          apiClient.get('/api/usage')
        ])

        setProjects(Array.isArray(projData) ? projData : [])
        setUsage(usageData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20 min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    )
  }

  const quickStats = [
    { label: "Total Projects", value: projects.length.toString(), icon: Music, trend: "All time" },
    { label: "Plan Tier", value: usage?.plan || "Silver", icon: Award, trend: "Active" },
    { label: "Used", value: usage?.used?.toString() || "0", icon: TrendingUp, trend: "This month" },
    { label: "Remaining", value: usage?.remaining?.toString() || "0", icon: Zap, trend: "Monthly limit" },
  ]

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted/30 border border-border p-6 lg:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-irenown-light/10 via-transparent to-transparent" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, <span className="text-irenown-gradient capitalize">{user?.username || 'Artist'}</span>!
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 capitalize px-3">
                {usage?.plan} Plan
              </Badge>
              <span className="text-sm">
                {usage?.used}/{usage?.limit} songs used this month
              </span>
            </div>
          </div>
          <div className="flex flex-col xs:flex-row gap-3">
            <Button variant="outline" asChild className="w-full xs:w-auto">
              <Link href="/console/account/usage">View Usage</Link>
            </Button>
            <Button
              asChild
              className="w-full xs:w-auto bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light text-primary-foreground"
            >
              <Link href="/pricing">
                <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                Upgrade to Pro
              </Link>
            </Button>
          </div>
        </div>

        {/* Usage Progress */}
        {usage && (usage.used / usage.limit >= 0.7) && (
          <div className="relative mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-500">
                  You've used {Math.round((usage.used / usage.limit) * 100)}% of your monthly songs
                </p>
                <Progress value={(usage.used / usage.limit) * 100} className="mt-3 h-2" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card
            key={stat.label}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors group"
          >
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted-foreground">{stat.trend}</span>
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-irenown-gradient">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Production History</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/console/projects">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects.slice(0, 5).map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group cursor-pointer"
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "relative w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 border border-primary/10"
                  )}
                >
                  <Music className="w-6 h-6 text-foreground/60" />
                  <button
                    onClick={() => setPlayingSong(playingSong === song.id ? null : song.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                  >
                    <Play className={cn("w-6 h-6 text-white", playingSong === song.id && "hidden")} />
                    {playingSong === song.id && (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{song.name}</h4>
                    {song.quality === "premium" && <Star className="w-4 h-4 text-irenown-light shrink-0 fill-irenown-light" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="h-5 px-1.5 text-[10px] uppercase bg-muted font-bold">
                      {song.genre}
                    </Badge>
                    <span>•</span>
                    <span>{song.bpm} BPM</span>
                    <span>•</span>
                    <span>{new Date(song.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  {song.mix_url && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={song.mix_url} download target="_blank">
                        <Download className="w-4 h-4 text-primary" />
                      </a>
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Share Track</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                <Music className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-muted-foreground font-medium">No projects yet. Start creating!</p>
                <Button variant="outline" size="sm" asChild className="mt-4">
                  <Link href="/studio">Open Studio</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                asChild
                className="w-full justify-start bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light text-primary-foreground h-12"
              >
                <Link href="/studio">
                  <Plus className="w-5 h-5 mr-3" />
                  Create New Song
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start h-12 border-irenown-mid/30 hover:border-irenown-mid/50 hover:bg-irenown-mid/5 bg-transparent"
              >
                <Link href="/pricing">
                  <Award className="w-5 h-5 mr-3 text-irenown-light" />
                  Get More Credits
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-irenown-light" />
                AI Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Try "Melodic Techno" for club-ready instrumentals, or "Lo-Fi Beats" for chill study vibes. iRenown works best with vocals between 90 and 130 BPM!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
