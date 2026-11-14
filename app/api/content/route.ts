import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import { getLocalContent, saveLocalContent } from '@/lib/data'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'

export async function GET() {
  const content = getLocalContent()
  return NextResponse.json(content)
}

export async function POST(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session_token')?.value
  if (!verifySessionToken(token)) {
    return NextResponse.json({ error: 'غير مصرح / Unauthorized' }, { status: 401 })
  }

  try {
    const newContent = await request.json()
    saveLocalContent(newContent)

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('site_content').upsert({
          id: 'singleton',
          content: newContent,
          updated_at: new Date().toISOString(),
        })
      } catch (sbErr) {
        console.error('Supabase sync warning:', sbErr)
      }
    }

    return NextResponse.json({ success: true, content: newContent })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error updating content' }, { status: 500 })
  }
}
