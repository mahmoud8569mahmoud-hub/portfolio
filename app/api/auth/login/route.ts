import { NextResponse } from 'next/server'
import { validateCredentials, createSessionToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!validateCredentials(email, password)) {
      return NextResponse.json(
        { error: 'بيانات الدخول غير صحيحة / Invalid credentials' },
        { status: 401 }
      )
    }

    const token = createSessionToken()
    const response = NextResponse.json({ success: true, message: 'Authenticated' })

    response.cookies.set('admin_session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
