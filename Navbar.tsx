'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from './LanguageTransition'
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react'

interface NavbarProps {
  locale: 'ar' | 'en'
  dict: any
}

export default function Navbar({ locale, dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: dict.nav.work, href: '#work' },
    { label: dict.nav.about, href: '#about' },
    { label: dict.nav.services, href: '#services' },
    { label: dict.nav.process, href: '#process' },
    { label: dict.nav.contact, href: '#contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F5DABF]/90 backdrop-blur-md py-3 shadow-sm border-b border-[#0F3D3A]/10'
            : 'bg-transparent py-5 sm:py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="font-extrabold text-xl sm:text-2xl text-[#6C151E] tracking-tight">
              {locale === 'ar' ? 'محمود أيمن' : 'Mahmoud Ayman'}
            </span>
            <span className="tilted-pill text-[11px] px-2.5 py-0.5">
              {locale === 'ar' ? 'تيمو' : 'Timo'}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-[#0F3D3A] font-semibold text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 transition-colors hover:text-[#6C151E] group"
              >
                {link.label}
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#6C151E] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons: Language Switcher + Admin */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher currentLocale={locale} />
            
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0F3D3A]/30 text-[#0F3D3A] text-xs font-bold hover:bg-[#0F3D3A] hover:text-[#F5DABF] transition-all"
              title={dict.nav.admin}
            >
              <Lock className="w-3 h-3" />
              <span>{dict.nav.admin}</span>
            </Link>
          </div>

          {/* Mobile Actions: Language Switcher + Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher currentLocale={locale} />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0F3D3A] text-[#F5DABF] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0F3D3A] text-[#F5DABF] flex flex-col justify-between p-6 pt-28 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="text-2xl sm:text-3xl font-black text-[#F5DABF] hover:text-[#6C151E] flex items-center justify-between border-b border-[#F5DABF]/10 pb-4"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-6 h-6 text-[#F5DABF]/50" />
                </motion.a>
              ))}

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-lg font-bold text-[#F5DABF]/80 hover:text-[#F5DABF] pt-2"
              >
                <Lock className="w-5 h-5 text-[#6C151E]" />
                <span>{dict.nav.admin}</span>
              </Link>
            </div>

            <div className="border-t border-[#F5DABF]/15 pt-6 flex items-center justify-between">
              <span className="text-xs text-[#F5DABF]/70">
                {locale === 'ar' ? 'محمود أيمن (تيمو)' : 'Mahmoud Ayman (Timo)'}
              </span>
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
