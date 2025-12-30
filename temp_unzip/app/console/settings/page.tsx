"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import {
  Bell,
  Mail,
  Smartphone,
  Settings2,
  Music2,
  Volume2,
  Shield,
  Moon,
  Sun,
  Monitor,
  Save,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function SettingsContent() {
  const [notifications, setNotifications] = useState({
    songComplete: true,
    usageReminder: true,
    productUpdates: true,
    weeklyDigest: false,
    marketing: false,
    pushSongComplete: true,
    pushErrors: true,
    pushTips: false,
  })

  const [preferences, setPreferences] = useState({
    defaultQuality: "standard",
    defaultGenre: "pop",
    rememberSettings: true,
    autoDownload: false,
    showAdvanced: false,
    theme: "dark",
    language: "en",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
  })

  const [audio, setAudio] = useState({
    outputFormat: "mp3-320",
    normalizeAudio: true,
    applyCompression: true,
    previewVolume: [80],
  })

  const [privacy, setPrivacy] = useState({
    analytics: false,
    shareInCommunity: false,
  })

  const [hasChanges, setHasChanges] = useState(false)

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleAudioChange = (key: string, value: boolean | string | number[]) => {
    setAudio((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your preferences and application settings</p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setHasChanges(false)} className="bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={() => setHasChanges(false)}
              className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Notifications */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Email Notifications</Label>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Song generation complete</p>
                  <p className="text-xs text-muted-foreground">Get notified when your song is ready</p>
                </div>
                <Switch
                  checked={notifications.songComplete}
                  onCheckedChange={(v) => handleNotificationChange("songComplete", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Monthly usage reminder (at 80%)</p>
                  <p className="text-xs text-muted-foreground">Reminder when approaching limit</p>
                </div>
                <Switch
                  checked={notifications.usageReminder}
                  onCheckedChange={(v) => handleNotificationChange("usageReminder", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Product updates & new features</p>
                  <p className="text-xs text-muted-foreground">Stay updated with new capabilities</p>
                </div>
                <Switch
                  checked={notifications.productUpdates}
                  onCheckedChange={(v) => handleNotificationChange("productUpdates", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Weekly activity digest</p>
                  <p className="text-xs text-muted-foreground">Summary of your weekly usage</p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(v) => handleNotificationChange("weeklyDigest", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Marketing & promotional emails</p>
                  <p className="text-xs text-muted-foreground">Special offers and promotions</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(v) => handleNotificationChange("marketing", v)}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Push Notifications */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Push Notifications (Desktop/Mobile)</Label>
            </div>
            <div className="space-y-4 ml-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Song complete</p>
                  <p className="text-xs text-muted-foreground">Instant notification when ready</p>
                </div>
                <Switch
                  checked={notifications.pushSongComplete}
                  onCheckedChange={(v) => handleNotificationChange("pushSongComplete", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Processing errors</p>
                  <p className="text-xs text-muted-foreground">Alert when something goes wrong</p>
                </div>
                <Switch
                  checked={notifications.pushErrors}
                  onCheckedChange={(v) => handleNotificationChange("pushErrors", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Daily tips</p>
                  <p className="text-xs text-muted-foreground">Learn how to get better results</p>
                </div>
                <Switch
                  checked={notifications.pushTips}
                  onCheckedChange={(v) => handleNotificationChange("pushTips", v)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings2 className="w-5 h-5" />
            Preferences
          </CardTitle>
          <CardDescription>Customize your default creation settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Default Quality</Label>
              <Select
                value={preferences.defaultQuality}
                onValueChange={(v) => handlePreferenceChange("defaultQuality", v)}
              >
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">You can override this per song</p>
            </div>
            <div className="space-y-2">
              <Label>Default Genre</Label>
              <Select value={preferences.defaultGenre} onValueChange={(v) => handlePreferenceChange("defaultGenre", v)}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="hiphop">Hip-Hop</SelectItem>
                  <SelectItem value="edm">EDM</SelectItem>
                  <SelectItem value="rnb">R&B</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Remember last used settings</p>
                <p className="text-xs text-muted-foreground">Auto-fill based on previous song</p>
              </div>
              <Switch
                checked={preferences.rememberSettings}
                onCheckedChange={(v) => handlePreferenceChange("rememberSettings", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto-download after generation</p>
                <p className="text-xs text-muted-foreground">Automatically download completed songs</p>
              </div>
              <Switch
                checked={preferences.autoDownload}
                onCheckedChange={(v) => handlePreferenceChange("autoDownload", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Show advanced options by default</p>
                <p className="text-xs text-muted-foreground">Expand advanced panel in create flow</p>
              </div>
              <Switch
                checked={preferences.showAdvanced}
                onCheckedChange={(v) => handlePreferenceChange("showAdvanced", v)}
              />
            </div>
          </div>

          <Separator />

          {/* Appearance */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Appearance</Label>
            <RadioGroup
              value={preferences.theme}
              onValueChange={(v) => handlePreferenceChange("theme", v)}
              className="grid grid-cols-3 gap-4"
            >
              <Label
                htmlFor="light"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Sun className="w-5 h-5" />
                <span className="text-sm">Light</span>
              </Label>
              <Label
                htmlFor="dark"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Moon className="w-5 h-5" />
                <span className="text-sm">Dark</span>
              </Label>
              <Label
                htmlFor="system"
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
              >
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <Monitor className="w-5 h-5" />
                <span className="text-sm">System</span>
              </Label>
            </RadioGroup>
          </div>

          <Separator />

          {/* Locale */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={preferences.language} onValueChange={(v) => handlePreferenceChange("language", v)}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={preferences.timezone} onValueChange={(v) => handlePreferenceChange("timezone", v)}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="Europe/London">London</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Format</Label>
              <Select value={preferences.dateFormat} onValueChange={(v) => handlePreferenceChange("dateFormat", v)}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audio Settings */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Music2 className="w-5 h-5" />
            Audio Settings
          </CardTitle>
          <CardDescription>Configure audio output preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Default Output Format</Label>
            <Select value={audio.outputFormat} onValueChange={(v) => handleAudioChange("outputFormat", v)}>
              <SelectTrigger className="bg-muted/50 w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp3-320">MP3 320kbps</SelectItem>
                <SelectItem value="mp3-256">MP3 256kbps</SelectItem>
                <SelectItem value="mp3-192">MP3 192kbps</SelectItem>
                <SelectItem value="wav">WAV (Lossless)</SelectItem>
                <SelectItem value="flac">FLAC (Lossless)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Normalize audio levels</p>
                <p className="text-xs text-muted-foreground">Consistent volume across all songs</p>
              </div>
              <Switch checked={audio.normalizeAudio} onCheckedChange={(v) => handleAudioChange("normalizeAudio", v)} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Apply gentle compression</p>
                <p className="text-xs text-muted-foreground">Reduce dynamic range for streaming</p>
              </div>
              <Switch
                checked={audio.applyCompression}
                onCheckedChange={(v) => handleAudioChange("applyCompression", v)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Preview Volume
              </Label>
              <span className="text-sm text-muted-foreground">{audio.previewVolume[0]}%</span>
            </div>
            <Slider
              value={audio.previewVolume}
              onValueChange={(v) => handleAudioChange("previewVolume", v)}
              max={100}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Privacy
          </CardTitle>
          <CardDescription>Control your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Allow anonymous usage analytics</p>
              <p className="text-xs text-muted-foreground">Help us improve with anonymous data</p>
            </div>
            <Switch checked={privacy.analytics} onCheckedChange={(v) => handlePrivacyChange("analytics", v)} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Share songs in community (future feature)</p>
              <p className="text-xs text-muted-foreground">Allow others to discover your music</p>
            </div>
            <Switch
              checked={privacy.shareInCommunity}
              onCheckedChange={(v) => handlePrivacyChange("shareInCommunity", v)}
            />
          </div>

          <Separator />

          <div className="flex items-center gap-4 text-sm">
            <Link href="/privacy" className="text-primary hover:underline">
              View Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary hover:underline">
              View Terms of Service
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Save Button (Mobile) */}
      {hasChanges && (
        <div className="lg:hidden fixed bottom-20 left-4 right-4 flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setHasChanges(false)}>
            Reset
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-irenown-dark to-irenown-mid"
            onClick={() => setHasChanges(false)}
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<SettingsLoadingFallback />}>
      <SettingsContent />
    </Suspense>
  )
}

function SettingsLoadingFallback() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-4xl animate-pulse">
      <div>
        <div className="h-8 w-32 bg-muted rounded" />
        <div className="h-4 w-64 bg-muted rounded mt-2" />
      </div>
      <div className="h-64 bg-muted rounded-xl" />
      <div className="h-64 bg-muted rounded-xl" />
    </div>
  )
}
