"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ArrowLeft, Calendar, Gift, MessageSquare, Edit2, Sparkles, ThumbsUp, ThumbsDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventDetailPage() {
  const params = useParams()

  // Mock events data - should match dashboard data in production this would come from database/API
  const mockEvents = [
    {
      id: "1",
      personName: "Sarah Johnson",
      eventType: "Birthday",
      eventTone: "celebratory",
      date: "2025-01-15",
      daysUntil: 15,
      description: "Mom's 65th birthday - planning a family dinner. She loves gardening and mystery novels.",
      relationship: "Mother",
    },
    {
      id: "2",
      personName: "Mark & Lisa",
      eventType: "Anniversary",
      eventTone: "remembrance",
      date: "2025-01-22",
      daysUntil: 22,
      description: "Remembering our beloved grandmother's passing anniversary",
      relationship: "Family",
    },
    {
      id: "3",
      personName: "David Chen",
      eventType: "Birthday",
      eventTone: "practical",
      date: "2025-02-03",
      daysUntil: 34,
      description: "Colleague's birthday - send a card reminder",
      relationship: "Colleague",
    },
    {
      id: "4",
      personName: "John Smith",
      eventType: "Memorial",
      eventTone: "remembrance",
      date: "2025-01-28",
      daysUntil: 28,
      description: "Remembering Dad's passing - family gathering",
      relationship: "Father",
    },
  ]

  // Find the event by ID first to get the tone
  const event = mockEvents.find((e: any) => e.id === params.id) || mockEvents[0]

  // Tone-based styling configuration
  const getToneConfig = () => {
    switch (event.eventTone) {
      case 'celebratory':
        return {
          accentColor: 'rose',
          bgGradient: 'from-rose-50 via-white to-pink-50',
          cardBg: 'from-rose-50/80 to-pink-50/60',
          badgeBg: 'bg-rose-100 text-rose-700 border-rose-200',
          buttonPrimary: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',
          buttonSecondary: 'border-rose-200 text-rose-700 hover:bg-rose-50',
          tabActive: 'data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700',
          allowAnimations: true,
          roundedCorners: true,
          showCards: true,
          showGifts: true,
          messageTone: 'celebratory'
        }
      case 'supportive':
        return {
          accentColor: 'blue',
          bgGradient: 'from-blue-50 via-white to-indigo-50',
          cardBg: 'from-blue-50/60 to-indigo-50/40',
          badgeBg: 'bg-blue-100 text-blue-700 border-blue-200',
          buttonPrimary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
          buttonSecondary: 'border-blue-200 text-blue-700 hover:bg-blue-50',
          tabActive: 'data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700',
          allowAnimations: false,
          roundedCorners: true,
          showCards: true,
          showGifts: false,
          messageTone: 'supportive'
        }
      case 'remembrance':
        return {
          accentColor: 'gray',
          bgGradient: 'from-gray-50 via-white to-slate-50',
          cardBg: 'from-gray-50/50 to-slate-50/40',
          badgeBg: 'bg-gray-100 text-gray-700 border-gray-200',
          buttonPrimary: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700',
          buttonSecondary: 'border-gray-200 text-gray-700 hover:bg-gray-50',
          tabActive: 'data-[state=active]:bg-gray-100 data-[state=active]:text-gray-700',
          allowAnimations: false,
          roundedCorners: false,
          showCards: false,
          showGifts: false,
          messageTone: 'remembrance'
        }
      case 'practical':
        return {
          accentColor: 'emerald',
          bgGradient: 'from-white via-gray-50 to-white',
          cardBg: 'from-white to-gray-50/30',
          badgeBg: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          buttonPrimary: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
          buttonSecondary: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50',
          tabActive: 'data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-700',
          allowAnimations: false,
          roundedCorners: false,
          showCards: true,
          showGifts: true,
          messageTone: 'practical'
        }
      default:
        return {
          accentColor: 'rose',
          bgGradient: 'from-rose-50 via-white to-amber-50',
          cardBg: 'from-rose-50/80 to-pink-50/60',
          badgeBg: 'bg-rose-100 text-rose-700 border-rose-200',
          buttonPrimary: 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700',
          buttonSecondary: 'border-rose-200 text-rose-700 hover:bg-rose-50',
          tabActive: 'data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700',
          allowAnimations: true,
          roundedCorners: true,
          showCards: true,
          showGifts: true,
          messageTone: 'celebratory'
        }
    }
  }

  const toneConfig = getToneConfig()

  // Update message based on tone
  const getToneMessage = () => {
    const baseMessages = {
      celebratory: [
        "Happy 65th Birthday, Sarah! May your special day be filled with joy, laughter, and all the things you love most. Here's to another year of beautiful moments and wonderful memories. Wishing you health, happiness, and lots of love!",
        "Dearest Sarah, Happy 65th Birthday! Your grace, wisdom, and kindness continue to inspire us all. May this year bring you countless moments of joy in your beautiful garden and thrilling mysteries to solve in your favorite novels!"
      ],
      supportive: [
        "Thinking of you during this time. If you'd like to talk or need support, I'm here for you. Take care and be gentle with yourself.",
        "Just wanted to check in and let you know you're in my thoughts. If there's anything you need or want to share, I'm here when you're ready."
      ],
      remembrance: [
        "Remembering our loved one today and always. Their memory continues to bring light to our lives. With gentle thoughts and quiet strength.",
        "On this day of remembrance, we hold our loved one in our hearts. Their spirit lives on through the love they shared with us all."
      ],
      practical: [
        "Just a friendly reminder about the upcoming event. Please let me know if you need any assistance with preparations.",
        "Here's a gentle reminder about the upcoming occasion. Feel free to reach out if you need help with anything."
      ]
    }
    return baseMessages[toneConfig.messageTone as keyof typeof baseMessages] || baseMessages.celebratory
  }

  const toneMessages = getToneMessage()
  const [generatedMessage, setGeneratedMessage] = useState(toneMessages[0])
  const [isEditing, setIsEditing] = useState(false)
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null)

  const suggestedCards = [
    {
      id: "1",
      title: "Floral Birthday Wishes",
      mood: "Cheerful",
      imageUrl: "/elegant-floral-birthday-card-with-pink-roses-and.jpg",
    },
    {
      id: "2",
      title: "Elegant Gold Celebration",
      mood: "Elegant",
      imageUrl: "/elegant-gold-birthday-card-with-geometric-patte.jpg",
    },
    {
      id: "3",
      title: "Warm Family Moments",
      mood: "Heartfelt",
      imageUrl: "/heartfelt-birthday-card-with-watercolor-family.jpg",
    },
    {
      id: "4",
      title: "Garden Paradise",
      mood: "Nature-Inspired",
      imageUrl: "/nature-inspired-birthday-card-with-garden-them.jpg",
    },
  ]

  const giftSuggestions = [
    { id: "1", name: "Gardening Tool Set", budget: "$50-$100", description: "Premium tools for the avid gardener" },
    { id: "2", name: "Mystery Book Collection", budget: "$30-$50", description: "Latest bestselling mystery novels" },
    {
      id: "3",
      name: "Indoor Herb Garden Kit",
      budget: "$40-$60",
      description: "Perfect for growing fresh herbs year-round",
    },
    {
      id: "4",
      name: "Personalized Garden Stone",
      budget: "$25-$40",
      description: "Custom engraved stepping stone",
    },
  ]

  const handleRegenerateMessage = () => {
    // Simulate AI regeneration
    const messages = [
      "Dearest Sarah, Happy 65th Birthday! Your grace, wisdom, and kindness continue to inspire us all. May this year bring you countless moments of joy in your beautiful garden and thrilling mysteries to solve in your favorite novels!",
      "To the most wonderful Mom on her 65th Birthday! Thank you for being our rock, our guide, and our best friend. Here's to celebrating you today and always. May your garden bloom as beautifully as you make our lives!",
    ]
    setGeneratedMessage(messages[Math.floor(Math.random() * messages.length)])
    setFeedback(null)
  }

  const handleFeedback = (type: "like" | "dislike") => {
    setFeedback(type)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${toneConfig.bgGradient} ${toneConfig.allowAnimations ? 'transition-colors duration-500' : ''}`}>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className={`h-6 w-6 text-${toneConfig.accentColor}-500`} fill="currentColor" />
            <span className="text-xl font-semibold">CelebrateMate</span>
          </Link>
          <Button variant="ghost" asChild className={toneConfig.buttonSecondary}>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Event Header */}
        <div className={`mb-8 ${event.eventTone === 'remembrance' ? 'mb-12' : event.eventTone === 'supportive' ? 'mb-10' : 'mb-8'}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <Avatar className={`h-20 w-20 ${toneConfig.allowAnimations ? 'animate-pulse' : ''}`}>
              <AvatarFallback className={`bg-${toneConfig.accentColor}-500 text-white text-3xl ${toneConfig.roundedCorners ? 'rounded-full' : 'rounded-lg'}`}>{event.personName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{event.personName}</h1>
                <Badge variant="outline" className={`border-${toneConfig.accentColor}-200 text-${toneConfig.accentColor}-700`}>{event.eventType}</Badge>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className={`h-4 w-4 text-${toneConfig.accentColor}-500`} />
                  <span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <Badge variant="secondary" className={toneConfig.badgeBg}>
                  {event.daysUntil} days away
                </Badge>
              </div>
              {event.description && (
                <p className={`text-muted-foreground ${event.eventTone === 'remembrance' ? 'text-sm leading-relaxed max-w-2xl' : ''}`}>
                  {event.description}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" className={toneConfig.buttonSecondary}>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Event
            </Button>
          </div>
        </div>

        <Tabs defaultValue="message" className={`space-y-6 ${event.eventTone === 'remembrance' ? 'space-y-8' : event.eventTone === 'supportive' ? 'space-y-7' : 'space-y-6'}`}>
          <TabsList className={`grid w-full ${event.eventTone === 'remembrance' ? 'grid-cols-2' : 'grid-cols-3'} bg-transparent`}>
            <TabsTrigger value="message" className={toneConfig.tabActive}>
              <MessageSquare className="h-4 w-4 mr-2" />
              {event.eventTone === 'remembrance' ? 'Send Message' : 'Message'}
            </TabsTrigger>
            {toneConfig.showCards && (
              <TabsTrigger value="cards" className={toneConfig.tabActive}>
                <Heart className="h-4 w-4 mr-2" />
                {event.eventTone === 'practical' ? 'Prepare Card' : 'Cards'}
              </TabsTrigger>
            )}
            <TabsTrigger value="gifts" className={toneConfig.tabActive}>
              <Gift className="h-4 w-4 mr-2" />
              {event.eventTone === 'remembrance' ? 'Presence' : event.eventTone === 'practical' ? 'Actions' : 'Gifts'}
            </TabsTrigger>
          </TabsList>

          {/* Message Tab */}
          <TabsContent value="message" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      AI-Generated Message
                    </CardTitle>
                    <CardDescription>Personalized greeting based on your event details</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-transparent"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    {isEditing ? "Done" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <Textarea
                    value={generatedMessage}
                    onChange={(e) => setGeneratedMessage(e.target.value)}
                    rows={6}
                    className="text-base leading-relaxed"
                  />
                ) : (
                  <div className={`p-6 bg-gradient-to-br ${toneConfig.cardBg} ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'}`}>
                    <p className={`text-base leading-relaxed text-foreground ${event.eventTone === 'remembrance' ? 'text-sm' : ''}`}>
                      {generatedMessage}
                    </p>
                  </div>
                )}

                {/* Feedback & Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">How's this message?</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback("like")}
                      className={feedback === "like" ? "text-emerald-600" : ""}
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFeedback("dislike")}
                      className={feedback === "dislike" ? "text-rose-600" : ""}
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" onClick={handleRegenerateMessage} className="bg-transparent">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Tab */}
          {toneConfig.showCards && (
            <TabsContent value="cards" className="space-y-6">
              <Card className={`bg-gradient-to-br ${toneConfig.cardBg} ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'}`}>
                <CardHeader>
                  <CardTitle className={`text-${toneConfig.accentColor}-800`}>
                    {event.eventTone === 'practical' ? 'Card Preparation' : 'Suggested Greeting Cards'}
                  </CardTitle>
                  <CardDescription>
                    {event.eventTone === 'practical'
                      ? 'Tools and templates to help you prepare your card'
                      : 'Curated cards that match the mood and occasion'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {suggestedCards.slice(0, event.eventTone === 'practical' ? 2 : 4).map((card) => (
                      <Link
                        key={card.id}
                        href={`/cards/${card.id}`}
                        className={`group block border ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'} overflow-hidden hover:shadow-lg transition-all duration-300 ${toneConfig.allowAnimations ? 'hover:scale-105' : ''}`}
                      >
                        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                          <img
                            src={card.imageUrl || "/placeholder.svg"}
                            alt={card.title}
                            className={`w-full h-full object-cover ${toneConfig.allowAnimations ? 'group-hover:scale-105' : ''} transition-transform duration-300`}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1">{card.title}</h3>
                          <Badge variant="secondary" className={`text-xs bg-${toneConfig.accentColor}-100 text-${toneConfig.accentColor}-700`}>
                            {card.mood}
                          </Badge>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Button variant="outline" className={`w-full mt-6 ${toneConfig.buttonSecondary}`} asChild>
                    <Link href="/cards">
                      {event.eventTone === 'practical' ? 'Browse Card Templates' : 'Browse All Cards'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Gifts/Presence/Actions Tab */}
          <TabsContent value="gifts" className="space-y-6">
            <Card className={`bg-gradient-to-br ${toneConfig.cardBg} ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'}`}>
              <CardHeader>
                <CardTitle className={`text-${toneConfig.accentColor}-800`}>
                  {event.eventTone === 'remembrance' ? 'Presence & Support' :
                   event.eventTone === 'practical' ? 'Next Actions' :
                   'Gift Suggestions'}
                </CardTitle>
                <CardDescription>
                  {event.eventTone === 'remembrance'
                    ? 'Ways to show your care and remembrance'
                    : event.eventTone === 'practical'
                    ? 'Practical steps and reminders for the event'
                    : 'Thoughtful gift ideas based on interests and budget'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {event.eventTone === 'remembrance' ? (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-${toneConfig.accentColor}-100 rounded-full mb-4`}>
                        <Heart className={`h-8 w-8 text-${toneConfig.accentColor}-600`} />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Your Presence Matters</h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Sometimes the most meaningful way to honor someone is simply by being present and sharing in their memory.
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className={`p-4 border ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'} bg-white/50`}>
                        <h4 className="font-medium mb-2">📞 Reach Out</h4>
                        <p className="text-sm text-muted-foreground">A simple call or message can mean the world</p>
                      </div>
                      <div className={`p-4 border ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'} bg-white/50`}>
                        <h4 className="font-medium mb-2">🤝 Be Present</h4>
                        <p className="text-sm text-muted-foreground">Sometimes just being there is the greatest gift</p>
                      </div>
                    </div>
                  </div>
                ) : event.eventTone === 'practical' ? (
                  <div className="space-y-3">
                    <div className={`flex items-start gap-4 p-4 border ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'} hover:bg-muted/50 transition-colors`}>
                      <div className={`flex items-center justify-center w-12 h-12 bg-${toneConfig.accentColor}-100 text-${toneConfig.accentColor}-600 flex-shrink-0 ${toneConfig.roundedCorners ? 'rounded-full' : 'rounded-md'}`}>
                        📅
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Set Reminder</h3>
                        <p className="text-sm text-muted-foreground">Schedule a calendar reminder for the event</p>
                      </div>
                    </div>
                    <div className={`flex items-start gap-4 p-4 border ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'} hover:bg-muted/50 transition-colors`}>
                      <div className={`flex items-center justify-center w-12 h-12 bg-${toneConfig.accentColor}-100 text-${toneConfig.accentColor}-600 flex-shrink-0 ${toneConfig.roundedCorners ? 'rounded-full' : 'rounded-md'}`}>
                        ✉️
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">Prepare Message</h3>
                        <p className="text-sm text-muted-foreground">Draft your card or message in advance</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {giftSuggestions.map((gift) => (
                      <div
                        key={gift.id}
                        className={`flex items-start gap-4 p-4 border ${toneConfig.roundedCorners ? 'rounded-lg' : 'rounded-md'} hover:bg-muted/50 transition-colors`}
                      >
                        <div className={`flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 flex-shrink-0 ${toneConfig.roundedCorners ? 'rounded-full' : 'rounded-md'}`}>
                          <Gift className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-semibold">{gift.name}</h3>
                            <Badge variant="outline" className="text-xs whitespace-nowrap ml-2">
                              {gift.budget}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{gift.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
