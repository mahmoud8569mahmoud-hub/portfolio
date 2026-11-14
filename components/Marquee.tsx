'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function MarqueeText({ locale }: { locale: 'ar' | 'en' }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])

  const phrasesRow1 = [
    'أفكار تتشاف قبل ما تتقري',
    'VISUAL IDENTITY',
    'كل خدمة تبدأ بفكرة',
    'CREATIVE GRAPHIC DESIGN',
    'محمود أيمن',
    'TIMO',
  ]

  const phrasesRow2 = [
    'CONCEPT FIRST',
    'تصميم الشعارات',
    'CAROUSEL STORIES',
    'تصميم السوشيال ميديا',
    'EDITORIAL PRECISION',
    'بوسترات وإعلانات',
  ]

  return (
    <section
      id="marquee"
      ref={containerRef}
      className="relative py-12 sm:py-16 bg-[#0F3D3A] text-[#F5DABF] overflow-hidden select-none border-y-4 border-[#6C151E]"
    >
      {/* Row 1 */}
      <motion.div
        style={{ x: x1 }}
        className="flex whitespace-nowrap items-center gap-6 sm:gap-10 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight"
      >
        {[...phrasesRow1, ...phrasesRow1, ...phrasesRow1].map((text, i) => (
          <div key={i} className="flex items-center gap-6 sm:gap-10">
            <span>{text}</span>
            <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#6C151E] inline-block" />
          </div>
        ))}
      </motion.div>

      {/* Row 2 (Opposite Direction) */}
      <motion.div
        style={{ x: x2 }}
        className="flex whitespace-nowrap items-center gap-6 sm:gap-10 text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight mt-4 text-[#F5DABF]/70"
      >
        {[...phrasesRow2, ...phrasesRow2, ...phrasesRow2].map((text, i) => (
          <div key={i} className="flex items-center gap-6 sm:gap-10">
            <span>{text}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5DABF]/40 inline-block" />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
