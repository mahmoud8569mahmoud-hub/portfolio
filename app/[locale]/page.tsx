import { getDictionary, Locale } from '@/lib/i18n'
import { getLocalContent, getLocalProjects } from '@/lib/data'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarqueeText from '@/components/Marquee'
import About from '@/components/About'
import Services from '@/components/Services'
import Process from '@/components/Process'
import SelectedWork from '@/components/SelectedWork'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const revalidate = 0 // Instant live update without waiting for cache

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const dict = getDictionary(locale)
  const content = getLocalContent()
  const projects = getLocalProjects()

  return (
    <main className="relative min-h-screen flex flex-col justify-between">
      <Navbar locale={locale} dict={dict} />
      <Hero locale={locale} dict={dict} content={content} />
      <MarqueeText locale={locale} />
      <About locale={locale} dict={dict} content={content} />
      <Services locale={locale} dict={dict} content={content} />
      <Process locale={locale} dict={dict} content={content} />
      <SelectedWork locale={locale} dict={dict} projects={projects} />
      <Contact locale={locale} dict={dict} content={content} />
      <Footer locale={locale} dict={dict} />
    </main>
  )
}
