import type { Metadata } from 'next'
import { Cairo, Space_Grotesk } from 'next/font/google'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'محمود أيمن (تيمو) | مصمم جرافيك كريتيف',
  description: 'أبتكر أفكاراً جديدة وأصيغها بصرياً بحيث يصل الإحساس للعميل من أول نظرة.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'محمود أيمن (تيمو) | مصمم جرافيك كريتيف',
    description: 'أبتكر أفكاراً جديدة وأصيغها بصرياً بحيث يصل الإحساس للعميل من أول نظرة.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${spaceGrotesk.variable}`}>
      <body className="font-cairo bg-[#F5DABF] text-[#0F3D3A]">
        {children}
      </body>
    </html>
  )
}
