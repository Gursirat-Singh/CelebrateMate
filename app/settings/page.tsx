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
import { Heart, User, Bell, MessageSquare, Users, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/navbar"

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
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully",
    })
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="profile"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-rose-500 data-[state=active]:bg-transparent"
            >
              <Users className="h-4 w-4 mr-2" />
              Saved People
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-rose-500 text-white text-2xl">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={user.name} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={user.email} readOnly />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="pst">
                      <SelectTrigger id="timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="bg-rose-500 hover:bg-rose-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be reminded about upcoming events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications" className="text-base font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive email reminders about upcoming events</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications" className="text-base font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Get browser notifications for important reminders</p>
                  </div>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="reminder-time">Default Reminder Time</Label>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">What time should we send your daily reminder?</p>
                </div>

                <Button onClick={handleSaveNotifications} className="bg-rose-500 hover:bg-rose-600">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Message Settings</CardTitle>
                <CardDescription>Customize how AI generates your greeting messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="message-tone">Message Tone</Label>
                  <Select value={messageTone} onValueChange={setMessageTone}>
                    <SelectTrigger id="message-tone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly & Casual</SelectItem>
                      <SelectItem value="formal">Formal & Professional</SelectItem>
                      <SelectItem value="heartfelt">Heartfelt & Emotional</SelectItem>
                      <SelectItem value="humorous">Light & Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Choose the default tone for AI-generated messages</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="message-language">Language</Label>
                  <Select value={messageLanguage} onValueChange={setMessageLanguage}>
                    <SelectTrigger id="message-language">
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
                  <p className="text-xs text-muted-foreground">Language for generated messages</p>
                </div>

                <Separator />

                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <p className="text-sm font-medium">Preview</p>
                  <p className="text-sm text-muted-foreground italic">
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

                <Button onClick={handleSaveMessageSettings} className="bg-rose-500 hover:bg-rose-600">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved People Tab */}
          <TabsContent value="people" className="space-y-6">
            <Card>
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
