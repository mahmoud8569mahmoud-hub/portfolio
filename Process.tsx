'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Headphones, Lightbulb, PenTool, CheckCircle } from 'lucide-react'

interface ProcessProps {
  locale: 'ar' | 'en'
  dict: any
  content: any
}

const stepIcons: Record<string, any> = {
  '01': Headphones,
  '02': Lightbulb,
  '03': PenTool,
  '04': CheckCircle,
}

export default function Process({ locale, dict, content }: ProcessProps) {
  const steps = content?.process || dict.process.steps

  return (
    <section
      id="process"
      className="relative py-24 sm:py-36 bg-[#6C151E] text-[#F5DABF] overflow-hidden"
    >
      {/* Decorative Background Shapes */}
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#0F3D3A]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F5DABF]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-block mb-3">
            <span className="tilted-pill text-xs py-1 px-4 bg-[#0F3D3A] text-[#F5DABF] border border-[#F5DABF]/20">
              {dict.process.tag}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F5DABF] tracking-tight">
            {dict.process.title}
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step: any, index: number) => {
            const Icon = stepIcons[step.num] || Lightbulb
            const title = locale === 'ar' ? step.title_ar || step.title : step.title_en || step.title
            const desc = locale === 'ar' ? step.desc_ar || step.desc : step.desc_en || step.desc
            const enTitle = locale === 'ar' ? step.title_en || step.enTitle : step.title_ar || step.enTitle

            return (
              <motion.div
                key={step.num || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#F5DABF]/10 border border-[#F5DABF]/20 hover:bg-[#F5DABF]/15 transition-all duration-300 group"
              >
                <div>
                  {/* Top Header inside card */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl sm:text-5xl font-black text-[#F5DABF]/40 group-hover:text-[#F5DABF] transition-colors">
                      {step.num}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-[#0F3D3A] flex items-center justify-center text-[#F5DABF] shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl font-black text-[#F5DABF] mb-1">
                    {title}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-[#F5DABF]/60 font-semibold mb-4 block">
                    {enTitle}
                  </span>

                  {/* Step Description */}
                  <p className="text-sm sm:text-base text-[#F5DABF]/80 leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Bottom Progress Accent */}
                <div className="mt-8 pt-4 border-t border-[#F5DABF]/10 flex items-center justify-between text-xs text-[#F5DABF]/60">
                  <span>{locale === 'ar' ? `المرحلة 0${index + 1}` : `Phase 0${index + 1}`}</span>
                  <span className="w-2 h-2 rounded-full bg-[#F5DABF]" />
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
