import ar from '../messages/ar.json'
import en from '../messages/en.json'

export type Locale = 'ar' | 'en'

const dictionaries = {
  ar,
  en,
}

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.ar
}

export const defaultLocale: Locale = 'ar'
export const locales: Locale[] = ['ar', 'en']
