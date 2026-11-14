'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface AboutProps {
  locale: 'ar' | 'en'
  dict: any
  content: any
}

function WordHighlight({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.25, 1])
  const color = useTransform(progress, range, ['#F5DABF40', '#F5DABF'])

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block transition-colors duration-150 me-1.5"
    >
      {word}
    </motion.span>
  )
}

export default function About({ locale, dict, content }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const title = locale === 'ar' ? content?.about?.title_ar || dict.about.title : content?.about?.title_en || dict.about.title
  const paragraph = locale === 'ar' ? content?.about?.p1_ar || dict.about.p1 : content?.about?.p1_en || dict.about.p1
  const aboutPhoto = content?.about?.about_photo || '/assets/personal/timo-color.jpg'

  const words = paragraph.split(' ')

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 35%'],
  })

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 sm:py-36 bg-[#0F3D3A] text-[#F5DABF] overflow-hidden"
    >
      {/* Decorative Bordo Glow Accent */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#6C151E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="inline-block mb-3">
            <span className="tilted-pill text-xs py-1 px-3.5 bg-[#6C151E] text-[#F5DABF]">
              {dict.about.tag}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F5DABF] tracking-tight">
            {title}
          </h2>
        </div>

        {/* 2-Column Layout: Original Color Photo + Scroll Highlight Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Photo & Identity Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              
              {/* Original Full Color Portrait Card */}
              <div className="relative aspect-square w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-[#6C151E] bg-[#0F3D3A]">
                
                {/* Original Unaltered Color Image */}
                <Image
                  src={aboutPhoto}
                  alt={locale === 'ar' ? 'محمود أيمن — تيمو' : 'Mahmoud Ayman — Timo'}
                  fill
                  sizes="(max-width: 768px) 380px, 420px"
                  className="object-cover object-center select-none"
                />

                {/* Floating Corner Badge */}
                <div className="absolute bottom-4 end-4 z-20">
                  <span className="tilted-pill text-xs py-1.5 px-3.5 bg-[#6C151E] text-[#F5DABF] shadow-lg">
                    {dict.about.experience}
                  </span>
                </div>
              </div>

              {/* Fact Card */}
              <div className="p-6 rounded-2xl bg-[#F5DABF]/10 border border-[#F5DABF]/15 backdrop-blur-sm max-w-[420px] mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#6C151E] flex items-center justify-center text-xl font-black text-[#F5DABF]">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-[#F5DABF]">
                      {locale === 'ar' ? 'سنتين خبرة عملية' : '2 Years of Practical Experience'}
                    </h4>
                    <p className="text-xs text-[#F5DABF]/70">
                      {locale === 'ar' ? 'تركيز دائم على الفكرة وصياغتها بصرياً' : 'Continuous focus on concepts and visual shaping'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Story Column with Interactive Word-by-Word Highlight */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#F5DABF]/5 border border-[#F5DABF]/10 backdrop-blur-md">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#6C151E] mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6C151E]" />
                {locale === 'ar' ? 'فلسفة التصميم' : 'Design Philosophy'}
              </h3>

              {/* The dynamic word-by-word highlighted paragraph */}
              <div className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed sm:leading-[1.6]">
                {words.map((word: string, i: number) => {
                  const start = i / words.length
                  const end = start + 1 / words.length
                  return (
                    <WordHighlight
                      key={i}
                      word={word}
                      progress={scrollYProgress}
                      range={[start, end]}
                    />
                  )
                })}
              </div>

              {/* Core Principles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-[#F5DABF]/15">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6C151E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#F5DABF]">
                      {locale === 'ar' ? 'الفكرة قبل الشكل' : 'Idea Precedes Form'}
                    </span>
                    <p className="text-xs text-[#F5DABF]/70 mt-0.5">
                      {locale === 'ar' ? 'كل تفصيلة بصرية مدروسة ولها سبب' : 'Every visual choice is intentional and purposeful'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#6C151E] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-[#F5DABF]">
                      {locale === 'ar' ? 'تصل من أول نظرة' : 'Lands at First Glance'}
                    </span>
                    <p className="text-xs text-[#F5DABF]/70 mt-0.5">
                      {locale === 'ar' ? 'وضوح فوري يرسخ في ذاكرة العميل' : 'Instant clarity that sticks in your audience’s mind'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
