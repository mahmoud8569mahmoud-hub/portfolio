import { SiteContent, Project } from './types'
import fs from 'fs'
import path from 'path'

export const defaultSiteContent: SiteContent = {
  hero: {
    name_ar: "محمود أيمن — تيمو",
    name_en: "Mahmoud Ayman — Timo",
    pill_ar: "مصمم جرافيك كريتيف",
    pill_en: "Creative Graphic Designer",
    headline_ar: "أفكار تتشاف قبل ما تتقري.",
    headline_en: "Ideas you see before you read them.",
    intro_ar: "أبتكر أفكاراً جديدة وأصيغها بصرياً بحيث يصل الإحساس للعميل من أول نظرة.",
    intro_en: "I create fresh ideas and shape them visually, so your audience feels the message at first glance.",
    hero_photo: "/assets/personal/timo-bw.jpg"
  },
  about: {
    title_ar: "الفكرة أولاً، ثم التصميم.",
    title_en: "Concept first, then aesthetics.",
    p1_ar: "أنا محمود أيمن، ويعرفني الناس باسم تيمو. مصمم جرافيك كريتيف بخبرة سنتين في عالم التصميم. شغلي بيبدأ من الفكرة قبل الشكل. باشتغل على ابتكار أفكار جديدة وصياغتها بصرياً بطريقة بسيطة وواضحة، بحيث يوصل الإحساس للعميل بسرعة من غير شرح كتير. بحب التفاصيل، وبآمن إن التصميم الناجح هو اللي يتفهم من أول نظرة ويفضل في الذاكرة.",
    p1_en: "I'm Mahmoud Ayman, known as Timo. A creative graphic designer with two years of experience. My work starts with the idea, not just the look. I create fresh concepts and shape them visually in a clear, simple way, so the feeling reaches the client fast, with no long explanations. I care about details, and I believe a great design is one you understand at first glance and remember afterwards.",
    about_photo: "/assets/personal/timo-color.jpg"
  },
  services: [
    {
      id: "identity",
      title_ar: "تصميم الهويات البصرية",
      title_en: "Visual Identity",
      desc_ar: "بناء هوية بصرية كاملة تعكس روح مشروعك وتثبت في ذهن جمهورك.",
      desc_en: "Building a comprehensive visual identity that reflects your essence and sticks in minds."
    },
    {
      id: "logo",
      title_ar: "تصميم الشعارات",
      title_en: "Logo Design",
      desc_ar: "ابتكار شعار مميز يحمل فكرة عميقة وبساطة تدوم طويلاً.",
      desc_en: "Crafting memorable logos rooted in strong concepts and timeless simplicity."
    },
    {
      id: "social",
      title_ar: "تصميم السوشيال ميديا",
      title_en: "Social Media Design",
      desc_ar: "تصاميم سوشيال ميديا توقف التمرير وتوصل رسالتك بلمح البصر.",
      desc_en: "Scroll-stopping social designs that communicate your message instantly."
    },
    {
      id: "carousel",
      title_ar: "تصميم الكاروسيل",
      title_en: "Carousel Design",
      desc_ar: "تسلسل بصري جذاب يروي قصتك ويزيد تفاعل المتابعين.",
      desc_en: "Engaging visual narratives designed to educate, captivate, and convert."
    },
    {
      id: "ads",
      title_ar: "تصميم الإعلانات والبوسترات",
      title_en: "Ads & Posters",
      desc_ar: "بوسترات وإعلانات بصرية ذات صدى قوي تدفع لاتخاذ إجراء سريع.",
      desc_en: "High-impact visual posters and ads engineered for quick response."
    }
  ],
  process: [
    {
      num: "01",
      title_ar: "أفهم",
      title_en: "Understand",
      desc_ar: "أستمع للعميل وأفهم الإحساس المطلوب بدقة.",
      desc_en: "Listen to the client and deeply understand the feeling needed."
    },
    {
      num: "02",
      title_ar: "أبتكر",
      title_en: "Create",
      desc_ar: "أبتكر أفكاراً جديدة ومختلفة تماماً عن المألوف.",
      desc_en: "Brainstorm fresh, unconventional ideas that stand out."
    },
    {
      num: "03",
      title_ar: "أصيغ",
      title_en: "Shape",
      desc_ar: "أحوّل الفكرة إلى تصميم بصري يوصل من أول نظرة.",
      desc_en: "Transform the idea into a visual form that lands at first glance."
    },
    {
      num: "04",
      title_ar: "أسلّم",
      title_en: "Deliver",
      desc_ar: "أصقل أدق التفاصيل وأسلّم عملاً جاهزاً للإطلاق.",
      desc_en: "Polish every detail and deliver ready-to-launch master files."
    }
  ],
  contact: {
    heading_ar: "عندك فكرة؟ خلّينا نحوّلها لتصميم.",
    heading_en: "Got an idea? Let's turn it into a design.",
    subheading_ar: "جاهز لمناقشة أفكارك وصياغتها بصرياً لتصل إلى جمهورك مباشرة.",
    subheading_en: "Available for selected freelance, brand identity, and visual design projects.",
    whatsapp_number: "+201000000000",
    instagram_url: "https://instagram.com/",
    behance_url: "https://behance.net/",
    email: "timo.creative@example.com"
  }
}

const DATA_DIR = path.join(process.cwd(), 'data')
const CONTENT_FILE = path.join(DATA_DIR, 'content.json')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function getLocalContent(): SiteContent {
  try {
    ensureDataDir()
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8')
      return { ...defaultSiteContent, ...JSON.parse(raw) }
    }
  } catch (err) {
    console.error('Error reading local content:', err)
  }
  return defaultSiteContent
}

export function saveLocalContent(content: SiteContent) {
  ensureDataDir()
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8')
}

export function getLocalProjects(): Project[] {
  try {
    ensureDataDir()
    if (fs.existsSync(PROJECTS_FILE)) {
      const raw = fs.readFileSync(PROJECTS_FILE, 'utf-8')
      const items = JSON.parse(raw)
      return Array.isArray(items) ? items : []
    }
  } catch (err) {
    console.error('Error reading local projects:', err)
  }
  return []
}

export function saveLocalProjects(projects: Project[]) {
  ensureDataDir()
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8')
}
