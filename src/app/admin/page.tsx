'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Eye,
  CheckCircle,
  FileText,
  Image as ImageIcon,
  Briefcase,
  ExternalLink,
  Layers
} from 'lucide-react'
import { SiteContent, Project } from '@/lib/types'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'content' | 'photos' | 'projects'>('content')
  const [content, setContent] = useState<SiteContent | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Project Modal State
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [resContent, resProjects] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/projects'),
      ])
      if (resContent.ok) {
        const cData = await resContent.json()
        setContent(cData)
      }
      if (resProjects.ok) {
        const pData = await resProjects.json()
        setProjects(pData)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleSaveContent = async () => {
    if (!content) return
    setSaving(true)
    setSaveSuccess(false)
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handlePersonalPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'about') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('target', target)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success && content) {
        if (target === 'hero') {
          setContent({
            ...content,
            hero: { ...content.hero, hero_photo: data.url }
          })
        } else {
          setContent({
            ...content,
            about: { ...content.about, about_photo: data.url }
          })
        }
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleProjectCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('target', 'project')

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success && editingProject) {
        setEditingProject({ ...editingProject, cover_image: data.url })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSaveProject = async () => {
    if (!editingProject) return
    try {
      const isNew = !editingProject.id
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      })
      if (res.ok) {
        setProjectModalOpen(false)
        setEditingProject(null)
        fetchData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟ / Delete this project?')) return
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchData()
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F3D3A] text-[#F5DABF]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#6C151E] border-t-[#F5DABF] rounded-full animate-spin" />
          <p className="font-bold text-sm">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F3D3A] text-[#F5DABF]">
      
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0F3D3A]/95 border-b-2 border-[#6C151E] backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6C151E] flex items-center justify-center text-[#F5DABF] font-black text-lg">
            T
          </div>
          <div>
            <h1 className="font-black text-base sm:text-lg">
              لوحة التحكم | Admin Dashboard
            </h1>
            <p className="text-[11px] text-[#F5DABF]/60">
              محمود أيمن (تيمو)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/ar"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5DABF]/10 hover:bg-[#F5DABF]/20 text-xs font-bold transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#F5DABF]" />
            <span className="hidden sm:inline">معاينة الموقع (عربي)</span>
          </Link>

          <Link
            href="/en"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5DABF]/10 hover:bg-[#F5DABF]/20 text-xs font-bold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#F5DABF]" />
            <span className="hidden sm:inline">Preview (EN)</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6C151E] hover:bg-[#801924] text-xs font-bold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 border-b border-[#F5DABF]/15 pb-4">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'content'
                ? 'bg-[#6C151E] text-[#F5DABF] shadow-lg'
                : 'bg-[#F5DABF]/10 text-[#F5DABF]/80 hover:bg-[#F5DABF]/20'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>محتوى الموقع / Site Content</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'photos'
                ? 'bg-[#6C151E] text-[#F5DABF] shadow-lg'
                : 'bg-[#F5DABF]/10 text-[#F5DABF]/80 hover:bg-[#F5DABF]/20'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>الصور الشخصية / Personal Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
              activeTab === 'projects'
                ? 'bg-[#6C151E] text-[#F5DABF] shadow-lg'
                : 'bg-[#F5DABF]/10 text-[#F5DABF]/80 hover:bg-[#F5DABF]/20'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>الأعمال والمشاريع / Projects ({projects.length})</span>
          </button>
        </div>

        {/* Tab 1: Site Content */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#F5DABF]">
                  تعديل نصوص وأقسام الموقع
                </h2>
                <p className="text-xs text-[#F5DABF]/60">
                  تحديث فوري ينعكس مباشرة على الموقع للزوار
                </p>
              </div>

              <button
                onClick={handleSaveContent}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6C151E] text-[#F5DABF] font-bold text-sm shadow-xl hover:bg-[#801924] active:scale-95 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-800 text-white text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>تم حفظ التعديلات بنجاح وستظهر مباشرة على الموقع!</span>
              </div>
            )}

            {/* Hero Section */}
            <div className="p-6 rounded-2xl bg-[#F5DABF]/5 border border-[#F5DABF]/15 space-y-4">
              <h3 className="text-base font-bold text-[#6C151E] border-s-4 border-[#6C151E] ps-3 uppercase tracking-wider">
                قسم البداية / Hero Section
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">الاسم (عربي)</label>
                  <input
                    type="text"
                    value={content.hero.name_ar}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, name_ar: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">Name (English)</label>
                  <input
                    type="text"
                    value={content.hero.name_en}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, name_en: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">العنوان الرئيسي (عربي)</label>
                  <input
                    type="text"
                    value={content.hero.headline_ar}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline_ar: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">Headline (English)</label>
                  <input
                    type="text"
                    value={content.hero.headline_en}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline_en: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">النص التعريفي (عربي)</label>
                  <textarea
                    rows={2}
                    value={content.hero.intro_ar}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, intro_ar: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">Intro Text (English)</label>
                  <textarea
                    rows={2}
                    value={content.hero.intro_en}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, intro_en: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="p-6 rounded-2xl bg-[#F5DABF]/5 border border-[#F5DABF]/15 space-y-4">
              <h3 className="text-base font-bold text-[#6C151E] border-s-4 border-[#6C151E] ps-3 uppercase tracking-wider">
                عن المصمم / About Section
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">عنوان القسم (عربي)</label>
                  <input
                    type="text"
                    value={content.about.title_ar}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, title_ar: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">Title (English)</label>
                  <input
                    type="text"
                    value={content.about.title_en}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, title_en: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">نص النبذة التعريفية (عربي)</label>
                  <textarea
                    rows={4}
                    value={content.about.p1_ar}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, p1_ar: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm leading-relaxed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">Bio Paragraph (English)</label>
                  <textarea
                    rows={4}
                    value={content.about.p1_en}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, p1_en: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Contact & Social Settings */}
            <div className="p-6 rounded-2xl bg-[#F5DABF]/5 border border-[#F5DABF]/15 space-y-4">
              <h3 className="text-base font-bold text-[#6C151E] border-s-4 border-[#6C151E] ps-3 uppercase tracking-wider">
                بيانات التواصل وروابط السوشيال ميديا / Contact & Social
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">رقم الواتساب (WhatsApp Number)</label>
                  <input
                    type="text"
                    value={content.contact.whatsapp_number}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, whatsapp_number: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                    placeholder="+201xxxxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">البريد الإلكتروني (Email)</label>
                  <input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">رابط انستغرام (Instagram URL)</label>
                  <input
                    type="url"
                    value={content.contact.instagram_url}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, instagram_url: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[#F5DABF]/80">رابط بيهانس (Behance URL)</label>
                  <input
                    type="url"
                    value={content.contact.behance_url}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, behance_url: e.target.value } })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Personal Photos */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#F5DABF]">
                استبدال الصور الشخصية / Replace Personal Photos
              </h2>
              <p className="text-xs text-[#F5DABF]/60">
                يمكنك رفع أي صورة بديلة بدقة عالية وسيقوم النظام بتحديثها فورياً على الموقع
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Hero Photo */}
              <div className="p-6 rounded-2xl bg-[#F5DABF]/5 border border-[#F5DABF]/15 flex flex-col items-center text-center">
                <h3 className="font-bold text-base text-[#F5DABF] mb-4">
                  صورة قسم الهيرو (الأبيض والأسود)
                </h3>
                
                <div className="relative w-48 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#6C151E] mb-4 bg-black/40">
                  <Image
                    src={content.hero.hero_photo}
                    alt="Hero Photo"
                    fill
                    className="object-cover object-[50%_15%]"
                  />
                </div>

                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6C151E] text-[#F5DABF] font-bold text-xs shadow-lg hover:bg-[#801924] transition-all">
                  <Upload className="w-4 h-4" />
                  <span>{uploadingImage ? 'جاري الرفع...' : 'رفع صورة جديدة للهيرو'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePersonalPhotoUpload(e, 'hero')}
                  />
                </label>
              </div>

              {/* About Photo */}
              <div className="p-6 rounded-2xl bg-[#F5DABF]/5 border border-[#F5DABF]/15 flex flex-col items-center text-center">
                <h3 className="font-bold text-base text-[#F5DABF] mb-4">
                  صورة قسم عني (الديوتون / الملونة)
                </h3>
                
                <div className="relative w-48 aspect-square rounded-2xl overflow-hidden border-2 border-[#6C151E] mb-4 bg-black/40">
                  <Image
                    src={content.about.about_photo}
                    alt="About Photo"
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6C151E] text-[#F5DABF] font-bold text-xs shadow-lg hover:bg-[#801924] transition-all">
                  <Upload className="w-4 h-4" />
                  <span>{uploadingImage ? 'جاري الرفع...' : 'رفع صورة جديدة لعني'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePersonalPhotoUpload(e, 'about')}
                  />
                </label>
              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#F5DABF]">
                  إدارة المشاريع والأعمال
                </h2>
                <p className="text-xs text-[#F5DABF]/60">
                  إضافة مشروعات جديدة، تعديلها، وإظهارها في معرض الأعمال
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProject({
                    title_ar: '',
                    title_en: '',
                    description_ar: '',
                    description_en: '',
                    category: 'identity',
                    tags: ['Branding', 'Visual Identity'],
                    cover_image: '',
                    gallery: [],
                    is_published: true,
                  })
                  setProjectModalOpen(true)
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6C151E] text-[#F5DABF] font-bold text-sm shadow-xl hover:bg-[#801924] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مشروع جديد</span>
              </button>
            </div>

            {/* Projects List */}
            {projects.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#F5DABF]/5 border border-[#F5DABF]/15">
                <Briefcase className="w-12 h-12 mx-auto text-[#6C151E] mb-3" />
                <h3 className="font-bold text-lg mb-1">لا توجد مشاريع مضافة حتى الآن</h3>
                <p className="text-xs text-[#F5DABF]/70 mb-4">
                  الموقع يظهر حالياً بطاقة أنيقة فارغة جاهزة لعرض مشاريعك فور إضافتها
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-2xl bg-[#F5DABF]/10 border border-[#F5DABF]/15 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full bg-black/30">
                      {proj.cover_image ? (
                        <Image
                          src={proj.cover_image}
                          alt={proj.title_ar}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#F5DABF]/40">
                          بدون غلاف
                        </div>
                      )}
                      <span className="absolute top-2 start-2 px-2.5 py-1 rounded-full bg-[#6C151E] text-[10px] font-bold">
                        {proj.category}
                      </span>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-base mb-1">{proj.title_ar || proj.title_en}</h4>
                      <p className="text-xs text-[#F5DABF]/70 line-clamp-2 mb-4">
                        {proj.description_ar || proj.description_en}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-[#F5DABF]/10">
                        <span className={`text-[11px] font-bold ${proj.is_published ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {proj.is_published ? 'منشور' : 'مخفي'}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProject(proj)
                              setProjectModalOpen(true)
                            }}
                            className="p-1.5 rounded-lg bg-[#F5DABF]/10 hover:bg-[#F5DABF]/20 text-[#F5DABF]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-1.5 rounded-lg bg-[#6C151E] hover:bg-[#801924] text-[#F5DABF]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Add / Edit Project Modal */}
      {projectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F3D3A] text-[#F5DABF] border-2 border-[#6C151E] p-6 sm:p-8 shadow-2xl">
            
            <h3 className="text-xl font-black mb-6">
              {editingProject.id ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">اسم المشروع (عربي)</label>
                  <input
                    type="text"
                    value={editingProject.title_ar || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title_ar: e.target.value })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={editingProject.title_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title_en: e.target.value })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">التصنيف (Category)</label>
                  <select
                    value={editingProject.category || 'identity'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  >
                    <option value="identity">هوية بصرية (Visual Identity)</option>
                    <option value="logo">شعار (Logo Design)</option>
                    <option value="social">سوشيال ميديا (Social Media)</option>
                    <option value="carousel">كاروسيل (Carousel)</option>
                    <option value="ads">إعلانات وبوسترات (Ads & Posters)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">حالة النشر</label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={editingProject.is_published ?? true}
                        onChange={(e) => setEditingProject({ ...editingProject, is_published: e.target.checked })}
                        className="rounded"
                      />
                      <span>نشر المشروع في المعرض</span>
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">الوصف (عربي)</label>
                  <textarea
                    rows={3}
                    value={editingProject.description_ar || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description_ar: e.target.value })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">Description (English)</label>
                  <textarea
                    rows={3}
                    value={editingProject.description_en || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description_en: e.target.value })}
                    className="w-full rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1">صورة الغلاف (Cover Image)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="/uploads/... أو رابط خارجي"
                      value={editingProject.cover_image || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, cover_image: e.target.value })}
                      className="flex-1 rounded-lg bg-[#0F3D3A] border border-[#F5DABF]/20 p-2.5 text-sm"
                    />
                    <label className="cursor-pointer px-4 py-2.5 rounded-lg bg-[#6C151E] hover:bg-[#801924] text-xs font-bold transition-all">
                      <span>{uploadingImage ? '...' : 'رفع صورة'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProjectCoverUpload}
                      />
                    </label>
                  </div>
                </div>

              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#F5DABF]/10">
                <button
                  onClick={() => {
                    setProjectModalOpen(false)
                    setEditingProject(null)
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#F5DABF]/10 hover:bg-[#F5DABF]/20 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveProject}
                  className="px-6 py-2.5 rounded-full bg-[#6C151E] hover:bg-[#801924] text-xs font-bold shadow-lg"
                >
                  حفظ المشروع
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}
