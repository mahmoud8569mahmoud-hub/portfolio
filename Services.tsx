'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Layers, Palette, Share2, GalleryHorizontalEnd, Sparkles, ArrowUpRight } from 'lucide-react'

interface ServicesProps {
  locale: 'ar' | 'en'
  dict: any
  content: any
}

const serviceIcons: Record<string, any> = {
  identity: Palette,
  logo: Sparkles,
  social: Share2,
  carousel: GalleryHorizontalEnd,
  ads: Layers,
}

function ServiceCard({
  service,
  index,
  total,
  locale,
}: {
  service: any
  index: number
  total: number
  locale: 'ar' | 'en'
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = serviceIcons[service.id] || Palette

  const title = locale === 'ar' ? service.title_ar || service.title : service.title_en || service.title
  const desc = locale === 'ar' ? service.desc_ar || service.desc : service.desc_en || service.desc
  const subTitle = locale === 'ar' ? service.title_en || service.enTitle : service.title_ar || service.enTitle

  return (
    <div
      ref={cardRef}
      className="sticky top-28 sm:top-32 w-full transition-transform"
      style={{
        zIndex: index + 1,
        marginBottom: `${(total - index - 1) * 20}px`,
      }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-[#0F3D3A] text-[#F5DABF] border-2 border-[#6C151E] p-6 sm:p-10 lg:p-12 shadow-2xl transition-all duration-300 hover:border-[#F5DABF]/50">
        
        {/* Background Decorative Number */}
        <span className="absolute top-2 end-4 text-7xl sm:text-9xl font-black text-[#F5DABF]/5 pointer-events-none select-none">
          0{index + 1}
        </span>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-10">
          
          <div className="max-w-2xl">
            {/* Top Tag & Number */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#6C151E] text-[#F5DABF] text-xs font-bold">
                0{index + 1}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#F5DABF]/60 font-semibold">
                {subTitle}
              </span>
            </div>

            {/* Service Title */}
            <h3 className="text-2xl sm:text-4xl font-black text-[#F5DABF] mb-4">
              {title}
            </h3>

            {/* Service Description */}
            <p className="text-base sm:text-lg text-[#F5DABF]/80 leading-relaxed">
              {desc}
            </p>
          </div>

          {/* Icon Box */}
          <div className="shrink-0 flex items-center justify-between md:flex-col md:items-end gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#6C151E] flex items-center justify-center text-[#F5DABF] shadow-lg">
              <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5DABF] hover:text-[#6C151E] transition-colors py-2 px-3 rounded-lg bg-[#F5DABF]/10 hover:bg-[#F5DABF]/20"
            >
              <span>{locale === 'ar' ? 'طلب الخدمة' : 'Inquire'}</span>
              <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}

export default function Services({ locale, dict, content }: ServicesProps) {
  const servicesList = content?.services || dict.services.items

  return (
    <section
      id="services"
      className="relative py-24 sm:py-36 bg-[#F5DABF] text-[#0F3D3A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-24 gap-6">
          <div>
            <div className="inline-block mb-3">
              <span className="tilted-pill text-xs py-1 px-3.5 bg-[#6C151E] text-[#F5DABF]">
                {dict.services.tag}
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#6C151E] tracking-tight">
              {dict.services.title}
            </h2>
          </div>

          <p className="text-xl sm:text-2xl font-bold text-[#0F3D3A] border-s-4 border-[#6C151E] ps-4 max-w-md">
            {dict.services.tagline}
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative flex flex-col space-y-6 sm:space-y-8">
          {servicesList.map((service: any, index: number) => (
            <ServiceCard
              key={service.id || index}
              service={service}
              index={index}
              total={servicesList.length}
              locale={locale}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
