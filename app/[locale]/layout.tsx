import { getDictionary, Locale, locales } from '@/lib/i18n'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import IntroLoader from '@/components/IntroLoader'
import { Cairo, Space_Grotesk } from 'next/font/google'

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <div
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${spaceGrotesk.variable} ${locale === 'ar' ? 'font-cairo' : 'font-space'} min-h-screen`}
    >
      <IntroLoader locale={locale} />
      <CustomCursor locale={locale} />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </div>
  )
}
