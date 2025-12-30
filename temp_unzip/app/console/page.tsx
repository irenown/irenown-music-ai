"use client"

import { useState } from "react"
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

// Mock data
const userData = {
  name: "John",
  plan: "Creator",
  usage: { used: 15, total: 20, percentage: 75 },
  resetDate: "Jan 1, 2025",
}

const quickStats = [
  { label: "Total Songs", value: "47", icon: Music, trend: "+5 this month" },
  { label: "This Week", value: "5", icon: TrendingUp, trend: "+2 from last week" },
  { label: "Processing Time", value: "3h 52m", icon: Clock, trend: "Total saved" },
  { label: "Favorites", value: "12", icon: Heart, trend: "Most loved tracks" },
]

const recentSongs = [
  {
    id: 1,
    title: "Summer Vibes",
    genre: "Pop",
    duration: "3:24",
    createdAt: "2 days ago",
    status: "completed",
    quality: "standard",
    thumbnail: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 2,
    title: "Night Drive",
    genre: "R&B",
    duration: "4:12",
    createdAt: "1 week ago",
    status: "completed",
    quality: "premium",
    thumbnail: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Ocean Waves",
    genre: "EDM",
    duration: "3:56",
    createdAt: "2 weeks ago",
    status: "completed",
    quality: "premium",
    thumbnail: "from-cyan-500/20 to-blue-500/20",
  },
]

const processingQueue = [
  {
    id: 1,
    title: "Midnight Dreams",
    status: "generating_music",
    progress: 60,
    eta: "2 minutes",
  },
  {
    id: 2,
    title: "Sunset Melody",
    status: "completed",
    progress: 100,
    eta: null,
  },
]

const tips = [
  {
    type: "feature",
    icon: Sparkles,
    title: "New: Jazz genre now available!",
    description: "Create smooth jazz tracks with our latest AI model",
    action: "Try it now",
    href: "/console/create",
  },
  {
    type: "guide",
    icon: BookOpen,
    title: "How to get better results",
    description: "Learn tips for cleaner vocals and better AI generations",
    action: "Read Guide",
    href: "/tutorials",
  },
]

export default function ConsoleDashboard() {
  const [playingSong, setPlayingSong] = useState<number | null>(null)

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted/30 border border-border p-6 lg:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-irenown-light/10 via-transparent to-transparent" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, <span className="text-irenown-gradient">{userData.name}</span>!
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {userData.plan} Plan
              </Badge>
              <span className="text-sm">
                {userData.usage.used}/{userData.usage.total} songs used this month
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/console/account/usage">View Usage Details</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light text-primary-foreground"
            >
              <Link href="/console/account/billing">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Link>
            </Button>
          </div>
        </div>

        {/* Usage Progress */}
        {userData.usage.percentage >= 70 && (
          <div className="relative mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-500">
                  You've used {userData.usage.percentage}% of your monthly songs
                </p>
                <p className="text-xs text-muted-foreground mt-1">Resets on {userData.resetDate}</p>
                <Progress value={userData.usage.percentage} className="mt-3 h-2" />
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
        {/* Recent Songs */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Songs</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/console/projects">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group cursor-pointer"
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "relative w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0",
                    song.thumbnail,
                  )}
                >
                  <Music className="w-6 h-6 text-foreground/60" />
                  <button
                    onClick={() => setPlayingSong(playingSong === song.id ? null : song.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                  >
                    <Play className={cn("w-6 h-6 text-white", playingSong === song.id && "hidden")} />
                    {playingSong === song.id && (
                      <div className="flex items-end gap-0.5 h-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-1 bg-white rounded-full equalizer-bar"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{song.title}</h4>
                    {song.quality === "premium" && <Star className="w-4 h-4 text-irenown-light shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{song.genre}</span>
                    <span>•</span>
                    <span>{song.duration}</span>
                    <span>•</span>
                    <span>{song.createdAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
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
                <Link href="/console/create">
                  <Plus className="w-5 h-5 mr-3" />
                  Create New Song
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="w-full justify-start h-12 border-irenown-mid/30 hover:border-irenown-mid/50 hover:bg-irenown-mid/5 bg-transparent"
              >
                <Link href="/console/create?tier=premium">
                  <Award className="w-5 h-5 mr-3 text-irenown-light" />
                  Buy Premium Track
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start h-12 bg-transparent">
                <Link href="/console/projects">
                  <Music className="w-5 h-5 mr-3" />
                  View All Projects
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Processing Queue */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Processing Queue</CardTitle>
          <Badge variant="secondary">{processingQueue.filter((q) => q.status !== "completed").length} Active</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {processingQueue.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  item.status === "completed" ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary",
                )}
              >
                {item.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Loader2 className="w-5 h-5 animate-spin" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium truncate">"{item.title}"</h4>
                  {item.status === "completed" ? (
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Complete</Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.eta} remaining</span>
                  )}
                </div>
                {item.status !== "completed" && (
                  <div className="space-y-1">
                    <Progress value={item.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Generating music... {item.progress}%</p>
                  </div>
                )}
              </div>
              {item.status === "completed" && (
                <Button size="sm" className="shrink-0">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          ))}

          {processingQueue.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No songs in queue</p>
              <Button asChild className="mt-4">
                <Link href="/console/create">Create Your First Song</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips & Updates */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-irenown-light" />
            Tips & Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
            >
              <div
                className={cn(
                  "p-2.5 rounded-lg shrink-0",
                  tip.type === "feature" ? "bg-irenown-mid/20 text-irenown-light" : "bg-blue-500/20 text-blue-400",
                )}
              >
                <tip.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium mb-1">{tip.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{tip.description}</p>
                <Link href={tip.href} className="inline-flex items-center text-sm text-primary hover:underline">
                  {tip.action}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
