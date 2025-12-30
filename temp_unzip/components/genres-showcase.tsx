"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Music, Mic2, Heart, Guitar, Piano, Drum, Waves, Sparkles } from "lucide-react"

const genres = [
  {
    name: "Pop",
    icon: Music,
    gradient: "from-[#C4B5A6] via-[#A89888] to-[#8A7B6B]",
    bgPattern: "radial-gradient(circle at 30% 20%, rgba(196, 181, 166, 0.15) 0%, transparent 50%)",
    tracks: 12500,
    bpm: "100-130",
    mood: "Uplifting",
  },
  {
    name: "Hip-Hop",
    icon: Mic2,
    gradient: "from-[#B8A898] via-[#9C8B7B] to-[#7A6B5B]",
    bgPattern: "radial-gradient(circle at 70% 80%, rgba(184, 168, 152, 0.15) 0%, transparent 50%)",
    tracks: 9800,
    bpm: "85-115",
    mood: "Powerful",
  },
  {
    name: "R&B",
    icon: Heart,
    gradient: "from-[#D4C5B6] via-[#B8A898] to-[#9C8B7B]",
    bgPattern: "radial-gradient(circle at 50% 30%, rgba(212, 197, 182, 0.15) 0%, transparent 50%)",
    tracks: 7200,
    bpm: "60-80",
    mood: "Smooth",
  },
  {
    name: "Rock",
    icon: Guitar,
    gradient: "from-[#A89888] via-[#8A7B6B] to-[#6C5D4D]",
    bgPattern: "radial-gradient(circle at 20% 70%, rgba(168, 152, 136, 0.15) 0%, transparent 50%)",
    tracks: 6500,
    bpm: "110-140",
    mood: "Energetic",
  },
  {
    name: "Electronic",
    icon: Piano,
    gradient: "from-[#C4B5A6] via-[#9C8B7B] to-[#7A6B5B]",
    bgPattern: "radial-gradient(circle at 80% 20%, rgba(196, 181, 166, 0.15) 0%, transparent 50%)",
    tracks: 8900,
    bpm: "120-150",
    mood: "Dynamic",
  },
  {
    name: "Jazz",
    icon: Waves,
    gradient: "from-[#D4C5B6] via-[#A89888] to-[#8A7B6B]",
    bgPattern: "radial-gradient(circle at 40% 60%, rgba(212, 197, 182, 0.15) 0%, transparent 50%)",
    tracks: 3200,
    bpm: "80-120",
    mood: "Sophisticated",
  },
  {
    name: "Country",
    icon: Drum,
    gradient: "from-[#B8A898] via-[#8A7B6B] to-[#6C5D4D]",
    bgPattern: "radial-gradient(circle at 60% 40%, rgba(184, 168, 152, 0.15) 0%, transparent 50%)",
    tracks: 2800,
    bpm: "90-120",
    mood: "Authentic",
  },
  {
    name: "Latin",
    icon: Sparkles,
    gradient: "from-[#C4B5A6] via-[#B8A898] to-[#9C8B7B]",
    bgPattern: "radial-gradient(circle at 30% 80%, rgba(196, 181, 166, 0.15) 0%, transparent 50%)",
    tracks: 4100,
    bpm: "95-130",
    mood: "Passionate",
  },
]

// Mini waveform visualization component
function MiniWaveform({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full transition-all duration-300 ${
            isActive ? "bg-[#C4B5A6]" : "bg-[#8A7B6B]/50"
          }`}
          style={{
            height: isActive ? `${Math.random() * 12 + 4}px` : "4px",
            animation: isActive ? `waveform-bar 0.5s ease-in-out ${i * 0.1}s infinite alternate` : "none",
          }}
        />
      ))}
    </div>
  )
}

export function GenresShowcase() {
  const [activeGenre, setActiveGenre] = useState<string | null>(null)
  const [hoveredGenre, setHoveredGenre] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C4B5A6]/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8A7B6B]/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C4B5A6]/10 border border-[#C4B5A6]/20 mb-6">
            <Music className="w-4 h-4 text-[#C4B5A6]" />
            <span className="text-sm font-medium text-[#C4B5A6]">50+ Genres Available</span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-balance">
            <span className="text-foreground">Create Music in </span>
            <span className="text-irenown-gradient">Any Style</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            From chart-topping Pop to underground Hip-Hop—our AI generates professional instrumentals tailored to your
            vision.
          </p>
        </div>

        {/* Genres Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {genres.map((genre, index) => {
            const Icon = genre.icon
            const isActive = activeGenre === genre.name
            const isHovered = hoveredGenre === genre.name

            return (
              <button
                key={genre.name}
                onClick={() => setActiveGenre(isActive ? null : genre.name)}
                onMouseEnter={() => setHoveredGenre(genre.name)}
                onMouseLeave={() => setHoveredGenre(null)}
                className={`group relative rounded-2xl text-left transition-all duration-500 overflow-hidden ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isHovered ? "scale(1.02) translateY(-4px)" : "scale(1) translateY(0)",
                }}
              >
                {/* Card Background */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-[#C4B5A6]/20 via-[#A89888]/10 to-transparent"
                      : "bg-card/60 backdrop-blur-sm"
                  }`}
                />

                {/* Animated Border */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                    isActive || isHovered
                      ? "border-2 border-[#C4B5A6]/50 shadow-[0_0_30px_rgba(196,181,166,0.15)]"
                      : "border border-border/50"
                  }`}
                />

                {/* Background Pattern */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: genre.bgPattern }}
                />

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative p-6">
                  {/* Top Row - Icon and Play Button */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon Container */}
                    <div
                      className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-[#C4B5A6] to-[#8A7B6B] shadow-[0_0_20px_rgba(196,181,166,0.3)]"
                          : "bg-gradient-to-br from-[#C4B5A6]/20 to-[#8A7B6B]/20 group-hover:from-[#C4B5A6]/30 group-hover:to-[#8A7B6B]/30"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 transition-all duration-300 ${
                          isActive ? "text-background" : "text-[#C4B5A6]"
                        }`}
                      />

                      {/* Pulsing Ring */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-xl border-2 border-[#C4B5A6] animate-ping opacity-30" />
                      )}
                    </div>

                    {/* Play Button */}
                    <div
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#C4B5A6] text-background shadow-[0_0_15px_rgba(196,181,166,0.4)]"
                          : "bg-[#C4B5A6]/10 text-[#C4B5A6] group-hover:bg-[#C4B5A6]/20"
                      }`}
                    >
                      {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </div>
                  </div>

                  {/* Genre Info */}
                  <div className="space-y-3">
                    <div>
                      <h3
                        className={`text-xl font-bold transition-colors duration-300 ${
                          isActive ? "text-[#C4B5A6]" : "text-foreground group-hover:text-[#C4B5A6]"
                        }`}
                      >
                        {genre.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {genre.tracks.toLocaleString()} tracks created
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div
                      className={`flex items-center gap-4 pt-3 border-t transition-all duration-300 ${
                        isActive ? "border-[#C4B5A6]/30" : "border-border/30"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">BPM</span>
                        <span className="text-xs font-medium text-[#C4B5A6]">{genre.bpm}</span>
                      </div>
                      <div className="w-px h-3 bg-border/50" />
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">Mood</span>
                        <span className="text-xs font-medium text-[#C4B5A6]">{genre.mood}</span>
                      </div>
                    </div>

                    {/* Waveform Indicator */}
                    <div className="flex items-center justify-between pt-2">
                      <MiniWaveform isActive={isActive} />
                      {isActive && <span className="text-xs text-[#C4B5A6] animate-pulse">Playing...</span>}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Additional Genres */}
        <div
          className={`mt-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {["Reggaeton", "Afrobeats", "Classical", "Indie", "Metal", "Funk", "Soul", "Ambient"].map((genre, i) => (
              <span
                key={genre}
                className="px-4 py-2 rounded-full bg-card/50 border border-border/50 text-sm text-muted-foreground hover:border-[#C4B5A6]/30 hover:text-[#C4B5A6] transition-all cursor-pointer hover:scale-105"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {genre}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#C4B5A6]/20 to-[#8A7B6B]/20 border border-[#C4B5A6]/30 text-sm text-[#C4B5A6] font-medium">
              +42 more
            </span>
          </div>
        </div>
      </div>

      {/* CSS for waveform animation */}
      <style jsx>{`
        @keyframes waveform-bar {
          0% { height: 4px; }
          100% { height: 16px; }
        }
      `}</style>
    </section>
  )
}
