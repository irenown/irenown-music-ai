"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ConsoleLayout } from "@/components/console/console-layout"
import { apiClient } from "@/lib/api"
import { Loader2 } from "lucide-react"

export default function ConsoleRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const user = apiClient.getUser()
    const token = localStorage.getItem('irenown_token')

    if (!user || !token) {
      router.push("/auth/signin")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return <ConsoleLayout>{children}</ConsoleLayout>
}
