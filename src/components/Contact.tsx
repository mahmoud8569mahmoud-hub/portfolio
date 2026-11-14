'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Globe, Mail, Copy, Check } from 'lucide-react'

interface ContactProps {
  locale: 'ar' | 'en'
  dict: any
  content: any
}

export default function Contact({ locale, dict, content }: ContactProps) {
  const [copied, setCopied] = useState(false)

  const contactData = content?.contact || {}
  const heading = locale === 'ar'
    ? contactData.heading_ar || dict.contact.heading
    : contactData.heading_en || dict.contact.heading
  const subheading = locale === 'ar'
    ? contactData.subheading_ar || dict.contact.subheading
    : contactData.subheading_en || dict.contact.subheading

  const whatsappNumber = contactData.whatsapp_number || '+201000000000'
  const instagramUrl = contactData.instagram_url || 'https://instagram.com/'
  const behanceUrl = contactData.behance_url || 'https://behance.net/'
  const email = contactData.email || 'timo.creative@example.com'

  const whatsappHref = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    locale === 'ar'
      ? 'مرحباً تيمو، لدي فكرة مشروع وأريد تصميمها بصرياً معك.'
      : 'Hello Timo, I have a project concept and would love to collaborate on the visual design.'
  )}`

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-36 bg-[#0F3D3A] text-[#F5DABF] overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6C151E]/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Pill Tag */}
        <div className="inline-block mb-4">
          <span className="tilted-pill text-xs py-1 px-4 bg-[#6C151E] text-[#F5DABF]">
            {dict.contact.tag}
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#F5DABF] leading-tight tracking-tight mb-6">
          {heading}
        </h2>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-[#F5DABF]/80 max-w-2xl mx-auto leading-relaxed mb-12">
          {subheading}
        </p>

        {/* WhatsApp Direct Action Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mb-12"
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#6C151E] text-[#F5DABF] font-black text-lg sm:text-xl shadow-2xl hover:bg-[#801924] transition-all duration-300 border-2 border-[#F5DABF]/20"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            <span>{dict.contact.whatsappBtn}</span>
          </a>
        </motion.div>

        {/* Social and Email Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-[#F5DABF]/15">
          
          {/* Instagram */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-[#F5DABF]/10 border border-[#F5DABF]/15 text-[#F5DABF] hover:bg-[#F5DABF]/20 hover:border-[#F5DABF]/40 transition-all group"
          >
            <Instagram className="w-5 h-5 text-[#6C151E] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">Instagram</span>
          </a>

          {/* Behance */}
          <a
            href={behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-[#F5DABF]/10 border border-[#F5DABF]/15 text-[#F5DABF] hover:bg-[#F5DABF]/20 hover:border-[#F5DABF]/40 transition-all group"
          >
            <Globe className="w-5 h-5 text-[#6C151E] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">Behance</span>
          </a>

          {/* Email Copy */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-[#F5DABF]/10 border border-[#F5DABF]/15 text-[#F5DABF] hover:bg-[#F5DABF]/20 hover:border-[#F5DABF]/40 transition-all group"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-sm font-bold text-green-400">
                  {locale === 'ar' ? 'تم النسخ!' : 'Copied!'}
                </span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 text-[#6C151E] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">
                  {locale === 'ar' ? 'نسخ الإيميل' : 'Copy Email'}
                </span>
              </>
            )}
          </button>

        </div>

      </div>
    </section>
  )
}
