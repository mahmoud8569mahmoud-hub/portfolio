import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import fs from 'fs'
import path from 'path'
import { getLocalContent, saveLocalContent } from '@/lib/data'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session_token')?.value
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const target = formData.get('target') as string | null // 'hero', 'about', or 'project'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (target === 'hero') {
      const heroPath = path.join(process.cwd(), 'public/assets/personal/timo-bw.jpg')
      fs.writeFileSync(heroPath, buffer)
      // Update content object photo url if needed
      const content = getLocalContent()
      content.hero.hero_photo = `/assets/personal/timo-bw.jpg?t=${Date.now()}`
      saveLocalContent(content)
      return NextResponse.json({ success: true, url: content.hero.hero_photo })
    }

    if (target === 'about') {
      const aboutPath = path.join(process.cwd(), 'public/assets/personal/timo-color.jpg')
      fs.writeFileSync(aboutPath, buffer)
      const content = getLocalContent()
      content.about.about_photo = `/assets/personal/timo-color.jpg?t=${Date.now()}`
      saveLocalContent(content)
      return NextResponse.json({ success: true, url: content.about.about_photo })
    }

    // Default: project upload
    const uploadsDir = path.join(process.cwd(), 'public/uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const ext = path.extname(file.name) || '.jpg'
    const cleanFileName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}${ext}`
    const filePath = path.join(uploadsDir, cleanFileName)
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({ success: true, url: `/uploads/${cleanFileName}` })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error processing file' }, { status: 500 })
  }
}
