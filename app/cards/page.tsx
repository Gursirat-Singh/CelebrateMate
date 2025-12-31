"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Search } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"

interface GreetingCard {
  id: string
  title: string
  mood: string
  imageUrl: string
  occasion: string
}

export default function CardsGalleryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMood, setSelectedMood] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 9

  // Check if accessed from a remembrance event (would be passed via URL params in real app)
  const isRemembranceContext = false // This would be determined by event context

  // Available images to reuse
  const availableImages = [
    "/elegant-floral-birthday-card-with-pink-roses-and.jpg",
    "/cheerful-birthday-card-with-colorful-confetti.jpg",
    "/elegant-gold-birthday-card-with-geometric-patte.jpg",
    "/heartfelt-birthday-card-with-watercolor-family.jpg",
    "/nature-inspired-birthday-card-with-garden-them.jpg",
    "/modern-minimalist-birthday-card-with-geometric.jpg",
    "/romantic-anniversary-card-with-intertwined-gold.jpg",
    "/vintage-romantic-anniversary-card-with-antique.jpg",
    "/elegant-anniversary-card-with-silver-accents-a.jpg",
    "/placeholder.jpg"
  ]

  const cards: GreetingCard[] = [
    // Page 1
    { id: "1", title: "Floral Birthday Wishes", mood: "Cheerful", occasion: "Birthday", imageUrl: availableImages[0] },
    { id: "2", title: "Joyful Celebration", mood: "Cheerful", occasion: "Birthday", imageUrl: availableImages[1] },
    { id: "3", title: "Elegant Gold Celebration", mood: "Elegant", occasion: "Birthday", imageUrl: availableImages[2] },
    { id: "4", title: "Warm Family Moments", mood: "Heartfelt", occasion: "Birthday", imageUrl: availableImages[3] },
    { id: "5", title: "Garden Paradise", mood: "Nature-Inspired", occasion: "Birthday", imageUrl: availableImages[4] },
    { id: "6", title: "Modern Minimalist", mood: "Modern", occasion: "Birthday", imageUrl: availableImages[5] },
    { id: "7", title: "Romantic Anniversary", mood: "Romantic", occasion: "Anniversary", imageUrl: availableImages[6] },
    { id: "8", title: "Vintage Love Letter", mood: "Romantic", occasion: "Anniversary", imageUrl: availableImages[7] },
    { id: "9", title: "Graceful Wishes", mood: "Elegant", occasion: "Anniversary", imageUrl: availableImages[8] },

    // Page 2
    { id: "10", title: "Sunshine & Smiles", mood: "Cheerful", occasion: "Birthday", imageUrl: availableImages[1] },
    { id: "11", title: "Rainbow Dreams", mood: "Cheerful", occasion: "Birthday", imageUrl: availableImages[0] },
    { id: "12", title: "Sophisticated Grace", mood: "Elegant", occasion: "Birthday", imageUrl: availableImages[2] },
    { id: "13", title: "Love & Gratitude", mood: "Heartfelt", occasion: "Birthday", imageUrl: availableImages[3] },
    { id: "14", title: "Forest Whispers", mood: "Nature-Inspired", occasion: "Birthday", imageUrl: availableImages[4] },
    { id: "15", title: "Contemporary Style", mood: "Modern", occasion: "Birthday", imageUrl: availableImages[5] },
    { id: "16", title: "Forever Together", mood: "Heartfelt", occasion: "Anniversary", imageUrl: availableImages[6] },
    { id: "17", title: "Golden Memories", mood: "Elegant", occasion: "Anniversary", imageUrl: availableImages[7] },
    { id: "18", title: "Love Story", mood: "Romantic", occasion: "Anniversary", imageUrl: availableImages[8] },

    // Page 3
    { id: "19", title: "Party Time Fun", mood: "Cheerful", occasion: "Birthday", imageUrl: availableImages[1] },
    { id: "20", title: "Happy Vibes Only", mood: "Cheerful", occasion: "Birthday", imageUrl: availableImages[0] },
    { id: "21", title: "Timeless Elegance", mood: "Elegant", occasion: "Birthday", imageUrl: availableImages[2] },
    { id: "22", title: "Cherished Memories", mood: "Heartfelt", occasion: "Birthday", imageUrl: availableImages[3] },
    { id: "23", title: "Ocean Breeze", mood: "Nature-Inspired", occasion: "Birthday", imageUrl: availableImages[4] },
    { id: "24", title: "Clean & Simple", mood: "Modern", occasion: "Birthday", imageUrl: availableImages[5] },
    { id: "25", title: "Anniversary Bliss", mood: "Cheerful", occasion: "Anniversary", imageUrl: availableImages[6] },
    { id: "26", title: "Eternal Flame", mood: "Romantic", occasion: "Anniversary", imageUrl: availableImages[7] },
    { id: "27", title: "Love's Journey", mood: "Elegant", occasion: "Anniversary", imageUrl: availableImages[8] },
  ]

  const moods = ["all", "Cheerful", "Elegant", "Heartfelt", "Romantic", "Modern", "Nature-Inspired"]

  const filteredCards = cards.filter((card) => {
    const matchesMood = selectedMood === "all" || card.mood === selectedMood
    const matchesSearch =
      searchQuery === "" ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.occasion.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesMood && matchesSearch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage)
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const currentCards = filteredCards.slice(startIndex, endIndex)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      scrollToCards()
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      scrollToCards()
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    scrollToCards()
  }

  const scrollToCards = () => {
    const cardsSection = document.getElementById('cards-section')
    if (cardsSection) {
      cardsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Show remembrance message if accessed from remembrance context
  if (isRemembranceContext) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navbar />

        <main className="w-full px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900/30 dark:to-gray-800/30 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">🕊️ Remembrance Event</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-light text-gray-800 dark:text-white mb-6 leading-tight">
              Cards are not available for <span className="bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent font-medium">remembrance events</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              For events focused on remembrance and loss, we prioritize respectful communication and presence over celebratory elements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700">
                <Link href="/events/new">Create Different Event</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 px-8">
          <div className="max-w-6xl mx-auto">
            {/* Background Elements */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-rose-100/20 dark:bg-rose-900/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-100/15 dark:bg-amber-900/8 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>

            <div className="relative z-10 text-center mb-12">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-800/30 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-2">
                  <span className="text-sm font-medium text-rose-600 dark:text-rose-400">🎨 Card Gallery</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-light text-gray-800 dark:text-white mb-6 leading-tight">
                Find the Perfect <span className="bg-gradient-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent font-medium">Greeting Card</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Discover beautiful, heartfelt greeting cards for every occasion. From birthdays to anniversaries,
                express your emotions with cards that truly resonate.
              </p>

              {/* Quick Stats */}
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Unique Designs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">6</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Occasions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Mood Themes</div>
                </div>
              </div>
            </div>

            {/* Featured Categories Preview */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/20 dark:to-rose-800/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🎂</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Birthdays</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Celebrate life's milestones</p>
              </div>

              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">💕</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Anniversaries</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Honor lasting love</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Celebrations</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Mark every special moment</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-12 px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search cards by occasion, mood, or theme..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 focus:border-rose-300 dark:focus:border-rose-600 shadow-lg"
                />
              </div>
            </div>

            {/* Mood Filters */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Browse by Mood</h2>
                <p className="text-gray-600 dark:text-gray-400">Find cards that match your emotional tone</p>
              </div>

              <Tabs value={selectedMood} onValueChange={setSelectedMood}>
                <TabsList className="bg-gray-100 dark:bg-gray-700 h-auto p-2 flex-wrap justify-center gap-2 rounded-2xl">
                  {moods.map((mood) => (
                    <TabsTrigger
                      key={mood}
                      value={mood}
                      className="rounded-xl px-6 py-3 text-sm font-medium data-[state=active]:bg-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-600 capitalize"
                    >
                      {mood === "all" ? "🎨 All Cards" : `${mood === "Cheerful" ? "😊" : mood === "Elegant" ? "✨" : mood === "Heartfelt" ? "💝" : mood === "Romantic" ? "💕" : mood === "Modern" ? "🎭" : "🌿"} ${mood}`}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
                  {selectedMood === "all" ? "All Greeting Cards" : `${selectedMood} Cards`}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredCards.length} {filteredCards.length === 1 ? "card" : "cards"}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
                <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Gallery Section */}
        <section id="cards-section" className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Cards Grid */}
            {currentCards.length > 0 ? (
              <div className="grid grid-cols-3 gap-8">
            {currentCards.map((card) => (
              <Link key={card.id} href={`/cards/${card.id}`} className="group h-full">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 relative h-full flex flex-col">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-lg"></div>

                  {/* Card image */}
                  <div className="aspect-[4/5] relative overflow-hidden flex-shrink-0">
                    <img
                      src={card.imageUrl || "/placeholder.svg"}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs font-medium px-2 py-1 shadow-lg backdrop-blur-sm ${
                          card.mood === 'Cheerful' ? 'bg-yellow-500/90 text-white' :
                          card.mood === 'Elegant' ? 'bg-purple-500/90 text-white' :
                          card.mood === 'Heartfelt' ? 'bg-rose-500/90 text-white' :
                          card.mood === 'Romantic' ? 'bg-pink-500/90 text-white' :
                          card.mood === 'Modern' ? 'bg-gray-500/90 text-white' :
                          card.mood === 'Nature-Inspired' ? 'bg-green-500/90 text-white' :
                          'bg-blue-500/90 text-white'
                        }`}
                      >
                        {card.mood}
                      </Badge>
                    </div>

                    {/* Favorite button */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg"
                        onClick={(e) => {
                          e.preventDefault()
                          // Handle favorite toggle
                        }}
                      >
                        <Heart className="h-4 w-4 text-gray-600 hover:text-rose-500 transition-colors" />
                      </Button>
                    </div>

                    {/* Bottom gradient overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </div>

                  {/* Card content */}
                  <CardContent className="p-6 relative z-10 flex-1 flex flex-col justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-300 line-clamp-2">
                        {card.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-2 h-2 rounded-full ${
                          card.occasion === 'Birthday' ? 'bg-blue-500' :
                          card.occasion === 'Anniversary' ? 'bg-rose-500' :
                          'bg-purple-500'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {card.occasion}
                        </span>
                      </div>
                    </div>

                    {/* Card actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>✨</span>
                        <span>{card.mood.toLowerCase()}</span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 px-3"
                      >
                        Preview →
                      </Button>
                    </div>
                  </CardContent>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-rose-300 dark:group-hover:ring-rose-600 transition-all duration-300 pointer-events-none"></div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
            <CardContent className="p-16 text-center">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Heart className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No cards found</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or browse different mood categories
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {moods.slice(1, 5).map((mood) => (
                  <Button
                    key={mood}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMood(mood)}
                    className="hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-900/20"
                  >
                    {mood}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-12 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-900/20 disabled:opacity-50"
                  >
                    ← Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                      if (pageNumber > totalPages) return null

                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNumber)}
                          className={
                            currentPage === pageNumber
                              ? "bg-rose-500 hover:bg-rose-600 text-white"
                              : "hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-900/20"
                          }
                        >
                          {pageNumber}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-900/20 disabled:opacity-50"
                  >
                    Next →
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
