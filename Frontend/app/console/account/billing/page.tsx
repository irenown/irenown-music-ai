"use client"

import { useState, Suspense } from "react"
import { Check, Star, Zap, Crown, Download, FileText, Plus, Trash2, Edit, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { apiClient } from "@/lib/api"

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "forever",
    features: ["1 trial song (1 minute)", "Standard quality", "Watermark on output", "MP3 format", "Community support"],
  },
]

const premiumPacks = [
  { name: "1 Premium Track", price: 4.99, perSong: 4.99 },
  { name: "3 Premium Tracks", price: 12.99, perSong: 4.33, save: "13%" },
  { name: "10 Premium Tracks", price: 39.99, perSong: 4.0, popular: true, save: "20%" },
  { name: "30 Premium Tracks", price: 99.99, perSong: 3.33, save: "33%" },
]

function BillingContent() {
  const [selectedPlan, setSelectedPlan] = useState("silver")
  const [usageData, setUsageData] = useState<any>(null)
  const [invoices, setInvoices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userTier, setUserTier] = useState("silver")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usageRes, invoicesRes] = await Promise.all([
          apiClient.get('/api/user/usage'),
          apiClient.get('/api/user/invoices')
        ])

        setUsageData(usageRes.usage)
        setUserTier(usageRes.tier)
        setInvoices(invoicesRes)

        // Auto-select next tier or current?
        // setSelectedPlan(usageRes.tier) 
      } catch (error) {
        console.error("Failed to fetch billing data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handlePurchase = async (planId: string, type: 'subscription' | 'credit' = 'credit', amount?: number) => {
    try {
      const { url } = await apiClient.post('/api/payments/create-checkout-session', {
        plan: planId,
        type,
        amount
      })

      if (url) window.location.href = url
    } catch (error) {
      console.error("Purchase failed:", error)
      alert("Failed to initiate payment. Please try again later.")
    }
  }

  const currentPlan = plans.find((p) => p.id === userTier) || plans[0]

  if (isLoading) {
    return <BillingLoadingFallback />
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-5xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Billing & Plans</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and payment methods</p>
      </div>

      <Tabs defaultValue="plan" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="plan">Plan</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        {/* Plan Tab */}
        <TabsContent value="plan" className="space-y-6">
          {/* Current Plan */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-irenown-light/30 to-irenown-dark/30 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-irenown-light" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold">{currentPlan?.name} Plan</h3>
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>
                    </div>
                    <p className="text-2xl font-bold mt-1">
                      {currentPlan?.price === 0 ? "Free forever" : `$${currentPlan?.price}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {currentPlan?.price === 0 ? (
                    <Button className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light">
                      <Zap className="w-4 h-4 mr-2" />
                      Get Credits
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="bg-transparent">
                        Cancel Plan
                      </Button>
                      <Button className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light">
                        <Zap className="w-4 h-4 mr-2" />
                        Upgrade
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Usage */}
              {usageData && (
                <div className="mt-6 p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Premium Track Credits</span>
                    <span className="text-sm text-muted-foreground">{usageData.premium_credits || 0} tracks remaining</span>
                  </div>
                  <Progress value={usageData.premium_credits > 0 ? 100 : 0} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Trial Status: {usageData.has_used_trial ? "Used" : "Available"}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Available Plans */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Available Plans</CardTitle>
              <CardDescription>Choose the plan that best fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-1 max-w-sm mx-auto gap-4">
                {plans.map((plan) => {
                  const isCurrent = plan.id === userTier
                  return (
                    <div
                      key={plan.id}
                      className={cn(
                        "relative rounded-xl border p-6 transition-all cursor-pointer",
                        isCurrent
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/30",
                        plan.id === "gold" && !isCurrent && "border-irenown-mid",
                      )}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.id === "gold" && !isCurrent && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-irenown-mid text-primary-foreground">Most Popular</Badge>
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <Badge className="bg-primary text-primary-foreground">Current Plan</Badge>
                        </div>
                      )}

                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold">{plan.name}</h3>
                        <div className="mt-2">
                          <span className="text-3xl font-bold">${plan.price}</span>
                          {plan.price > 0 && <span className="text-muted-foreground">/{plan.interval}</span>}
                        </div>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        variant={isCurrent ? "outline" : "default"}
                        className={cn(
                          "w-full",
                          !isCurrent &&
                          "bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light",
                        )}
                        disabled={isCurrent}
                      >
                        {isCurrent ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Premium Pay-Per-Song */}
          <Card className="bg-card/50 backdrop-blur-sm border-irenown-mid/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-irenown-light" />
                Premium Track Credits
              </CardTitle>
              <CardDescription>
                Pay only for what you need. One credit = One studio-grade song.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Star className="w-5 h-5 text-irenown-light mx-auto mb-2" />
                  <p className="text-sm font-medium">Studio-grade</p>
                  <p className="text-xs text-muted-foreground">iRenown HD Quality</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Zap className="w-5 h-5 text-irenown-light mx-auto mb-2" />
                  <p className="text-sm font-medium">Pro Mastering</p>
                  <p className="text-xs text-muted-foreground">iRenown Mastering Core</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <FileText className="w-5 h-5 text-irenown-light mx-auto mb-2" />
                  <p className="text-sm font-medium">Stem Files</p>
                  <p className="text-xs text-muted-foreground">WAV + FLAC + MP3</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {premiumPacks.map((pack, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative rounded-xl border p-4 text-center",
                      pack.popular ? "border-irenown-mid bg-irenown-mid/5" : "border-border",
                    )}
                  >
                    {pack.save && (
                      <div className="absolute -top-3 right-4">
                        <Badge className="bg-accent text-accent-foreground">{pack.save} Save</Badge>
                      </div>
                    )}
                    {pack.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-irenown-mid text-primary-foreground">Best Value</Badge>
                      </div>
                    )}
                    <h4 className="font-semibold">{pack.name}</h4>
                    <p className="text-2xl font-bold mt-2">${pack.price}</p>
                    <p className="text-xs text-muted-foreground">${pack.perSong.toFixed(2)} per track</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePurchase('credits', 'credit', index === 0 ? 1 : index === 1 ? 3 : index === 2 ? 10 : 30)}
                      className="mt-4 w-full bg-transparent border-irenown-mid/50 hover:bg-irenown-mid/10"
                    >
                      Buy Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Payment Methods</CardTitle>
              <CardDescription>No payment methods saved (Stripe not connected yet).</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder until Stripe is connected */}
              <Button size="sm" disabled>
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices Tab */}
        <TabsContent value="invoices" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Billing History</CardTitle>
                  <CardDescription>View and download your invoices</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No invoices found
                      </TableCell>
                    </TableRow>
                  ) : (
                    invoices.map((invoice: any) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/30 capitalize">
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function BillingPage() {
  return (
    <Suspense fallback={<BillingLoadingFallback />}>
      <BillingContent />
    </Suspense>
  )
}

function BillingLoadingFallback() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-5xl animate-pulse">
      <div>
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded mt-2" />
      </div>
      <div className="h-12 w-64 bg-muted rounded" />
      <div className="h-64 bg-muted rounded-xl" />
    </div>
  )
}
