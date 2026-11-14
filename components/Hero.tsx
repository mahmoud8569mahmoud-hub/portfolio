'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

interface HeroProps {
  locale: 'ar' | 'en'
  dict: any
  content: any
}

export default function Hero({ locale, dict, content }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const name = locale === 'ar' ? content?.hero?.name_ar || dict.hero.name : content?.hero?.name_en || dict.hero.name
  const headline = locale === 'ar' ? content?.hero?.headline_ar || dict.hero.headline : content?.hero?.headline_en || dict.hero.headline
  const pill = locale === 'ar' ? content?.hero?.pill_ar || dict.hero.pill : content?.hero?.pill_en || dict.hero.pill
  const intro = locale === 'ar' ? content?.hero?.intro_ar || dict.hero.intro : content?.hero?.intro_en || dict.hero.intro
  const heroPhoto = content?.hero?.hero_photo || '/assets/personal/timo-bw.jpg'

  // Split headline into words for stagger mask reveal
  const words = headline.split(' ')

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2])
  const heroY = useTransform(scrollY, [0, 400], [0, 80])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#F5DABF]"
    >
      {/* Background Graphic Color Blocks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Decorative Bordo Shape */}
        <motion.div
          animate={{
            x: mousePos.x * -1.2,
            y: mousePos.y * -1.2,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 60 }}
          className="absolute -top-24 -right-24 rtl:-right-auto rtl:-left-24 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-[#6C151E]/10 blur-3xl"
        />

        {/* Large Green Backdrop Shape */}
        <motion.div
          animate={{
            x: mousePos.x * 0.8,
            y: mousePos.y * 0.8,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 60 }}
          className="absolute bottom-10 left-10 rtl:left-auto rtl:right-10 w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] rounded-full bg-[#0F3D3A]/10 blur-2xl"
        />

        {/* Diagonal Solid Color Slash */}
        <div className="absolute top-1/3 -left-20 w-96 h-4 bg-[#6C151E] -rotate-12 opacity-80" />
      </div>

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start justify-center order-2 lg:order-1">
            
            {/* Top Pill / Badge with mouse reaction */}
            <motion.div
              animate={{
                x: mousePos.x * 1.5,
                y: mousePos.y * 1.5,
                rotate: -2.5,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 70 }}
              className="mb-4 sm:mb-6"
            >
              <span className="tilted-pill text-xs sm:text-sm py-1.5 px-4 shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F5DABF]" />
                {pill}
              </span>
            </motion.div>

            {/* Sub-label Name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg font-bold text-[#6C151E] mb-2 tracking-wide"
            >
              {name}
            </motion.p>

            {/* Oversized Arabic Headline with Stagger Mask Reveal */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-black text-[#6C151E] leading-[1.12] tracking-tight mb-6">
              <div className="flex flex-wrap gap-x-3 sm:gap-x-4">
                {words.map((word: string, i: number) => (
                  <span key={i} className="inline-block overflow-hidden pb-1">
                    <motion.span
                      initial={{ y: '115%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.2 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
            </h1>

            {/* Editorial Intro Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-[#0F3D3A] font-medium leading-relaxed max-w-2xl mb-8 border-s-4 border-[#6C151E] ps-4 sm:ps-6"
            >
              {intro}
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <a
                href="#work"
                className="px-7 py-3.5 rounded-full bg-[#6C151E] text-[#F5DABF] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {dict.hero.cta}
              </a>

              <a
                href="#contact"
                className="px-7 py-3.5 rounded-full bg-[#0F3D3A] text-[#F5DABF] font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {dict.hero.contactCta}
              </a>
            </motion.div>
          </div>

          {/* Photo Column */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#0F3D3A]"
            >
              {/* Background Color Block Accent */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-[#6C151E] rounded-3xl -z-10" />

              {/* Tint overlay to harmonize the grey studio background into palette */}
              <div className="absolute inset-0 bg-[#0F3D3A]/15 mix-blend-color z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-[#F5DABF]/10 mix-blend-screen z-10 pointer-events-none" />

              {/* The clean B&W portrait with hands under chin and face clearly framed */}
              <Image
                src={heroPhoto}
                alt={name}
                fill
                priority
                sizes="(max-width: 768px) 360px, 440px"
                className="object-cover object-[50%_15%] hero-photo-grade select-none"
              />

              {/* Bottom Subtle Gradient for editorial anchor */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0F3D3A]/80 to-transparent z-10 pointer-events-none" />

              {/* Tilted Floating Mini Pill on photo corner */}
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-4 start-4 z-20"
              >
                <span className="tilted-pill text-[11px] py-1 px-3 bg-[#6C151E] text-[#F5DABF]">
                  {locale === 'ar' ? 'أفكار تتشاف' : 'Visual First'}
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 flex justify-center items-center"
        >
          <a
            href="#marquee"
            className="flex flex-col items-center gap-1.5 text-[#0F3D3A]/60 hover:text-[#6C151E] transition-colors group"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {locale === 'ar' ? 'اكتشف المزيد' : 'Scroll Down'}
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#6C151E]" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
