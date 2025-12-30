"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Music2, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { apiClient } from "@/lib/api"
import { auth } from "@/lib/firebase"
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth"
import { useEffect } from "react"

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  useEffect(() => {
    // Remove redirect result check since we're only using popup
  }, []);

  // Handle post-login synchronization
  const syncUser = async (user: any) => {
    try {
      const token = await user.getIdToken()
      // Call backend to sync/create user in DB
      // Note: We use a special registration endpoint that handles social logins too
      // If the backend requires a registration call first, we might need a separate flow
      // identifying if it's a new user. For now, assuming /api/auth/me checks or auto-syncs.
      // Actually, looking at index.js, /api/auth/register handles the sync. 
      // We should probably call that if 'me' fails, or just call 'me' and if 404/error try register?
      // Let's rely on the existing pattern: Login -> Get Token -> Call Me.

      // Update: The backend /api/auth/register logic handles "sync" if user exists.
      // So strictly speaking, for social login, we should probably call register first to ensure DB record.

      const registerRes = await apiClient.post('/api/auth/register', {
        username: user.displayName || user.email?.split('@')[0] || "User",
        email: user.email,
        firebaseId: user.uid
      });

      apiClient.setToken(token);
      apiClient.setApiKey(registerRes.user.api_key);
      apiClient.setUser(registerRes.user);

      router.push("/console")
    } catch (err: any) {
      console.error("Sync error:", err);
      setError("Failed to synchronize user profile. Please try again.");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      await syncUser(userCredential.user);
    } catch (err: any) {
      setError(err.message || "Invalid email or password.")
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    setIsLoading(true)
    console.log("=== GOOGLE SIGN-IN DEBUG ===");
    console.log("Window origin:", window.location.origin);
    console.log("Auth domain:", auth.app.options.authDomain);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      console.log("Attempting signInWithPopup...");
      const result = await signInWithPopup(auth, provider);
      console.log("Sign-in successful!", result.user.email);

      if (result) {
        await syncUser(result.user);
      }
    } catch (err: any) {
      console.error("=== GOOGLE SIGN-IN ERROR ===");
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      console.error("Full error:", err);

      let errorMessage = "Failed to sign in with Google. ";

      if (err.code === 'auth/popup-blocked') {
        errorMessage += "Please allow popups for this site and try again.";
      } else if (err.code === 'auth/popup-closed-by-user') {
        errorMessage += "Sign-in was cancelled.";
      } else if (err.code === 'auth/internal-error') {
        errorMessage += "Internal error. This might be due to browser cookie settings. Please ensure third-party cookies are enabled, or try a different browser.";
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage += "This domain is not authorized for authentication. Please contact support.";
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage += "Network error. Please check your internet connection.";
      } else {
        errorMessage += err.message || "Please try again or use email/password sign-in.";
      }

      setError(errorMessage);
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="relative h-12 w-12">
              <Image src="/irenown-logo.png" alt="iRenown" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold text-irenown-gradient">iRenown</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to continue creating amazing music</p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              type="button"
              className="w-full justify-center gap-3 h-12 border-border hover:bg-card hover:border-primary/50 bg-transparent"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 h-12 bg-card border-border focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 h-12 bg-card border-border focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                />
                <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-irenown transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline font-medium">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex lg:flex-1 relative bg-card overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[128px] animate-ambient-glow" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/20 blur-[128px] animate-ambient-glow delay-500" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 mx-auto animate-float glow-irenown">
              <Music2 className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Create Music Like Never Before</h2>
            <p className="text-muted-foreground max-w-md">
              Join thousands of artists using AI to transform their vocals into professional tracks in minutes.
            </p>
          </div>

          {/* Testimonial */}
          <div className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-border max-w-md">
            <p className="text-foreground italic mb-4">
              "iRenown completely changed my music production workflow. What used to take days now takes minutes."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">JM</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground text-sm">Jordan Mitchell</p>
                <p className="text-xs text-muted-foreground">Independent Artist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
