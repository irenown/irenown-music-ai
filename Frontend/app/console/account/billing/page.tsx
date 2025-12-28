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

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "forever",
    features: ["2 songs/month", "Standard quality", "Watermark on output", "MP3 format", "Community support"],
    current: false,
  },
  {
    id: "creator",
    name: "Creator",
    price: 9.99,
    interval: "month",
    features: [
      "20 songs/month",
      "Standard quality",
      "No watermark",
      "MP3 format (320kbps)",
      "Email support",
      "Save preferences",
    ],
    current: true,
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 24.99,
    interval: "month",
    features: [
      "50 songs/month",
      "Standard quality",
      "No watermark",
      "MP3 + WAV formats",
      "Priority support",
      "Advanced options",
      "API access",
    ],
    current: false,
  },
]

const premiumPacks = [
  { name: "Single Track", price: 4.99, perSong: 4.99 },
  { name: "3-Pack", price: 12.99, perSong: 4.33 },
  { name: "10-Pack", price: 39.99, perSong: 4.0, popular: true },
]

const invoices = [
  { id: "INV-001", date: "Dec 15, 2024", description: "Premium Track - Summer Dreams", amount: 4.99, status: "paid" },
  { id: "INV-002", date: "Dec 1, 2024", description: "Creator Plan - December 2024", amount: 9.99, status: "paid" },
  { id: "INV-003", date: "Nov 1, 2024", description: "Creator Plan - November 2024", amount: 9.99, status: "paid" },
  { id: "INV-004", date: "Oct 15, 2024", description: "Premium Track (3-pack)", amount: 12.99, status: "paid" },
  { id: "INV-005", date: "Oct 1, 2024", description: "Creator Plan - October 2024", amount: 9.99, status: "paid" },
]

function BillingContent() {
  const [selectedPlan, setSelectedPlan] = useState("creator")

  const currentPlan = plans.find((p) => p.current)

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
                      ${currentPlan?.price}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="bg-transparent">
                    Cancel Plan
                  </Button>
                  <Button className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light">
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </div>
              </div>

              {/* Usage */}
              <div className="mt-6 p-4 rounded-xl bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Songs used this month</span>
                  <span className="text-sm text-muted-foreground">15 of 20</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">Renews: January 1, 2025</p>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Available Plans</CardTitle>
              <CardDescription>Choose the plan that best fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "relative rounded-xl border p-6 transition-all cursor-pointer",
                      plan.current
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/30",
                      plan.popular && !plan.current && "border-irenown-mid",
                    )}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && !plan.current && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-irenown-mid text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    {plan.current && (
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
                      variant={plan.current ? "outline" : "default"}
                      className={cn(
                        "w-full",
                        !plan.current &&
                          "bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light",
                      )}
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Premium Pay-Per-Song */}
          <Card className="bg-card/50 backdrop-blur-sm border-irenown-mid/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-irenown-light" />
                Premium Pay-Per-Song
              </CardTitle>
              <CardDescription>
                Need studio-quality for a release? Get professional mastering and stem files.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Star className="w-5 h-5 text-irenown-light mx-auto mb-2" />
                  <p className="text-sm font-medium">Studio-grade</p>
                  <p className="text-xs text-muted-foreground">ElevenLabs Quality</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <Zap className="w-5 h-5 text-irenown-light mx-auto mb-2" />
                  <p className="text-sm font-medium">Pro Mastering</p>
                  <p className="text-xs text-muted-foreground">LANDR Technology</p>
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
                    {pack.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-irenown-mid text-primary-foreground">Best Value</Badge>
                      </div>
                    )}
                    <h4 className="font-semibold">{pack.name}</h4>
                    <p className="text-2xl font-bold mt-2">${pack.price}</p>
                    <p className="text-xs text-muted-foreground">${pack.perSong.toFixed(2)} per song</p>
                    <Button
                      variant="outline"
                      size="sm"
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Payment Methods</CardTitle>
                  <CardDescription>Manage your saved payment methods</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Card Number</Label>
                        <Input placeholder="1234 5678 9012 3456" className="bg-muted/50" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input placeholder="MM/YY" className="bg-muted/50" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVC</Label>
                          <Input placeholder="123" className="bg-muted/50" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Name on Card</Label>
                        <Input placeholder="John Doe" className="bg-muted/50" />
                      </div>
                      <Button className="w-full">Add Card</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-primary bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary">Default</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="John Doe" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input defaultValue="123 Main St" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input defaultValue="New York" className="bg-muted/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input defaultValue="NY" className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>ZIP</Label>
                    <Input defaultValue="10001" className="bg-muted/50" />
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="mt-4">Update Address</Button>
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
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
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
                  {invoices.map((invoice) => (
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Charges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Creator Plan - January 2025</p>
                    <p className="text-sm text-muted-foreground">January 1, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">$9.99</p>
                  <p className="text-xs text-muted-foreground">Visa ****4242</p>
                </div>
              </div>
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
