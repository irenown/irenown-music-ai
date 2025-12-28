"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle2, Music, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function SuccessContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [sessionId])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h1 className="text-xl font-medium text-foreground">Verifying your purchase...</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 p-12 rounded-3xl bg-card border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-irenown-dark via-primary to-irenown-light" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

                <div className="relative">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 glow-primary">
                        <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>

                    <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
                    <p className="text-muted-foreground mb-8">
                        Your iRenown credits have been added to your account. You can now start producing professional AI tracks.
                    </p>

                    <div className="space-y-3">
                        <Button asChild className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                            <Link href="/studio">
                                <Music className="w-5 h-5 mr-2" />
                                Start Producing
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild className="w-full h-12">
                            <Link href="/console">
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h1 className="text-xl font-medium text-foreground">Loading...</h1>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    )
}
