"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Download, Share2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CardDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [isSelected, setIsSelected] = useState(false)

  // Mock card data
  const card = {
    id: params.id,
    title: "Floral Birthday Wishes",
    mood: "Cheerful",
    occasion: "Birthday",
    description: "A beautiful floral design perfect for celebrating birthdays with warmth and joy",
    imageUrl: "/elegant-floral-birthday-card-with-pink-roses-and.jpg",
  }

  const handleSelect = () => {
    setIsSelected(true)
    toast({
      title: "Card selected!",
      description: "This card has been added to your event",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Downloading card...",
      description: "Your card will be downloaded shortly",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share link copied!",
      description: "Card link has been copied to clipboard",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
            <span className="text-xl font-semibold">CelebrateMate</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/cards">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div>
            <Card className="overflow-hidden border-2 shadow-xl sticky top-24">
              <div className="aspect-[3/4] bg-muted">
                <img
                  src={card.imageUrl || "/placeholder.svg"}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Card Details */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                <Badge variant="secondary" className="bg-rose-100 text-rose-700 border-rose-200">
                  {card.mood}
                </Badge>
                <Badge variant="outline">{card.occasion}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-3">{card.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{card.description}</p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleSelect}
                className="w-full bg-rose-500 hover:bg-rose-600"
                size="lg"
                disabled={isSelected}
              >
                {isSelected ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Selected
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Select This Card
                  </>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleDownload} className="bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" onClick={handleShare} className="bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Card Info */}
            <Card className="bg-muted/50">
              <CardContent className="p-6 space-y-3">
                <div>
                  <h3 className="font-semibold mb-1">Perfect for</h3>
                  <p className="text-sm text-muted-foreground">
                    Birthdays, celebrations, and anyone who loves flowers and cheerful designs
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Message style</h3>
                  <p className="text-sm text-muted-foreground">Warm, joyful, and heartfelt greetings</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Customization</h3>
                  <p className="text-sm text-muted-foreground">Add your personal message inside the card</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
