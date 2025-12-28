import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AppWrapper } from "@/components/app-wrapper"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "iRenown | Professional AI Music Production",
  description:
    "Transform your vocals into professionally produced tracks with AI-powered music generation, mixing, and mastering.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/irenown-logo.png",
      },
    ],
    apple: "/irenown-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <AppWrapper>{children}</AppWrapper>
        <Analytics />
      </body>
    </html>
  )
}
