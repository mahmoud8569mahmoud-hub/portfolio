import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_session_token')?.value
  const isValid = verifySessionToken(token)

  return NextResponse.json({ authenticated: isValid })
}
