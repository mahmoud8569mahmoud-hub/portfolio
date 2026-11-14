'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

interface FooterProps {
  locale: 'ar' | 'en'
  dict: any
}

export default function Footer({ locale, dict }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0F3D3A] text-[#F5DABF] border-t-2 border-[#6C151E] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#F5DABF]/10">
          {/* Identity */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-[#F5DABF]">
              {locale === 'ar' ? 'محمود أيمن' : 'Mahmoud Ayman'}
            </span>
            <span className="tilted-pill text-[11px] py-0.5 px-2 bg-[#6C151E] text-[#F5DABF]">
              {locale === 'ar' ? 'تيمو' : 'Timo'}
            </span>
          </div>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-[#F5DABF]/70 text-center md:text-start">
            {dict.footer.crafted}
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5DABF]/10 hover:bg-[#6C151E] text-[#F5DABF] text-xs font-bold transition-all group"
          >
            <span>{locale === 'ar' ? 'للأعلى' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5DABF]/60">
          <p>{dict.footer.rights}</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-[#F5DABF] transition-colors">
              {dict.nav.admin}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
