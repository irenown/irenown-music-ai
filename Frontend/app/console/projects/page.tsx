"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Music,
  Search,
  Filter,
  Grid3X3,
  List,
  Play,
  Pause,
  Download,
  Heart,
  MoreHorizontal,
  Star,
  Trash2,
  Share2,
  RefreshCw,
  X,
  Clock,
  Calendar,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Mock data
const songs = [
  {
    id: 1,
    title: "Summer Vibes",
    genre: "Pop",
    duration: "3:24",
    quality: "standard",
    createdAt: "2024-12-26",
    relativeTime: "2 days ago",
    isFavorite: false,
    playCount: 12,
    thumbnail: "from-amber-500/30 to-orange-500/30",
    detectedKey: "C Major",
    detectedTempo: 120,
    moodTags: ["upbeat", "energetic"],
  },
  {
    id: 2,
    title: "Night Drive",
    genre: "R&B",
    duration: "4:12",
    quality: "premium",
    createdAt: "2024-12-20",
    relativeTime: "1 week ago",
    isFavorite: true,
    playCount: 28,
    thumbnail: "from-purple-500/30 to-pink-500/30",
    detectedKey: "G Minor",
    detectedTempo: 85,
    moodTags: ["chill", "romantic"],
  },
  {
    id: 3,
    title: "Midnight Dreams",
    genre: "Jazz",
    duration: "2:45",
    quality: "standard",
    createdAt: "2024-12-15",
    relativeTime: "2 weeks ago",
    isFavorite: false,
    playCount: 8,
    thumbnail: "from-indigo-500/30 to-blue-500/30",
    detectedKey: "Bb Major",
    detectedTempo: 110,
    moodTags: ["dreamy", "smooth"],
  },
  {
    id: 4,
    title: "Ocean Waves",
    genre: "EDM",
    duration: "3:56",
    quality: "premium",
    createdAt: "2024-12-10",
    relativeTime: "3 weeks ago",
    isFavorite: true,
    playCount: 45,
    thumbnail: "from-cyan-500/30 to-teal-500/30",
    detectedKey: "A Minor",
    detectedTempo: 128,
    moodTags: ["energetic", "uplifting"],
  },
  {
    id: 5,
    title: "Urban Flow",
    genre: "Hip-Hop",
    duration: "3:08",
    quality: "standard",
    createdAt: "2024-12-05",
    relativeTime: "3 weeks ago",
    isFavorite: false,
    playCount: 19,
    thumbnail: "from-red-500/30 to-orange-500/30",
    detectedKey: "D Minor",
    detectedTempo: 95,
    moodTags: ["urban", "confident"],
  },
  {
    id: 6,
    title: "Country Roads",
    genre: "Country",
    duration: "4:32",
    quality: "premium",
    createdAt: "2024-12-01",
    relativeTime: "4 weeks ago",
    isFavorite: false,
    playCount: 15,
    thumbnail: "from-yellow-500/30 to-amber-500/30",
    detectedKey: "G Major",
    detectedTempo: 105,
    moodTags: ["nostalgic", "warm"],
  },
]

const genres = ["All", "Pop", "Rock", "Hip-Hop", "EDM", "R&B", "Jazz", "Country", "Latin"]
const qualities = ["All", "Standard", "Premium"]
const sortOptions = [
  { value: "recent", label: "Recently Created" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "duration-short", label: "Duration (Shortest)" },
  { value: "duration-long", label: "Duration (Longest)" },
]

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [selectedQuality, setSelectedQuality] = useState("All")
  const [sortBy, setSortBy] = useState("recent")
  const [playingSong, setPlayingSong] = useState<number | null>(null)
  const [selectedSong, setSelectedSong] = useState<(typeof songs)[0] | null>(null)
  const [favorites, setFavorites] = useState<number[]>(songs.filter((s) => s.isFavorite).map((s) => s.id))

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "All" || song.genre === selectedGenre
    const matchesQuality = selectedQuality === "All" || song.quality.toLowerCase() === selectedQuality.toLowerCase()
    return matchesSearch && matchesGenre && matchesQuality
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">My Projects</h1>
          <p className="text-muted-foreground mt-1">
            Showing {filteredSongs.length} of {songs.length} songs
          </p>
        </div>
        <Button
          asChild
          className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light text-primary-foreground"
        >
          <Link href="/console/create">
            <Music className="w-4 h-4 mr-2" />
            Create New Song
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-transparent focus:border-primary/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Genre Filter */}
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full lg:w-40 bg-muted/50 border-transparent">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Quality Filter */}
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger className="w-full lg:w-40 bg-muted/50 border-transparent">
                <Star className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Quality" />
              </SelectTrigger>
              <SelectContent>
                {qualities.map((quality) => (
                  <SelectItem key={quality} value={quality}>
                    {quality}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-muted/50 border-transparent">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Songs Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSongs.map((song) => (
            <Card
              key={song.id}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all group cursor-pointer overflow-hidden"
              onClick={() => setSelectedSong(song)}
            >
              {/* Thumbnail */}
              <div
                className={cn(
                  "relative aspect-square bg-gradient-to-br flex items-center justify-center",
                  song.thumbnail,
                )}
              >
                <Music className="w-16 h-16 text-foreground/30" />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setPlayingSong(playingSong === song.id ? null : song.id)
                    }}
                    className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {playingSong === song.id ? (
                      <Pause className="w-7 h-7 text-white" />
                    ) : (
                      <Play className="w-7 h-7 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Quality Badge */}
                {song.quality === "premium" && (
                  <Badge className="absolute top-3 right-3 bg-irenown-mid/80 text-primary-foreground border-none">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(song.id)
                  }}
                  className={cn(
                    "absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    favorites.includes(song.id)
                      ? "bg-red-500 text-white"
                      : "bg-black/30 text-white opacity-0 group-hover:opacity-100",
                  )}
                >
                  <Heart className={cn("w-4 h-4", favorites.includes(song.id) && "fill-current")} />
                </button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold truncate mb-1">{song.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{song.genre}</span>
                  <span>•</span>
                  <span>{song.duration}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{song.relativeTime}</p>

                {/* Quick Actions */}
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      setPlayingSong(playingSong === song.id ? null : song.id)
                    }}
                  >
                    {playingSong === song.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(song.id)
                    }}
                  >
                    <Heart className={cn("w-4 h-4", favorites.includes(song.id) && "fill-current text-red-500")} />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                  onClick={() => setSelectedSong(song)}
                >
                  {/* Thumbnail */}
                  <div
                    className={cn(
                      "relative w-14 h-14 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0",
                      song.thumbnail,
                    )}
                  >
                    <Music className="w-6 h-6 text-foreground/40" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setPlayingSong(playingSong === song.id ? null : song.id)
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                    >
                      {playingSong === song.id ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{song.title}</h3>
                      {song.quality === "premium" && <Star className="w-4 h-4 text-irenown-light shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span>{song.genre}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {song.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {song.relativeTime}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(song.id)
                      }}
                    >
                      <Heart className={cn("w-4 h-4", favorites.includes(song.id) && "fill-current text-red-500")} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {filteredSongs.length === 0 && (
        <div className="text-center py-16">
          <Music className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No songs found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || selectedGenre !== "All" || selectedQuality !== "All"
              ? "Try adjusting your filters"
              : "Create your first song to get started"}
          </p>
          {!searchQuery && selectedGenre === "All" && selectedQuality === "All" && (
            <Button asChild>
              <Link href="/console/create">Create Your First Song</Link>
            </Button>
          )}
        </div>
      )}

      {/* Song Detail Modal */}
      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSong && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedSong.title}</DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                {/* Player Section */}
                <div className="space-y-4">
                  <div
                    className={cn(
                      "aspect-square rounded-xl bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
                      selectedSong.thumbnail,
                    )}
                  >
                    <Music className="w-20 h-20 text-foreground/30" />
                    <button
                      onClick={() => setPlayingSong(playingSong === selectedSong.id ? null : selectedSong.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                    >
                      {playingSong === selectedSong.id ? (
                        <Pause className="w-16 h-16 text-white" />
                      ) : (
                        <Play className="w-16 h-16 text-white ml-2" />
                      )}
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Slider defaultValue={[0]} max={100} step={1} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0:00</span>
                      <span>{selectedSong.duration}</span>
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <Slider defaultValue={[80]} max={100} step={1} className="flex-1" />
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Genre</p>
                      <p className="font-medium">{selectedSong.genre}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">{selectedSong.duration}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Key</p>
                      <p className="font-medium">{selectedSong.detectedKey}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Tempo</p>
                      <p className="font-medium">{selectedSong.detectedTempo} BPM</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Quality</p>
                    <Badge
                      className={cn(
                        selectedSong.quality === "premium"
                          ? "bg-irenown-mid/20 text-irenown-light border-irenown-mid/30"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {selectedSong.quality === "premium" && <Star className="w-3 h-3 mr-1" />}
                      {selectedSong.quality.charAt(0).toUpperCase() + selectedSong.quality.slice(1)}
                    </Badge>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Mood Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSong.moodTags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-2">Created</p>
                    <p className="font-medium">{selectedSong.relativeTime}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <Button className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light">
                  <Download className="w-4 h-4 mr-2" />
                  Download MP3
                </Button>
                {selectedSong.quality === "premium" && (
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Stems
                  </Button>
                )}
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>

              {/* Notes */}
              <div className="mt-6 space-y-3">
                <p className="text-sm font-medium">Your Notes</p>
                <Textarea placeholder="Add notes about this song..." className="min-h-24 bg-muted/50" />
                <Button variant="outline" size="sm">
                  Save Notes
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
