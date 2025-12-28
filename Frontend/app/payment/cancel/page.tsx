"use client"

import { XCircle, ArrowLeft, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentCancelPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 p-12 rounded-3xl bg-card border border-border">
                <div>
                    <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-10 h-10 text-destructive" />
                    </div>

                    <h1 className="text-3xl font-bold text-foreground mb-2">Payment Cancelled</h1>
                    <p className="text-muted-foreground mb-8">
                        The transaction was not completed. No charges were made to your account.
                    </p>

                    <div className="space-y-3">
                        <Button asChild className="w-full h-12 border-border hover:bg-muted/50" variant="outline">
                            <Link href="/pricing">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Pricing
                            </Link>
                        </Button>
                        <Button variant="ghost" asChild className="w-full h-12">
                            <Link href="/support">
                                <HelpCircle className="w-4 h-4 mr-2" />
                                Contact Support
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
