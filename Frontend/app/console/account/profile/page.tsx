"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"
import {
  User,
  Globe,
  Camera,
  Shield,
  Smartphone,
  Monitor,
  LogOut,
  Trash2,
  AlertTriangle,
  Check,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState({
    displayName: "",
    email: "",
    username: "",
    bio: "",
    website: "",
    spotify: "",
    instagram: "",
    youtube: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = apiClient.getUser();
        if (user) {
          setProfile(prev => ({
            ...prev,
            displayName: user.username || user.email?.split('@')[0] || "User",
            username: user.username || "user",
            email: user.email || "",
            // Bio and social links are not yet in DB, so leaving blank implies 'actual' state (empty) rather than fake data.
          }));
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []);

  const sessions = [
    { device: "Chrome on Windows", location: "New York, US", current: true, lastActive: "Now" },
    { device: "Safari on iPhone", location: "New York, US", current: false, lastActive: "2 hours ago" },
  ]

  return (
    <div className="space-y-6 pb-20 lg:pb-0 max-w-4xl">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account information and security settings</p>
      </div>

      {/* Profile Information */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal information and public profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-irenown-light to-irenown-dark flex items-center justify-center text-3xl font-bold text-primary-foreground">
                JD
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="font-medium">{profile.displayName}</p>
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
              <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                Upload Photo
              </Button>
            </div>
          </div>

          <Separator />

          {/* Form */}
          <div className="grid gap-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  className="bg-muted/50"
                />
              </div>
              <div className="space-y-2">
                <Label>Username</Label>
                <Input
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="bg-muted/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-3">
                <Input value={profile.email} disabled className="bg-muted/50" />
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30 shrink-0">
                  <Check className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <Button variant="link" className="h-auto p-0 text-sm">
                Change Email
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="bg-muted/50 min-h-20"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="space-y-2">
              <Label>Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="bg-muted/50 pl-10"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <Label>Social Links (optional)</Label>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Spotify</Label>
                  <Input
                    value={profile.spotify}
                    onChange={(e) => setProfile({ ...profile, spotify: e.target.value })}
                    className="bg-muted/50"
                    placeholder="Spotify URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Instagram</Label>
                  <Input
                    value={profile.instagram}
                    onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                    className="bg-muted/50"
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">YouTube</Label>
                  <Input
                    value={profile.youtube}
                    onChange={(e) => setProfile({ ...profile, youtube: e.target.value })}
                    className="bg-muted/50"
                    placeholder="YouTube URL"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-gradient-to-r from-irenown-dark to-irenown-mid hover:from-irenown-mid hover:to-irenown-light">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Password</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">{showPassword ? "********" : "••••••••"}</span>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button variant="outline" className="bg-transparent">
              Change Password
            </Button>
          </div>

          <Separator />

          {/* 2FA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-destructive border-destructive/30">
                Disabled
              </Badge>
              <Button variant="outline" className="bg-transparent">
                Enable 2FA
              </Button>
            </div>
          </div>

          <Separator />

          {/* Active Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Active Sessions</p>
                <p className="text-sm text-muted-foreground mt-1">Manage your active login sessions</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out All
              </Button>
            </div>
            <div className="space-y-3">
              {sessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    {session.device.includes("iPhone") ? (
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Monitor className="w-5 h-5 text-muted-foreground" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{session.device}</p>
                        {session.current && (
                          <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">Current</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Account */}
      <Card className="bg-card/50 backdrop-blur-sm border-destructive/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Delete Account
          </CardTitle>
          <CardDescription>Permanently delete your account and all associated data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">This action cannot be undone</p>
              <p className="text-sm text-muted-foreground mt-1">
                All your songs, projects, and account data will be permanently deleted.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers, including all generated songs and project files.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
