"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode, useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
}

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
  const [loadingStartTime, setLoadingStartTime] = useState<number>(Date.now())
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false)

  useEffect(() => {
    // Only show loading on initial app load, not on subsequent route changes
    if (!hasLoadedInitially) {
      setLoadingStartTime(Date.now())

      // Ensure minimum 2-second loading time for initial load
      const minLoadingTime = 2000
      const timer = setTimeout(() => {
        setIsLoading(false)
        setHasLoadedInitially(true)
      }, minLoadingTime)

      return () => clearTimeout(timer)
    } else {
      // For subsequent route changes, no loading overlay
      setIsLoading(false)
    }
  }, [pathname, searchParams, hasLoadedInitially])

  return (
    <>
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center"
          >
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

              <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 rounded-full animate-pulse"></div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
                Loading your personalized dashboard with all your celebrations...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </>
  )
}
