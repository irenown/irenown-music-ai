"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  HelpCircle,
  BookOpen,
  Video,
  FileText,
  MessageSquare,
  Mail,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Zap,
  Code,
  Music,
  Settings,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const popularArticles = [
  { title: "Getting Started Guide", icon: BookOpen, category: "basics", views: "12.5k" },
  { title: "How to get the best results", icon: Lightbulb, category: "tips", views: "8.2k" },
  { title: "Understanding quality tiers", icon: Music, category: "features", views: "6.8k" },
  { title: "Supported file formats", icon: FileText, category: "technical", views: "5.1k" },
  { title: "Troubleshooting failed generations", icon: AlertCircle, category: "troubleshooting", views: "4.3k" },
]

const categories = [
  { name: "Getting Started", icon: BookOpen, count: 12 },
  { name: "Creating Songs", icon: Music, count: 18 },
  { name: "Account & Billing", icon: CreditCard, count: 8 },
  { name: "Technical", icon: Settings, count: 15 },
  { name: "API Documentation", icon: Code, count: 24 },
]

const faqs = [
  {
    question: "What file formats are supported for vocal upload?",
    answer:
      "We support MP3, WAV, M4A, and OGG formats. For best results, we recommend uploading high-quality WAV files at 44.1kHz or higher sample rate. The maximum file size is 50MB.",
  },
  {
    question: "How long does it take to generate a song?",
    answer:
      "Standard quality songs typically take 5-8 minutes to generate. Premium quality songs with professional mastering take 8-12 minutes. Processing time may vary based on song length and server load.",
  },
  {
    question: "Can I use generated songs commercially?",
    answer:
      "Yes! All songs generated with a paid subscription (Creator or Pro) include full commercial rights. Free tier songs include a watermark and are for personal use only.",
  },
  {
    question: "What's the difference between Standard and Premium quality?",
    answer:
      "Standard quality uses our base AI models and is included in your subscription. Premium quality uses ElevenLabs technology with professional LANDR mastering, includes stem files (vocal + instrumental), and provides multiple format downloads (WAV, FLAC, MP3).",
  },
  {
    question: "How do I get a refund?",
    answer:
      "We offer a 7-day money-back guarantee for new subscribers. For premium track purchases, refunds are available if the generation fails. Contact support@irenown.com for assistance.",
  },
]

const resources = [
  { title: "Video Tutorials", description: "Step-by-step video guides", icon: Video, href: "/tutorials" },
  { title: "Documentation", description: "Detailed platform docs", icon: FileText, href: "/docs" },
  { title: "API Reference", description: "For developers", icon: Code, href: "/api-docs" },
  { title: "Community Forum", description: "Connect with other creators", icon: MessageSquare, href: "#" },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [feedbackType, setFeedbackType] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const handleSubmitFeedback = () => {
    setFeedbackSubmitted(true)
    setTimeout(() => {
      setFeedbackSubmitted(false)
      setFeedbackType("")
      setFeedbackMessage("")
    }, 3000)
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-5xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground mt-1">Find answers, get help, and share feedback</p>
      </div>

      {/* Search */}
      <Card className="bg-gradient-to-br from-irenown-dark/20 to-irenown-light/10 border-irenown-mid/20">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">How can we help you?</h2>
            <p className="text-sm text-muted-foreground">Search our help center for quick answers</p>
          </div>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-background/80 border-border/50 text-base"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="articles">Help Articles</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        {/* Help Articles Tab */}
        <TabsContent value="articles" className="space-y-6">
          {/* Popular Articles */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Popular Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {popularArticles.map((article, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <article.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">{article.title}</p>
                        <p className="text-xs text-muted-foreground">{article.views} views</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Browse by Category */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Browse by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    href="#"
                    className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <category.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">{category.count} articles</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {resources.map((resource, index) => (
                  <Link
                    key={index}
                    href={resource.href}
                    className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all text-center group"
                  >
                    <resource.icon className="w-8 h-8 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Support Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Your Plan</p>
                    <Badge className="bg-primary/20 text-primary">Creator</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Email support with 24-hour response time</p>
                </div>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                    <Mail className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Email Support</p>
                      <p className="text-xs text-muted-foreground">support@irenown.com</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                    <MessageSquare className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Community Forum</p>
                      <p className="text-xs text-muted-foreground">Get help from the community</p>
                    </div>
                  </Button>
                </div>

                <div className="p-4 rounded-xl bg-irenown-mid/10 border border-irenown-mid/20">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-irenown-light shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-irenown-light">Need faster support?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upgrade to Pro for priority support with under 4-hour response time.
                      </p>
                      <Button
                        size="sm"
                        className="mt-3 bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light"
                      >
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Send a Message</CardTitle>
                <CardDescription>We typically respond within 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select>
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="account">Account Help</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    placeholder="Describe your issue or question in detail..."
                    className="min-h-32 bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Attachments (optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-sm text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
                    Click to upload screenshots or files
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Submit Feedback</CardTitle>
              <CardDescription>Help us improve iRenown with your suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {feedbackSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Thank you for your feedback!</h3>
                  <p className="text-muted-foreground">We appreciate you taking the time to help us improve.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label>Feedback Type</Label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger className="bg-muted/50">
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="improvement">Improvement Suggestion</SelectItem>
                        <SelectItem value="praise">Praise / Positive Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Your Feedback</Label>
                    <Textarea
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="Share your thoughts, ideas, or report issues..."
                      className="min-h-32 bg-muted/50"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitFeedback}
                    disabled={!feedbackType || !feedbackMessage}
                    className="w-full bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light"
                  >
                    Submit Feedback
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Links */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="#"
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Feature Roadmap</p>
                  <p className="text-xs text-muted-foreground">See what's coming next</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </Link>
            <Link
              href="#"
              className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Known Issues</p>
                  <p className="text-xs text-muted-foreground">Current bugs we're fixing</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
