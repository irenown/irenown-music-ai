"use client"

export function Equalizer({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-0.5 h-6 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-primary rounded-full equalizer-bar"
          style={{
            height: "100%",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  )
}
