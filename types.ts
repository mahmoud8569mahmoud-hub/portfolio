export interface Project {
  id: string
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  category: string
  tags: string[]
  cover_image: string
  gallery: string[]
  order_index: number
  is_published: boolean
  created_at: string
}

export interface ServiceItem {
  id: string
  title_ar: string
  title_en: string
  desc_ar: string
  desc_en: string
}

export interface ProcessStep {
  num: string
  title_ar: string
  title_en: string
  desc_ar: string
  desc_en: string
}

export interface SiteContent {
  hero: {
    name_ar: string
    name_en: string
    pill_ar: string
    pill_en: string
    headline_ar: string
    headline_en: string
    intro_ar: string
    intro_en: string
    hero_photo: string
  }
  about: {
    title_ar: string
    title_en: string
    p1_ar: string
    p1_en: string
    about_photo: string
  }
  services: ServiceItem[]
  process: ProcessStep[]
  contact: {
    heading_ar: string
    heading_en: string
    subheading_ar: string
    subheading_en: string
    whatsapp_number: string
    instagram_url: string
    behance_url: string
    email: string
  }
}
