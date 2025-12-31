"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, Users, Edit, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

interface Event {
  id: string
  personName: string
  eventType: string
  date: string
  daysUntil: number
  description?: string
  relationship?: string
}

export default function EventsPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [viewMode, setViewMode] = useState<"upcoming" | "past" | "all">("upcoming")

  // Mock events data
  const allEvents: Event[] = [
    {
      id: "1",
      personName: "Sarah Johnson",
      eventType: "Birthday",
      date: "2025-01-15",
      daysUntil: 15,
      description: "Mom's 65th birthday - planning a family dinner",
      relationship: "Mother",
    },
    {
      id: "2",
      personName: "Mark & Lisa",
      eventType: "Anniversary",
      date: "2025-01-22",
      daysUntil: 22,
      description: "Best friends' 10th wedding anniversary",
      relationship: "Friends",
    },
    {
      id: "3",
      personName: "David Chen",
      eventType: "Birthday",
      date: "2025-02-03",
      daysUntil: 34,
      description: "Colleague's birthday",
      relationship: "Colleague",
    },
    {
      id: "4",
      personName: "Emma Williams",
      eventType: "Birthday",
      date: "2025-02-14",
      daysUntil: 45,
      description: "Sister's birthday - Valentine's Day baby",
      relationship: "Sister",
    },
    {
      id: "5",
      personName: "John Smith",
      eventType: "Birthday",
      date: "2024-12-20",
      daysUntil: -11,
      description: "Father's birthday - already celebrated",
      relationship: "Father",
    },
    {
      id: "6",
      personName: "Alice & Bob",
      eventType: "Anniversary",
      date: "2024-11-15",
      daysUntil: -47,
      description: "Parents' 25th wedding anniversary",
      relationship: "Parents",
    },
  ]

  useEffect(() => {
    const storedUser = localStorage.getItem("celebratemate_user")
    if (!storedUser) {
      router.push("/auth")
    } else {
      setUser(JSON.parse(storedUser))
    }
  }, [router])

  const getFilteredEvents = () => {
    const today = new Date()
    const currentDate = today.toISOString().split('T')[0]

    switch (viewMode) {
      case "upcoming":
        return allEvents.filter(event => event.date >= currentDate)
      case "past":
        return allEvents.filter(event => event.date < currentDate)
      case "all":
      default:
        return allEvents
    }
  }

  const filteredEvents = getFilteredEvents()
  const upcomingCount = allEvents.filter(event => event.date >= new Date().toISOString().split('T')[0]).length

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Events</h1>
              <p className="text-muted-foreground">
                Manage all your celebrations and special moments
              </p>
            </div>
            <Button asChild className="bg-rose-500 hover:bg-rose-600">
              <Link href="/events/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingCount}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{allEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {allEvents.filter(event => event.eventType === "Birthday").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Birthdays</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Events</CardTitle>
                <CardDescription>
                  {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
                </CardDescription>
              </div>
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-rose-100 text-rose-700">
                          {event.personName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{event.personName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {event.eventType}
                          </Badge>
                          {event.daysUntil > 0 && event.daysUntil <= 7 && (
                            <Badge variant="secondary" className="bg-rose-100 text-rose-700 border-rose-200">
                              Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {event.relationship && `${event.relationship} • `}
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        {event.description && (
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {event.daysUntil >= 0 ? (
                        <Badge
                          variant="secondary"
                          className={`${
                            event.daysUntil <= 7
                              ? "bg-rose-100 text-rose-700 border-rose-200"
                              : "bg-amber-100 text-amber-700 border-amber-200"
                          } whitespace-nowrap`}
                        >
                          {event.daysUntil === 0 ? "Today" : `${event.daysUntil} days`}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="whitespace-nowrap">
                          {Math.abs(event.daysUntil)} days ago
                        </Badge>
                      )}

                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/events/${event.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No events found</p>
                <p className="text-muted-foreground mb-4">
                  {viewMode === "upcoming"
                    ? "You have no upcoming events. Add one to get started!"
                    : viewMode === "past"
                    ? "No past events to show"
                    : "You haven't added any events yet"}
                </p>
                <Button asChild className="bg-rose-500 hover:bg-rose-600">
                  <Link href="/events/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Event
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
