import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import { getLocalProjects, saveLocalProjects } from '@/lib/data'
import { Project } from '@/lib/types'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  const projects = getLocalProjects()
  // Sort by order_index
  projects.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session_token')?.value
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const projects = getLocalProjects()

    const newProject: Project = {
      id: data.id || `proj_${Date.now()}`,
      title_ar: data.title_ar || '',
      title_en: data.title_en || '',
      description_ar: data.description_ar || '',
      description_en: data.description_en || '',
      category: data.category || 'identity',
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover_image: data.cover_image || '',
      gallery: Array.isArray(data.gallery) ? data.gallery : [],
      order_index: typeof data.order_index === 'number' ? data.order_index : projects.length,
      is_published: typeof data.is_published === 'boolean' ? data.is_published : true,
      created_at: new Date().toISOString(),
    }

    projects.push(newProject)
    saveLocalProjects(projects)

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').insert([newProject])
      } catch (sbErr) {
        console.error('Supabase project insert warning:', sbErr)
      }
    }

    return NextResponse.json({ success: true, project: newProject })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating project' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session_token')?.value
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const updated = await request.json()
    if (Array.isArray(updated)) {
      // Bulk re-ordering
      saveLocalProjects(updated)
      return NextResponse.json({ success: true, projects: updated })
    }

    const projects = getLocalProjects()
    const index = projects.findIndex((p) => p.id === updated.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    projects[index] = { ...projects[index], ...updated }
    saveLocalProjects(projects)

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').upsert([projects[index]])
      } catch (sbErr) {
        console.error('Supabase project update warning:', sbErr)
      }
    }

    return NextResponse.json({ success: true, project: projects[index] })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating project' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session_token')?.value
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    let projects = getLocalProjects()
    projects = projects.filter((p) => p.id !== id)
    saveLocalProjects(projects)

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('projects').delete().eq('id', id)
      } catch (sbErr) {
        console.error('Supabase project delete warning:', sbErr)
      }
    }

    return NextResponse.json({ success: true, deletedId: id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error deleting project' }, { status: 500 })
  }
}
