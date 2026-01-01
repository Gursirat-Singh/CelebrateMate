"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Heart, User, Bell, MessageSquare, Users, Trash2, Save, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"
import { apiClient } from "@/lib/api"

interface SavedPerson {
  id: string
  name: string
  relationship: string
  eventsCount: number
}

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  // Profile state
  const [profileName, setProfileName] = useState("")
  const [profileTimezone, setProfileTimezone] = useState("pst")
  const [profileLoading, setProfileLoading] = useState(false)

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [reminderTime, setReminderTime] = useState("09:00")
  const [messageTone, setMessageTone] = useState("friendly")
  const [messageLanguage, setMessageLanguage] = useState("en")

  // Mock saved people
  const savedPeople: SavedPerson[] = [
    { id: "1", name: "Sarah Johnson", relationship: "Mother", eventsCount: 2 },
    { id: "2", name: "Mark & Lisa", relationship: "Friends", eventsCount: 1 },
    { id: "3", name: "David Chen", relationship: "Colleague", eventsCount: 1 },
    { id: "4", name: "Emma Williams", relationship: "Sister", eventsCount: 1 },
  ]

  useEffect(() => {
    const storedUser = localStorage.getItem("celebratemate_user")
    if (!storedUser) {
      router.push("/auth")
    } else {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      // Initialize form values
      setProfileName(parsedUser.name || "")
      setProfileTimezone("pst") // Default timezone
    }
  }, [router])

  const handleSaveProfile = async () => {
    if (!user) return

    setProfileLoading(true)
    try {
      const updateData = {
        name: profileName,
        timezone: profileTimezone
      }

      const result = await apiClient.updateProfile(updateData)

      // Update localStorage with new data
      const updatedUser = {
        ...user,
        name: result.user.name
      }
      localStorage.setItem("celebratemate_user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully",
      })
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setProfileLoading(false)
    }
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications updated",
      description: "Your notification preferences have been saved",
    })
  }

  const handleSaveMessageSettings = () => {
    toast({
      title: "Message settings updated",
      description: "Your AI message preferences have been saved",
    })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-blue-500/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-rose-100/20 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-lg mb-6">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-4">
              Settings
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Customize your experience and manage your account preferences
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-16 max-w-4xl -mt-8">
        <Tabs defaultValue="profile" className="space-y-8">
          {/* Enhanced Tab Navigation */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-2">
            <TabsList className="bg-transparent w-full h-auto p-1 grid grid-cols-4 gap-1">
              <TabsTrigger
                value="profile"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <User className="h-5 w-5" />
                <span className="text-xs font-medium">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Bell className="h-5 w-5" />
                <span className="text-xs font-medium">Notifications</span>
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs font-medium">Messages</span>
              </TabsTrigger>
              <TabsTrigger
                value="people"
                className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-rose-500 data-[state=active]:to-rose-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Users className="h-5 w-5" />
                <span className="text-xs font-medium">People</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Profile Tab */}
          <TabsContent
            value="profile"
            className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900 dark:to-rose-800 rounded-lg">
                    <User className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <CardTitle className="text-2xl">Profile Information</CardTitle>
                </div>
                <CardDescription className="text-base">Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Avatar Section */}
                <div className="flex items-center gap-8 p-6 bg-gradient-to-r from-rose-50/50 to-pink-50/50 dark:from-rose-900/10 dark:to-pink-900/10 rounded-xl border border-rose-100/50 dark:border-rose-800/50">
                  <Avatar className="h-24 w-24 ring-4 ring-rose-100 dark:ring-rose-900/50 shadow-lg">
                    <AvatarFallback className="bg-gradient-to-br from-rose-500 to-rose-600 text-white text-3xl font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Profile Picture</h3>
                    <p className="text-sm text-muted-foreground mb-3">Upload a photo to personalize your account</p>
                    <Button variant="outline" size="sm" className="bg-white/50 hover:bg-white dark:bg-gray-700/50 dark:hover:bg-gray-700">
                      <Heart className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Display Name
                    </Label>
                    <Input
                      id="name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="Enter your display name"
                      className="h-11"
                    />
                    <p className="text-xs text-muted-foreground">This is how you'll appear in the app</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      readOnly
                      className="h-11 bg-gray-50 dark:bg-gray-800"
                    />
                    <p className="text-xs text-muted-foreground">Email cannot be changed for security reasons</p>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="timezone" className="text-sm font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Timezone
                    </Label>
                    <Select value={profileTimezone} onValueChange={setProfileTimezone}>
                      <SelectTrigger id="timezone" className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Used for reminder timing and notifications</p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={profileLoading}
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {profileLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Save Profile Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent
            value="notifications"
            className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl">Notification Preferences</CardTitle>
                </div>
                <CardDescription className="text-base">Choose how you want to be reminded about upcoming events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Notification Settings */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-lg border border-emerald-100/50 dark:border-emerald-800/50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                        <Bell className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <Label htmlFor="email-notifications" className="text-base font-medium cursor-pointer">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive email reminders about upcoming events</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50/50 to-violet-50/50 dark:from-purple-900/10 dark:to-violet-900/10 rounded-lg border border-purple-100/50 dark:border-purple-800/50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                        <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <Label htmlFor="push-notifications" className="text-base font-medium cursor-pointer">
                          Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Get browser notifications for important reminders</p>
                      </div>
                    </div>
                    <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                </div>

                <Separator />

                {/* Reminder Time Setting */}
                <div className="p-6 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-lg border border-amber-100/50 dark:border-amber-800/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
                      <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <Label htmlFor="reminder-time" className="text-base font-medium">
                        Default Reminder Time
                      </Label>
                      <p className="text-sm text-muted-foreground">What time should we send your daily reminder?</p>
                    </div>
                  </div>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="h-11 bg-white/50 dark:bg-gray-700/50"
                  />
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleSaveNotifications}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save Notification Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent
            value="messages"
            className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-2xl">AI Message Settings</CardTitle>
                </div>
                <CardDescription className="text-base">Customize how AI generates your greeting messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Message Tone Setting */}
                <div className="p-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-lg border border-indigo-100/50 dark:border-indigo-800/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                      <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <Label htmlFor="message-tone" className="text-base font-medium">
                        Message Tone
                      </Label>
                      <p className="text-sm text-muted-foreground">Choose the default tone for AI-generated messages</p>
                    </div>
                  </div>
                  <Select value={messageTone} onValueChange={setMessageTone}>
                    <SelectTrigger id="message-tone" className="h-11 bg-white/50 dark:bg-gray-700/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly & Casual</SelectItem>
                      <SelectItem value="formal">Formal & Professional</SelectItem>
                      <SelectItem value="heartfelt">Heartfelt & Emotional</SelectItem>
                      <SelectItem value="humorous">Light & Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Setting */}
                <div className="p-6 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 dark:from-cyan-900/10 dark:to-blue-900/10 rounded-lg border border-cyan-100/50 dark:border-cyan-800/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-full">
                      <Heart className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <Label htmlFor="message-language" className="text-base font-medium">
                        Language
                      </Label>
                      <p className="text-sm text-muted-foreground">Language for generated messages</p>
                    </div>
                  </div>
                  <Select value={messageLanguage} onValueChange={setMessageLanguage}>
                    <SelectTrigger id="message-language" className="h-11 bg-white/50 dark:bg-gray-700/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="it">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message Preview */}
                <div className="p-6 bg-gradient-to-br from-gradient-to-r from-rose-50/50 to-pink-50/50 dark:from-rose-900/10 dark:to-pink-900/10 rounded-lg border border-rose-100/50 dark:border-rose-800/50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900 rounded-full">
                      <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Message Preview</h3>
                      <p className="text-sm text-muted-foreground">See how your messages will look</p>
                    </div>
                  </div>

                  <div className="bg-white/50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200/50 dark:border-gray-600/50">
                    <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sample Message:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">
                      {messageTone === "friendly" &&
                        "Hey! Wishing you the happiest of birthdays! Hope your day is amazing!"}
                      {messageTone === "formal" &&
                        "I would like to extend my warmest wishes on your special day. May you have a wonderful celebration."}
                      {messageTone === "heartfelt" &&
                        "Sending you so much love on your birthday. You mean the world to us and we're grateful for you."}
                      {messageTone === "humorous" &&
                        "Happy Birthday! You're not getting older, you're just becoming a classic! Enjoy your special day!"}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleSaveMessageSettings}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save Message Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved People Tab */}
          <TabsContent
            value="people"
            className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle>Saved People</CardTitle>
                <CardDescription>
                  Manage the people you're celebrating with. You have {savedPeople.length} saved contacts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedPeople.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-amber-100 text-amber-700">
                            {person.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {person.relationship} • {person.eventsCount} {person.eventsCount === 1 ? "event" : "events"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
