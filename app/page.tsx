import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Calendar, Sparkles, Gift, Star, Users, CheckCircle, ArrowRight, Play } from "lucide-react"
import Navbar from "@/components/navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-stone-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10"></div>

        {/* Subtle background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-rose-100/20 dark:bg-rose-900/20 rounded-full blur-2xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-amber-100/15 dark:bg-amber-900/15 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-100/10 dark:bg-purple-900/10 rounded-full blur-xl animate-pulse-slow animation-delay-2000"></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-rose-200/30 dark:border-rose-800/30 rotate-45 animate-pulse-slow animation-delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-emerald-100/20 to-teal-100/20 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg rotate-12 animate-pulse-slow animation-delay-1500"></div>
        <div className="absolute top-2/3 right-10 w-12 h-12 border-2 border-amber-200/40 dark:border-amber-800/40 rounded-full animate-pulse-slow animation-delay-800"></div>

        {/* Decorative dots */}
        <div className="absolute top-16 right-16 w-2 h-2 bg-rose-300 dark:bg-rose-700 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-amber-300 dark:bg-amber-700 rounded-full animate-pulse-slow animation-delay-1000"></div>
        <div className="absolute top-1/4 right-8 w-1 h-1 bg-purple-300 dark:bg-purple-700 rounded-full animate-pulse-slow animation-delay-2000"></div>

        {/* Celebration elements */}
        <div className="absolute top-1/6 left-1/4 text-rose-300/30 dark:text-rose-700/30 text-2xl animate-pulse-slow animation-delay-800">🎂</div>
        <div className="absolute bottom-1/4 right-1/3 text-amber-300/40 dark:text-amber-700/40 text-xl animate-pulse-slow animation-delay-1200">🎈</div>
        <div className="absolute top-2/3 left-1/6 text-purple-300/30 dark:text-purple-700/30 text-lg animate-pulse-slow animation-delay-1800">🎉</div>
        <div className="absolute bottom-1/6 right-1/4 text-pink-300/35 dark:text-pink-700/35 text-xl animate-pulse-slow animation-delay-600">🎁</div>
        <div className="absolute top-1/3 right-1/6 text-yellow-300/30 dark:text-yellow-700/30 text-lg animate-pulse-slow animation-delay-1400">⭐</div>
        <div className="absolute top-1/2 left-2/3 text-orange-300/40 dark:text-orange-700/40 text-xl animate-pulse-slow animation-delay-1600">🥳</div>

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-amber-100 dark:from-rose-900/50 dark:to-amber-900/50 rounded-full text-sm font-medium text-rose-700 dark:text-rose-300 mb-4 border border-rose-200/50 dark:border-rose-800/50">
            <Star className="h-4 w-4" />
            Remembering people, not dates
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance leading-tight bg-gradient-to-r from-gray-900 via-rose-600 to-amber-600 dark:from-gray-100 dark:via-rose-400 dark:to-amber-400 bg-clip-text text-transparent">
            Never miss a moment that matters
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-pretty leading-relaxed max-w-2xl mx-auto">
            CelebrateMate transforms the way you celebrate. Get intelligent reminders, personalized AI messages,
            and thoughtful gift suggestions—all in one beautiful app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/auth">
              <Button size="lg" className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 dark:from-rose-600 dark:to-amber-600 dark:hover:from-rose-700 dark:hover:to-amber-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                <Sparkles className="h-5 w-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600 dark:text-gray-300 transition-all duration-300">
              <Play className="h-5 w-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="pt-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Trusted by over 10,000+ happy users</p>
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 dark:from-rose-500 dark:to-amber-500 border-2 border-white dark:border-gray-800"></div>
                  ))}
                </div>
                <div className="ml-3">
                  <div className="flex text-amber-400 dark:text-amber-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4.9/5 from 2,500+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="max-w-6xl mx-auto mt-20 relative">
          {/* Browser frame */}
          <div className="bg-gray-900 rounded-t-2xl p-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-center">
                <span className="text-gray-400 text-sm">dashboard.celebratemate.app</span>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center">
                  <ArrowRight className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard screenshot placeholder */}
          <div className="relative rounded-b-2xl overflow-hidden shadow-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-gray-100 min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-400 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="h-8 w-8 text-white" fill="currentColor" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
                <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200/50">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>3 upcoming events</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200/50">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>AI messages ready</span>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full px-6 py-2 shadow-lg border-2 border-white">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle className="h-4 w-4" />
              Live Dashboard Preview
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-rose-600 dark:from-gray-100 dark:to-rose-400 bg-clip-text text-transparent">
              Everything you need to celebrate better
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From smart reminders to personalized messages, CelebrateMate handles the details so you can focus on what matters most.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-rose-50 via-white to-rose-25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-400 via-rose-500 to-pink-500 text-white mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110">
                  <Calendar className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-rose-800 bg-clip-text text-transparent">Smart Reminders</h3>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  Intelligent notifications that adapt to your schedule. Never miss an important date again with customizable alerts and smart timing.
                </p>
                <ul className="text-left space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Customizable reminder schedules
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Multiple notification channels
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Smart timing based on your habits
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-amber-50 via-white to-amber-25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">AI-Powered Messages</h3>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  Generate heartfelt, personalized messages in seconds. Our AI understands relationships and creates messages that truly resonate.
                </p>
                <ul className="text-left space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Relationship-aware messaging
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Multiple tones and styles
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Instant generation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-8 text-center relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500 text-white mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110">
                  <Gift className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">Gift Intelligence</h3>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  Get personalized gift recommendations based on relationships, interests, and occasions. Never be stuck wondering what to get.
                </p>
                <ul className="text-left space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Personalized recommendations
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Price range filtering
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                    Occasion-specific suggestions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-rose-50/30 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">How CelebrateMate works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Getting started is simple. Here's how thousands of users are celebrating better every day.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 dark:from-rose-600 dark:to-rose-700 text-white text-2xl font-bold mb-6 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Add Your People</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create profiles for the important people in your life. Add birthdays, anniversaries, and relationship details.
                </p>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-rose-300 to-transparent dark:from-rose-700 dark:to-transparent transform translate-x-4"></div>
              </div>

              {/* Step 2 */}
              <div className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white text-2xl font-bold mb-6 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Get Smart Reminders</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Receive timely notifications and never miss a celebration. Customize when and how you want to be reminded.
                </p>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-amber-300 to-transparent dark:from-amber-700 dark:to-transparent transform translate-x-4"></div>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white text-2xl font-bold mb-6 shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Celebrate with Style</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use AI-generated messages and gift suggestions to make every celebration memorable and personal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Loved by thousands</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              See what our community has to say about CelebrateMate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-white dark:from-gray-800 dark:to-gray-700 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="flex text-amber-400 dark:text-amber-300 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-6 italic">
                  "CelebrateMate completely changed how I stay connected with my family. The AI messages are incredibly thoughtful and save me so much time!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 dark:from-rose-500 dark:to-amber-500"></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Sarah Chen</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-700 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="flex text-amber-400 dark:text-amber-300 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-6 italic">
                  "The gift suggestions are spot-on! I've never been more confident in my gift-giving. My relationships have never been stronger."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-emerald-400 dark:from-amber-500 dark:to-emerald-500"></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Marcus Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Small Business Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-white dark:from-gray-800 dark:to-gray-700 dark:border-gray-700">
              <CardContent className="p-8">
                <div className="flex text-amber-400 dark:text-amber-300 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-200 mb-6 italic">
                  "As a busy professional, I was forgetting important dates constantly. CelebrateMate solved that problem completely. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-rose-400 dark:from-emerald-500 dark:to-rose-500"></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Emily Rodriguez</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-rose-500 via-rose-600 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-balance">
              Ready to never miss another special moment?
            </h2>
            <p className="text-xl text-rose-100 dark:text-rose-200">
              Join thousands of people who are celebrating better with CelebrateMate
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/auth">
                <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-50 dark:bg-gray-900 dark:text-rose-400 dark:hover:bg-gray-800 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Start Celebrating Today
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-rose-600 hover:shadow-xl dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-0.5">
                <Users className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
            <p className="text-rose-200 dark:text-rose-300 text-sm mt-6">
              Free forever. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-rose-400" fill="currentColor" />
                <span className="text-xl font-bold">CelebrateMate</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Making celebrations effortless with smart reminders, AI-powered messages, and thoughtful gift suggestions.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Instagram
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Updates</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 CelebrateMate. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with ❤️ for better celebrations
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
