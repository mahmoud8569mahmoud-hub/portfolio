'use client'

import { useState, useTransition } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function LanguageSwitcher({ currentLocale }: { currentLocale: 'ar' | 'en' }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isWiping, setIsWiping] = useState(false)
  const [, startTransition] = useTransition()

  const targetLocale = currentLocale === 'ar' ? 'en' : 'ar'
  const buttonLabel = currentLocale === 'ar' ? 'EN' : 'عربي'

  const handleSwitch = () => {
    setIsWiping(true)

    // Calculate new path: replace /ar with /en or vice-versa
    let newPath = pathname
    if (pathname.startsWith(`/${currentLocale}`)) {
      newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`)
    } else {
      newPath = `/${targetLocale}${pathname}`
    }

    // Set cookie for language preference
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`

    setTimeout(() => {
      startTransition(() => {
        router.push(newPath)
      })
      setTimeout(() => {
        setIsWiping(false)
      }, 450)
    }, 400)
  }

  return (
    <>
      <button
        onClick={handleSwitch}
        aria-label="Toggle language"
        className="px-3.5 py-1 rounded-full bg-[#6C151E] text-[#F5DABF] font-bold text-xs tracking-wider border border-[#F5DABF]/20 hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#F5DABF]"
      >
        {buttonLabel}
      </button>

      {/* Screen Color Wipe Transition */}
      <AnimatePresence>
        {isWiping && (
          <motion.div
            className="fixed inset-0 z-[99999] pointer-events-none flex"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
          >
            <div className="w-1/2 h-full bg-[#6C151E]" />
            <div className="w-1/2 h-full bg-[#0F3D3A]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
