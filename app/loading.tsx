"use client"

import { useState, useEffect } from "react"

export default function Loading() {
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    // Show loader after a brief delay to prevent flash
    const showTimer = setTimeout(() => setShowLoader(true), 100)

    // Ensure loader shows for at least 2 seconds
    const minDisplayTimer = setTimeout(() => {
      // This will be handled by Next.js when the page is ready
    }, 2000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(minDisplayTimer)
    }
  }, [])

  if (!showLoader) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      {/* Animated loading spinner */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full animate-spin animation-delay-300"></div>
          <div className="absolute inset-4 w-8 h-8 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin animation-delay-500"></div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-2">
            CelebrateMate
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Preparing your experience
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce animation-delay-0"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce animation-delay-100"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce animation-delay-300"></div>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-full animate-pulse"></div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
          Loading your personalized dashboard with all your celebrations...
        </p>
      </div>
    </div>
  )
}
