"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Plus, Calendar, User, MessageSquare, Sparkles, Loader2, ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import { apiClient } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export default function NewEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    eventType: "birthday" as "birthday" | "anniversary" | "custom",
    tone: "celebratory" as "celebratory" | "supportive" | "remembrance" | "practical",
    eventDate: "",
    personName: "",
    description: "",
    reminderDaysBefore: 7
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("celebratemate_user")
    if (!storedUser) {
      router.push("/auth")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.eventDate || !newEvent.personName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Validate date is in the future
    const eventDate = new Date(newEvent.eventDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (eventDate < today) {
      toast({
        title: "Invalid Date",
        description: "Event date must be in the future",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const eventData = {
        title: newEvent.title,
        eventType: newEvent.eventType,
        tone: newEvent.tone,
        eventDate: newEvent.eventDate,
        personName: newEvent.personName,
        description: newEvent.description || "",
        reminderDaysBefore: newEvent.reminderDaysBefore
      }

      await apiClient.createEvent(eventData)

      toast({
        title: "Event Created Successfully!",
        description: "Your celebration event has been added to your dashboard.",
      })

      router.push("/dashboard")
    } catch (error: any) {
      toast({
        title: "Failed to Create Event",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="hover:bg-white/50 dark:hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-lg mb-6">
              <Plus className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-4">
              Create New Event
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Add a new celebration to your collection and never miss a special moment
            </p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 pb-16 max-w-2xl -mt-8">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Event Details</CardTitle>
            <CardDescription className="text-base">
              Fill in the information about your celebration event
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Event Title */}
            <div className="space-y-3">
              <Label htmlFor="event-title" className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" />
                Event Title *
              </Label>
              <Input
                id="event-title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g., Sarah's Birthday Celebration"
                className="h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">Give your event a memorable name</p>
            </div>

            {/* Person Name & Event Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="person-name" className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-500" />
                  Person's Name *
                </Label>
                <Input
                  id="person-name"
                  value={newEvent.personName}
                  onChange={(e) => setNewEvent({ ...newEvent, personName: e.target.value })}
                  placeholder="e.g., Sarah Johnson"
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="event-type" className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  Event Type *
                </Label>
                <Select value={newEvent.eventType} onValueChange={(value: any) => setNewEvent({ ...newEvent, eventType: value })}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">🎂 Birthday</SelectItem>
                    <SelectItem value="anniversary">💍 Anniversary</SelectItem>
                    <SelectItem value="custom">🎉 Custom Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Event Date & Tone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="event-date" className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Event Date *
                </Label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.eventDate}
                  onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                  className="h-12 text-base"
                  min={new Date().toISOString().split('T')[0]}
                />
                <p className="text-xs text-muted-foreground">When is the celebration?</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="event-tone" className="text-sm font-medium flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500" />
                  Message Tone
                </Label>
                <Select value={newEvent.tone} onValueChange={(value: any) => setNewEvent({ ...newEvent, tone: value })}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celebratory">🎉 Celebratory</SelectItem>
                    <SelectItem value="supportive">🤗 Supportive</SelectItem>
                    <SelectItem value="remembrance">💭 Remembrance</SelectItem>
                    <SelectItem value="practical">📝 Practical</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">How should AI messages feel?</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label htmlFor="event-description" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-500" />
                Description (Optional)
              </Label>
              <Textarea
                id="event-description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Add any additional details about this celebration..."
                className="min-h-[120px] resize-none text-base"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                Max 500 characters. This helps AI generate better messages.
              </p>
            </div>

            {/* Reminder Settings */}
            <div className="space-y-3">
              <Label htmlFor="reminder-days" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-500" />
                Reminder Days Before
              </Label>
              <Select value={newEvent.reminderDaysBefore.toString()} onValueChange={(value) => setNewEvent({ ...newEvent, reminderDaysBefore: parseInt(value) })}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day before</SelectItem>
                  <SelectItem value="3">3 days before</SelectItem>
                  <SelectItem value="7">7 days before</SelectItem>
                  <SelectItem value="14">14 days before</SelectItem>
                  <SelectItem value="30">30 days before</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">When should we remind you about this event?</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="flex-1 h-12 text-base border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleCreateEvent}
                disabled={loading}
                className="flex-1 h-12 text-base bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 dark:from-rose-600 dark:to-rose-700 dark:hover:from-rose-700 dark:hover:to-rose-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Creating Event...
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-2" />
                    Create Event
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
