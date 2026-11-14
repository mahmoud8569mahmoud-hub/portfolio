'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, ArrowLeft, ShieldAlert } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('timo@portfolio.com')
  const [password, setPassword] = useState('TimoBrand2026!Secure')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Login failed')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F3D3A] text-[#F5DABF]">
      <div className="w-full max-w-md rounded-3xl bg-[#F5DABF]/10 border-2 border-[#6C151E] p-8 shadow-2xl backdrop-blur-md">
        
        {/* Back Link */}
        <Link
          href="/ar"
          className="inline-flex items-center gap-1.5 text-xs text-[#F5DABF]/70 hover:text-[#F5DABF] mb-6 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>العودة للموقع / Back to Site</span>
        </Link>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#6C151E] flex items-center justify-center mx-auto mb-4 text-[#F5DABF] shadow-lg">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5DABF] mb-1">
            لوحة تحكم تيمو
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#F5DABF]/70 font-semibold">
            Timo Admin Dashboard
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-[#6C151E] text-[#F5DABF] text-xs font-bold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F5DABF]/80 mb-1.5">
              Email / البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute start-3.5 top-3.5 text-[#F5DABF]/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-[#0F3D3A] border border-[#F5DABF]/20 text-[#F5DABF] ps-10 pe-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C151E]"
                placeholder="timo@portfolio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#F5DABF]/80 mb-1.5">
              Password / كلمة المرور
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute start-3.5 top-3.5 text-[#F5DABF]/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-[#0F3D3A] border border-[#F5DABF]/20 text-[#F5DABF] ps-10 pe-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C151E]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#6C151E] text-[#F5DABF] font-bold text-sm shadow-lg hover:bg-[#801924] active:scale-95 transition-all mt-2 disabled:opacity-50"
          >
            {loading ? 'جاري التحقق...' : 'تسجيل الدخول / Enter Dashboard'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#F5DABF]/10 text-center">
          <p className="text-[11px] text-[#F5DABF]/50">
            Protected area. Authorized access only.
          </p>
        </div>

      </div>
    </div>
  )
}
