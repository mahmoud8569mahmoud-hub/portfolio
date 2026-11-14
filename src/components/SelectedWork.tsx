'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowUpRight, FolderPlus, X, Tag } from 'lucide-react'
import { Project } from '@/lib/types'

interface SelectedWorkProps {
  locale: 'ar' | 'en'
  dict: any
  projects: Project[]
}

export default function SelectedWork({ locale, dict, projects = [] }: SelectedWorkProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const publishedProjects = projects.filter(p => p.is_published)

  const categories = [
    { id: 'all', label: dict.work.allCategories },
    { id: 'identity', label: locale === 'ar' ? 'هويات بصرية' : 'Brand Identity' },
    { id: 'logo', label: locale === 'ar' ? 'شعارات' : 'Logos' },
    { id: 'social', label: locale === 'ar' ? 'سوشيال ميديا' : 'Social Media' },
    { id: 'carousel', label: locale === 'ar' ? 'كاروسيل' : 'Carousels' },
  ]

  const filteredProjects = selectedCategory === 'all'
    ? publishedProjects
    : publishedProjects.filter(p => p.category === selectedCategory)

  return (
    <section
      id="work"
      className="relative py-24 sm:py-36 bg-[#F5DABF] text-[#0F3D3A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <div className="inline-block mb-3">
              <span className="tilted-pill text-xs py-1 px-3.5 bg-[#6C151E] text-[#F5DABF]">
                {dict.work.tag}
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#6C151E] tracking-tight">
              {dict.work.title}
            </h2>
          </div>

          <p className="text-lg sm:text-xl font-bold text-[#0F3D3A] max-w-md">
            {dict.work.subtitle}
          </p>
        </div>

        {/* Empty State when no projects are yet added from dashboard */}
        {publishedProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-[#0F3D3A] text-[#F5DABF] border-2 border-[#6C151E] p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl"
          >
            {/* Background Aesthetic Overlay */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#6C151E]/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#F5DABF]/10 blur-2xl" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#6C151E] flex items-center justify-center text-[#F5DABF] mb-6 shadow-lg">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#F5DABF]" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#F5DABF] mb-4">
                {dict.work.emptyTitle}
              </h3>

              <p className="text-base sm:text-lg text-[#F5DABF]/80 max-w-xl mx-auto leading-relaxed mb-8">
                {dict.work.emptyDesc}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6C151E] text-[#F5DABF] font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'إضافة مشروع من لوحة التحكم' : 'Add Project via Dashboard'}</span>
                </Link>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5DABF]/10 text-[#F5DABF] hover:bg-[#F5DABF]/20 font-bold text-sm transition-all"
                >
                  <span>{locale === 'ar' ? 'طلب فكرة مخصصة' : 'Request Custom Concept'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <div>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#6C151E] text-[#F5DABF] shadow-md scale-105'
                      : 'bg-[#0F3D3A]/10 text-[#0F3D3A] hover:bg-[#0F3D3A]/20'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => {
                const title = locale === 'ar' ? project.title_ar : project.title_en
                const desc = locale === 'ar' ? project.description_ar : project.description_en

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    data-cursor-view="true"
                    onClick={() => setActiveProject(project)}
                    className="group relative rounded-3xl overflow-hidden bg-[#0F3D3A] text-[#F5DABF] border-2 border-[#6C151E] cursor-pointer shadow-xl flex flex-col justify-between"
                  >
                    {/* Cover Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F3D3A]/50">
                      {project.cover_image && (
                        <Image
                          src={project.cover_image}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F3D3A] via-transparent to-transparent opacity-80" />

                      {/* Pill Tag */}
                      <div className="absolute top-4 start-4 z-10">
                        <span className="tilted-pill text-[11px] py-1 px-3 bg-[#6C151E] text-[#F5DABF]">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl sm:text-2xl font-black text-[#F5DABF] mb-2 group-hover:text-[#F5DABF] transition-colors flex items-center justify-between">
                        <span>{title}</span>
                        <ArrowUpRight className="w-5 h-5 text-[#F5DABF]/50 group-hover:text-[#F5DABF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rtl:group-hover:-translate-x-1" />
                      </h3>

                      <p className="text-sm text-[#F5DABF]/70 line-clamp-2 leading-relaxed mb-4">
                        {desc}
                      </p>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F5DABF]/10">
                          {project.tags.map((t, i) => (
                            <span key={i} className="text-[10px] font-semibold text-[#F5DABF]/60">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F3D3A] text-[#F5DABF] border-2 border-[#6C151E] p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 end-4 p-2 rounded-full bg-[#6C151E] text-[#F5DABF] hover:scale-105 active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="tilted-pill text-xs py-1 px-3 bg-[#6C151E] text-[#F5DABF] mb-3 inline-block">
                  {activeProject.category}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#F5DABF] mb-3">
                  {locale === 'ar' ? activeProject.title_ar : activeProject.title_en}
                </h2>
                <p className="text-base text-[#F5DABF]/80 leading-relaxed">
                  {locale === 'ar' ? activeProject.description_ar : activeProject.description_en}
                </p>
              </div>

              {/* Gallery Images */}
              {activeProject.gallery && activeProject.gallery.length > 0 && (
                <div className="space-y-4">
                  {activeProject.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#F5DABF]/20">
                      <Image
                        src={img}
                        alt={`gallery ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
