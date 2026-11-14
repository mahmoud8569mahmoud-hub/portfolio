'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor({ locale }: { locale: 'ar' | 'en' }) {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    // Check if device supports fine hover (desktop)
    const hasPointer = window.matchMedia('(pointer: fine)').matches
    if (!hasPointer) return
    setIsTouchDevice(false)

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const projectCard = target.closest('[data-cursor-view]')
      const interactive = target.closest('a, button, [role="button"]')

      if (projectCard) {
        setIsHovered(true)
        setCursorText(locale === 'ar' ? 'شاهد' : 'View')
      } else if (interactive) {
        setIsHovered(true)
        setCursorText('')
      } else {
        setIsHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [locale])

  if (isTouchDevice) return null

  return (
    <div
      className="custom-cursor flex items-center justify-center font-bold text-xs select-none transition-transform pointer-events-none"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1 : 0.8})`,
        width: cursorText ? '80px' : isHovered ? '48px' : '14px',
        height: cursorText ? '80px' : isHovered ? '48px' : '14px',
        backgroundColor: cursorText ? '#6C151E' : isHovered ? 'rgba(108, 21, 30, 0.4)' : '#6C151E',
        color: '#F5DABF',
        border: isHovered && !cursorText ? '2px solid #F5DABF' : 'none',
        mixBlendMode: cursorText ? 'normal' : 'difference',
      }}
    >
      {cursorText && (
        <span className="text-xs tracking-wider uppercase font-bold animate-pulse text-[#F5DABF]">
          {cursorText}
        </span>
      )}
    </div>
  )
}
