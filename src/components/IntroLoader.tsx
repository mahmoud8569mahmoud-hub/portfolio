'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroLoader({ locale }: { locale: 'ar' | 'en' }) {
  const [loading, setLoading] = useState(true)
  const [curtainOpen, setCurtainOpen] = useState(false)

  useEffect(() => {
    // Check session storage
    const hasSeenIntro = sessionStorage.getItem('timo_portfolio_intro_seen')
    if (hasSeenIntro) {
      setLoading(false)
      return
    }

    // Sequence timer: display complete unified name, then open curtain
    const curtainTimer = setTimeout(() => {
      setCurtainOpen(true)
    }, 1700)

    const finishTimer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('timo_portfolio_intro_seen', 'true')
    }, 2600)

    return () => {
      clearTimeout(curtainTimer)
      clearTimeout(finishTimer)
    }
  }, [])

  if (!loading) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden pointer-events-none select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Curtain in Green */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-[#0F3D3A] z-10"
          initial={{ x: '0%' }}
          animate={curtainOpen ? { x: '-100%' } : { x: '0%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Right Curtain in Green */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-[#0F3D3A] z-10"
          initial={{ x: '0%' }}
          animate={curtainOpen ? { x: '100%' } : { x: '0%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Bordo Wipe Layer */}
        <motion.div
          className="absolute inset-0 bg-[#6C151E] z-20 pointer-events-none"
          initial={{ scaleX: 0, originX: locale === 'ar' ? 1 : 0 }}
          animate={curtainOpen ? { scaleX: [0, 1, 0], originX: locale === 'ar' ? [1, 1, 0] : [0, 0, 1] } : { scaleX: 0 }}
          transition={{ duration: 0.75, times: [0, 0.5, 1], ease: 'easeInOut' }}
        />

        {/* Center Content: Complete, fully-connected Arabic Name (No letter splitting) */}
        <div className="relative z-30 flex flex-col items-center justify-center px-6 text-center">
          
          {/* Main Full Name revealed as a unified whole */}
          <div className="overflow-hidden py-2 sm:py-3">
            <motion.h1
              initial={{ y: '120%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#F5DABF] leading-tight font-cairo tracking-normal"
            >
              {locale === 'ar' ? 'محمود أيمن' : 'Mahmoud Ayman'}
            </motion.h1>
          </div>

          {/* Subtitle & Timo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-3 mt-3 sm:mt-5"
          >
            <span className="tilted-pill text-xs sm:text-sm py-1 px-4 bg-[#6C151E] text-[#F5DABF] shadow-xl">
              {locale === 'ar' ? 'تيمو — Timo' : 'Timo — تيمو'}
            </span>

            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#F5DABF]/90 font-bold border-s-2 border-[#6C151E] ps-3">
              {locale === 'ar' ? 'مصمم جرافيك كريتيف' : 'Creative Graphic Designer'}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
