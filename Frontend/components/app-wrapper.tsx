"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { IntroAnimation } from "./intro-animation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter, usePathname } from "next/navigation"
import { apiClient } from "@/lib/api"

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro has been shown in this session
    if (typeof window !== 'undefined') {
      const introShown = sessionStorage.getItem('intro-shown')
      return !introShown
    }
    return true
  })
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Global Auth: User detected", user.email)
        try {
          // If we have a user but no local API key, we should try to sync
          const localUser = apiClient.getUser()
          if (!localUser || localUser.id !== user.uid) {
            const token = await user.getIdToken()
            apiClient.setToken(token)

            // Try to sync/register to ensure DB record and get API key
            const res = await apiClient.post('/api/auth/register', {
              username: user.displayName || user.email?.split('@')[0] || "User",
              email: user.email,
              firebaseId: user.uid
            })

            apiClient.setApiKey(res.user.api_key)
            apiClient.setUser(res.user)
          }

          // If on an auth page, redirect to console
          if (pathname.startsWith('/auth') || pathname === '/signin' || pathname === '/signup') {
            console.log("Global Auth: Redirecting to /console")
            router.push('/console')
          }
        } catch (err) {
          console.error("Global Auth: Sync failed", err)
        }
      }
    })

    return () => unsubscribe()
  }, [pathname, router])

  const handleIntroComplete = useCallback(() => {
    // Mark intro as shown in this session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('intro-shown', 'true')
    }
    setShowIntro(false)
    // Small delay before showing content for smooth transition
    setTimeout(() => setContentVisible(true), 100)
  }, [])

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className={`transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  )
}
