"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, Plus, Calendar, User, MessageSquare, Sparkles } from "lucide-react"
import Navbar from "@/components/navbar"

interface Event {
  id: string
  personName: string
  eventType: string
  eventTone?: 'celebratory' | 'supportive' | 'remembrance' | 'practical'
  date: string
  daysUntil: number
  description?: string
  status?: "upcoming" | "prepared"
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [viewMode, setViewMode] = useState<"timeline" | "calendar">("timeline")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock events data
  const upcomingEvents: Event[] = [
    {
      id: "1",
      personName: "Sarah Johnson",
      eventType: "Birthday",
      eventTone: "celebratory",
      date: "2025-01-15",
      daysUntil: 15,
      description: "Mom's 65th birthday - planning a family dinner",
      status: "upcoming"
    },
    {
      id: "2",
      personName: "Mark & Lisa",
      eventType: "Anniversary",
      eventTone: "remembrance",
      date: "2025-01-22",
      daysUntil: 22,
      description: "Remembering our beloved grandmother's passing anniversary",
      status: "prepared"
    },
    {
      id: "3",
      personName: "David Chen",
      eventType: "Birthday",
      eventTone: "practical",
      date: "2025-02-03",
      daysUntil: 34,
      description: "Colleague's birthday - send a card reminder",
      status: "upcoming"
    },
    {
      id: "4",
      personName: "John Smith",
      eventType: "Memorial",
      eventTone: "remembrance",
      date: "2025-01-28",
      daysUntil: 28,
      description: "Remembering Dad's passing - family gathering",
      status: "upcoming"
    },
  ]

  const recentlyPrepared = upcomingEvents.filter(event => event.status === "prepared")
  const nextImportantEvent = upcomingEvents.find(event => event.status === "upcoming") || upcomingEvents[0]

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("celebratemate_user")
    if (!storedUser) {
      router.push("/auth")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <main className="w-full px-8 py-16">
        {/* Top Section - Above the Fold */}
        <div className="mb-20">
          {/* Greeting Section */}
          <div className="mb-12 text-center">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/30 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-2">
                <span className="text-sm font-medium text-rose-600 dark:text-rose-400">✨ Welcome back</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 dark:text-white mb-4 leading-tight">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Here's what's coming up next in your celebrations
            </p>
          </div>

          {/* Primary Focus Card - Next Important Event */}
          {nextImportantEvent && (
            <div className="relative mb-16">
              {/* Subtle background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-pink-50/50 dark:from-rose-900/10 dark:to-pink-900/10 rounded-3xl -z-10 transform rotate-1"></div>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white via-rose-50/30 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 backdrop-blur-sm relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100/40 to-pink-100/40 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100/30 to-yellow-100/30 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-full blur-xl translate-y-12 -translate-x-12"></div>

                <CardContent className="p-10 relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                        <h2 className="text-2xl font-medium text-gray-800 dark:text-white">Next Important Event</h2>
                      </div>
                      <p className="text-base text-gray-600 dark:text-gray-400 mb-6">Coming up soon - let's get prepared</p>

                      <div className="flex items-center gap-6">
                        <Avatar className="h-16 w-16 ring-4 ring-rose-100 dark:ring-rose-900/50 shadow-lg">
                          <AvatarFallback className="bg-gradient-to-br from-rose-400 to-rose-500 text-white text-xl font-semibold shadow-inner">
                            {nextImportantEvent.personName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">{nextImportantEvent.personName}</h3>
                          <p className="text-lg text-gray-600 dark:text-gray-400">{nextImportantEvent.eventType}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900 dark:to-rose-800 rounded-full shadow-lg mb-4">
                        <div className="text-center">
                          <div className="text-3xl font-light text-rose-600 dark:text-rose-300">{nextImportantEvent.daysUntil}</div>
                          <div className="text-xs text-rose-500 dark:text-rose-400 font-medium">days</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 dark:from-rose-600 dark:to-rose-700 dark:hover:from-rose-700 dark:hover:to-rose-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                      <Link href={`/events/${nextImportantEvent.id}`} className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        View Details
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-2 border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300">
                      <Link href={`/events/${nextImportantEvent.id}`} className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Prepare Message
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Overview Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-3 text-rose-600 dark:text-rose-400" />
                <div className="text-3xl font-bold text-rose-700 dark:text-rose-300 mb-1">{upcomingEvents.length}</div>
                <div className="text-sm text-rose-600 dark:text-rose-400 font-medium">Total Events</div>
                <div className="text-xs text-rose-500 dark:text-rose-400 mt-1">This month</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-amber-600 dark:text-amber-400" />
                <div className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-1">{upcomingEvents.filter(e => e.daysUntil <= 7).length}</div>
                <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">This Week</div>
                <div className="text-xs text-amber-500 dark:text-amber-400 mt-1">Urgent</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 mx-auto mb-3 text-emerald-600 dark:text-emerald-400" />
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                  {new Set(upcomingEvents.map(e => e.personName)).size}
                </div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">People</div>
                <div className="text-xs text-emerald-500 dark:text-emerald-400 mt-1">In your life</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <CardContent className="p-6 text-center">
                <Sparkles className="h-8 w-8 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">{recentlyPrepared.length}</div>
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Prepared</div>
                <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">Ready to go</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recently Prepared Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-1">Recently Prepared</h2>
              <p className="text-gray-600 dark:text-gray-400">Your completed celebrations</p>
            </div>
            <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-gray-800">
              View All
            </Button>
          </div>

          {recentlyPrepared.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyPrepared.map((event) => (
                <Card key={event.id} className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{event.personName}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.eventType}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                            ✓ Prepared
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Nothing prepared yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Start preparing for your upcoming celebrations</p>
                <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Event
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-gray-800 dark:text-white mb-2">Quick Actions</h2>
            <p className="text-gray-600 dark:text-gray-400">Everything you need is just one click away</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="group border-0 shadow-sm hover:shadow-lg bg-gradient-to-br from-rose-50/50 to-white dark:from-gray-800 dark:to-gray-700 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Link href="/events/new" className="block">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900 dark:to-rose-800 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-7 w-7 text-rose-600 dark:text-rose-300" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">Add Event</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Create new celebration</p>
                </Link>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-sm hover:shadow-lg bg-gradient-to-br from-amber-50/50 to-white dark:from-gray-800 dark:to-gray-700 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Link href="/events" className="block">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="h-7 w-7 text-amber-600 dark:text-amber-300" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">View Events</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">See all celebrations</p>
                </Link>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-sm hover:shadow-lg bg-gradient-to-br from-emerald-50/50 to-white dark:from-gray-800 dark:to-gray-700 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Link href="/cards" className="block">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-7 w-7 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">Browse Cards</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Find perfect greetings</p>
                </Link>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-sm hover:shadow-lg bg-gradient-to-br from-blue-50/50 to-white dark:from-gray-800 dark:to-gray-700 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <Link href="/settings" className="block">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="h-7 w-7 text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-1">Settings</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Manage preferences</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Events Timeline */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Celebrations</h2>
              <p className="text-muted-foreground dark:text-gray-300">Stay organized and never miss a special moment</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("timeline")}
                className={viewMode === "timeline" ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg" : "hover:bg-gray-50 dark:hover:bg-gray-800"}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Timeline
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="lg"
                onClick={() => setViewMode("calendar")}
                className={viewMode === "calendar" ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-lg" : "hover:bg-gray-50 dark:hover:bg-gray-800"}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Calendar
              </Button>
            </div>
          </div>

          {viewMode === "timeline" && (
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => {
                const getToneStyling = () => {
                  switch (event.eventTone) {
                    case 'celebratory':
                      return {
                        cardClass: "bg-gradient-to-r from-rose-50/80 to-pink-50/60 dark:from-rose-900/20 dark:to-pink-900/15",
                        borderClass: "bg-gradient-to-b from-rose-400 to-rose-500",
                        opacity: 1
                      }
                    case 'supportive':
                      return {
                        cardClass: "bg-gradient-to-r from-blue-50/60 to-indigo-50/40 dark:from-blue-900/15 dark:to-indigo-900/10",
                        borderClass: "bg-gradient-to-b from-blue-400 to-blue-500",
                        opacity: 0.85
                      }
                    case 'remembrance':
                      return {
                        cardClass: "bg-gradient-to-r from-gray-50/50 to-slate-50/40 dark:from-gray-800/30 dark:to-slate-800/25",
                        borderClass: "bg-gradient-to-b from-gray-400 to-gray-500",
                        opacity: 0.75
                      }
                    case 'practical':
                      return {
                        cardClass: "bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-800 dark:to-gray-700",
                        borderClass: "bg-gradient-to-b from-gray-500 to-gray-600",
                        opacity: 0.9
                      }
                    default:
                      return {
                        cardClass: "bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700",
                        borderClass: "bg-gradient-to-b from-emerald-500 to-emerald-600",
                        opacity: 1
                      }
                  }
                }

                const toneStyling = getToneStyling()

                return (
                  <Card key={event.id} className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 ${toneStyling.cardClass} relative overflow-hidden`} style={{ opacity: toneStyling.opacity }}>
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${toneStyling.borderClass}`}></div>

                    <Link href={`/events/${event.id}`}>
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="relative">
                              <Avatar className={`h-16 w-16 ${
                                event.daysUntil <= 7 ? 'ring-4 ring-rose-100 dark:ring-rose-900' :
                                event.daysUntil <= 14 ? 'ring-4 ring-amber-100 dark:ring-amber-900' :
                                'ring-4 ring-emerald-100 dark:ring-emerald-900'
                              }`}>
                                <AvatarFallback className={`${
                                  event.daysUntil <= 7 ? 'bg-gradient-to-br from-rose-400 to-rose-500' :
                                  event.daysUntil <= 14 ? 'bg-gradient-to-br from-amber-400 to-amber-500' :
                                  'bg-gradient-to-br from-emerald-400 to-emerald-500'
                                } text-white text-lg font-bold`}>
                                  {event.personName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                                event.eventType === 'Birthday' ? 'bg-purple-500' : 'bg-blue-500'
                              }`}>
                                {event.eventType === 'Birthday' ? '🎂' : '💍'}
                              </div>
                            </div>

                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3 flex-wrap">
                                <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                  {event.personName}
                                </h3>
                                <Badge variant="secondary" className={`${
                                  event.eventType === 'Birthday' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' :
                                  'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                }`}>
                                  {event.eventType}
                                </Badge>
                                <Badge variant="outline" className={`${
                                  event.daysUntil <= 7 ? 'border-rose-300 text-rose-600 bg-rose-50 dark:bg-rose-900/20 dark:text-rose-400' :
                                  event.daysUntil <= 14 ? 'border-amber-300 text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400' :
                                  'border-emerald-300 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400'
                                }`}>
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric"
                                  })}
                                </Badge>
                              </div>

                              <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
                                {event.description}
                              </p>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric"
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right space-y-3">
                            <Badge
                              variant="secondary"
                              className={`text-lg px-4 py-2 font-bold ${
                                event.daysUntil <= 7
                                  ? "bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 dark:from-rose-900 dark:to-rose-800 dark:text-rose-300"
                                  : event.daysUntil <= 14
                                  ? "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 dark:from-amber-900 dark:to-amber-800 dark:text-amber-300"
                                  : "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 dark:from-emerald-900 dark:to-emerald-800 dark:text-emerald-300"
                              }`}
                            >
                              {event.daysUntil} days
                            </Badge>

                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                )
              })}
            </div>
          )}

          {viewMode === "calendar" && (
            <Card className="border-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
              <CardContent className="p-12">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="h-10 w-10 text-gray-500 dark:text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Calendar View</h3>
                    <p className="text-muted-foreground dark:text-gray-300 mb-6">Coming soon! We're working on a beautiful calendar interface.</p>
                    <Button
                      onClick={() => setViewMode("timeline")}
                      className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Back to Timeline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
