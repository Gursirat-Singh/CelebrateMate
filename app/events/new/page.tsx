"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, ArrowLeft, Calendar, User, FileText, Bell, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Step = 1 | 2 | 3 | 4 | 5

type EventTone = 'celebratory' | 'supportive' | 'remembrance' | 'practical'

export default function NewEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState<Step>(1)

  // Form state
  const [eventType, setEventType] = useState("")
  const [eventTone, setEventTone] = useState<EventTone | "">("")
  const [personName, setPersonName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [description, setDescription] = useState("")
  const [reminderDays, setReminderDays] = useState("7")

  const steps = [
    { number: 1, title: "Event Type", icon: Calendar },
    { number: 2, title: "Tone", icon: Heart },
    { number: 3, title: "Person Details", icon: User },
    { number: 4, title: "Description", icon: FileText },
    { number: 5, title: "Reminders", icon: Bell },
  ]

  const handleNext = () => {
    if (currentStep === 1 && !eventType) {
      toast({
        title: "Please select an event type",
        variant: "destructive",
      })
      return
    }
    if (currentStep === 2 && !eventTone) {
      toast({
        title: "Please select an event tone",
        variant: "destructive",
      })
      return
    }
    if (currentStep === 3 && (!personName || !eventDate)) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleSubmit = () => {
    // Save event to localStorage
    const events = JSON.parse(localStorage.getItem("celebratemate_events") || "[]")
    const newEvent = {
      id: Math.random().toString(36).substring(7),
      eventType,
      eventTone,
      personName,
      date: eventDate,
      description,
      reminderDays: Number.parseInt(reminderDays),
      createdAt: new Date().toISOString(),
    }
    events.push(newEvent)
    localStorage.setItem("celebratemate_events", JSON.stringify(events))

    toast({
      title: "Event created successfully!",
      description: `We'll remind you ${reminderDays} days before ${personName}'s ${eventType.toLowerCase()}`,
    })

    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
            <span className="text-xl font-semibold">CelebrateMate</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                      currentStep >= step.number
                        ? "bg-rose-500 border-rose-500 text-white"
                        : currentStep > step.number
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-white border-border text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={`text-xs font-medium hidden sm:block ${
                      currentStep >= step.number ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors ${
                      currentStep > step.number ? "bg-rose-500" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentStep === 1 && "What are you celebrating?"}
              {currentStep === 2 && "Choose the right tone"}
              {currentStep === 3 && "Tell us about them"}
              {currentStep === 4 && "Add some context"}
              {currentStep === 5 && "Set up reminders"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Select the type of event you want to remember"}
              {currentStep === 2 && "This helps us adapt the experience to match your emotional needs"}
              {currentStep === 3 && "Who is this celebration for?"}
              {currentStep === 4 && "Help us personalize messages and suggestions (optional)"}
              {currentStep === 5 && "When would you like to be reminded?"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Event Type */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <RadioGroup value={eventType} onValueChange={setEventType}>
                  <div className="space-y-3">
                    {["Birthday", "Anniversary", "Wedding", "Graduation", "Other"].map((type) => (
                      <div
                        key={type}
                        className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                          eventType === type ? "border-rose-500 bg-rose-50" : "border-border hover:border-rose-200"
                        }`}
                        onClick={() => setEventType(type)}
                      >
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="flex-1 cursor-pointer font-medium">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 2: Tone Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <RadioGroup value={eventTone} onValueChange={(value) => setEventTone(value as EventTone)}>
                  <div className="space-y-3">
                    {[
                      {
                        value: "celebratory",
                        label: "Celebratory",
                        description: "Birthdays, anniversaries, achievements - warm and uplifting",
                        icon: "🎉"
                      },
                      {
                        value: "supportive",
                        label: "Supportive",
                        description: "Difficult periods, check-in moments - gentle and reassuring",
                        icon: "🤝"
                      },
                      {
                        value: "remembrance",
                        label: "Remembrance",
                        description: "Loss anniversaries, memorials - respectful and calm",
                        icon: "🕊️"
                      },
                      {
                        value: "practical",
                        label: "Practical",
                        description: "Neutral reminders, tasks - clean and efficient",
                        icon: "📋"
                      }
                    ].map((tone) => (
                      <div
                        key={tone.value}
                        className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                          eventTone === tone.value ? "border-rose-500 bg-rose-50" : "border-border hover:border-rose-200"
                        }`}
                        onClick={() => setEventTone(tone.value as EventTone)}
                      >
                        <RadioGroupItem value={tone.value} id={tone.value} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={tone.value} className="flex items-center gap-2 cursor-pointer font-medium">
                            <span className="text-lg">{tone.icon}</span>
                            {tone.label}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">{tone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 3: Person Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="personName">Person's Name *</Label>
                  <Input
                    id="personName"
                    placeholder="e.g., Sarah Johnson"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Description */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="e.g., Mom's 65th birthday - planning a family dinner. She loves gardening and mystery novels."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add details like relationship, interests, or plans to help generate more personalized messages
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Reminders */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reminderDays">Remind me before the event</Label>
                  <Select value={reminderDays} onValueChange={setReminderDays}>
                    <SelectTrigger id="reminderDays">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day before</SelectItem>
                      <SelectItem value="3">3 days before</SelectItem>
                      <SelectItem value="7">1 week before</SelectItem>
                      <SelectItem value="14">2 weeks before</SelectItem>
                      <SelectItem value="30">1 month before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary */}
                <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
                  <p className="font-semibold text-sm text-muted-foreground">Summary</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Event:</span> {personName}'s {eventType}
                    </p>
                    <p>
                      <span className="font-medium">Tone:</span>{" "}
                      {eventTone === "celebratory" && "🎉 Celebratory"}
                      {eventTone === "supportive" && "🤝 Supportive"}
                      {eventTone === "remembrance" && "🕊️ Remembrance"}
                      {eventTone === "practical" && "📋 Practical"}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(eventDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Reminder:</span> {reminderDays} days before
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                  Back
                </Button>
              )}
              {currentStep < 5 ? (
                <Button onClick={handleNext} className="flex-1 bg-rose-500 hover:bg-rose-600">
                  Continue
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="flex-1 bg-rose-500 hover:bg-rose-600">
                  Create Event
                </Button>
              )}
            </div>

            {/* Progress indicator */}
            <p className="text-center text-xs text-muted-foreground mt-4">
              Step {currentStep} of 5 • Under 60 seconds to complete
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
