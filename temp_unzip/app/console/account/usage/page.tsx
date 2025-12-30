"use client"

import { BarChart3, Music, Clock, TrendingUp, Download, Calendar, PieChart, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const genreStats = [
  { genre: "Pop", count: 18, percentage: 38 },
  { genre: "Rock", count: 8, percentage: 17 },
  { genre: "Hip-Hop", count: 7, percentage: 15 },
  { genre: "EDM", count: 6, percentage: 13 },
  { genre: "R&B", count: 5, percentage: 11 },
  { genre: "Other", count: 3, percentage: 6 },
]

const dailyActivity = [
  { day: "Mon", songs: 2 },
  { day: "Tue", songs: 1 },
  { day: "Wed", songs: 3 },
  { day: "Thu", songs: 0 },
  { day: "Fri", songs: 4 },
  { day: "Sat", songs: 2 },
  { day: "Sun", songs: 3 },
]

export default function UsagePage() {
  const maxDaily = Math.max(...dailyActivity.map((d) => d.songs))

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-5xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Usage Statistics</h1>
          <p className="text-muted-foreground mt-1">Track your song generation and platform usage</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="december">
            <SelectTrigger className="w-40 bg-muted/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="december">December 2024</SelectItem>
              <SelectItem value="november">November 2024</SelectItem>
              <SelectItem value="october">October 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Current Month Usage */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Usage This Month</CardTitle>
          <CardDescription>December 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Songs Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-irenown-gradient">15</p>
                  <p className="text-muted-foreground">of 20 songs used</p>
                </div>
                <div className="w-24 h-24 relative">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${75 * 2.51} ${100 * 2.51}`}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="oklch(0.45 0.035 65)" />
                        <stop offset="100%" stopColor="oklch(0.82 0.035 75)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">75%</span>
                  </div>
                </div>
              </div>
              <Progress value={75} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Resets in 4 days</span>
                <span className="text-muted-foreground">January 1, 2025</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/30">
                <Music className="w-5 h-5 text-irenown-light mb-2" />
                <p className="text-2xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Standard Songs</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30">
                <Activity className="w-5 h-5 text-irenown-light mb-2" />
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Premium Songs</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30">
                <Clock className="w-5 h-5 text-irenown-light mb-2" />
                <p className="text-2xl font-bold">1h 15m</p>
                <p className="text-sm text-muted-foreground">Processing Time</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30">
                <TrendingUp className="w-5 h-5 text-irenown-light mb-2" />
                <p className="text-2xl font-bold">4m 30s</p>
                <p className="text-sm text-muted-foreground">Avg. per Song</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Usage by Genre */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Usage by Genre
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {genreStats.map((stat) => (
              <div key={stat.genre} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stat.genre}</span>
                  <span className="text-muted-foreground">
                    {stat.count} songs ({stat.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-irenown-dark to-irenown-light rounded-full transition-all duration-500"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Activity This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {dailyActivity.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end h-36">
                    <div
                      className="w-full max-w-8 bg-gradient-to-t from-irenown-dark to-irenown-light rounded-t-lg transition-all duration-500"
                      style={{ height: day.songs > 0 ? `${(day.songs / maxDaily) * 100}%` : "4px" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                  <span className="text-sm font-medium">{day.songs}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All-Time Statistics */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">All-Time Statistics</CardTitle>
          <CardDescription>Your complete platform usage history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-irenown-dark/20 to-irenown-light/10 border border-irenown-mid/20">
              <Music className="w-6 h-6 text-irenown-light mb-3" />
              <p className="text-3xl font-bold">47</p>
              <p className="text-sm text-muted-foreground">Total Songs Created</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-irenown-dark/20 to-irenown-light/10 border border-irenown-mid/20">
              <Activity className="w-6 h-6 text-irenown-light mb-3" />
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Premium Songs</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-irenown-dark/20 to-irenown-light/10 border border-irenown-mid/20">
              <Calendar className="w-6 h-6 text-irenown-light mb-3" />
              <p className="text-3xl font-bold">348</p>
              <p className="text-sm text-muted-foreground">Days as Member</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-irenown-dark/20 to-irenown-light/10 border border-irenown-mid/20">
              <Clock className="w-6 h-6 text-irenown-light mb-3" />
              <p className="text-3xl font-bold">3h 52m</p>
              <p className="text-sm text-muted-foreground">Total Processing Time</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-muted/30 flex items-center justify-between">
            <div>
              <p className="font-medium">Favorite Genre</p>
              <p className="text-sm text-muted-foreground">Based on your generation history</p>
            </div>
            <Badge className="bg-irenown-mid/20 text-irenown-light border-irenown-mid/30 text-lg px-4 py-1">
              Pop (38%)
            </Badge>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-muted/30">
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium">Storage Used</p>
              <span className="text-sm text-muted-foreground">450 MB of 5 GB</span>
            </div>
            <Progress value={9} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
