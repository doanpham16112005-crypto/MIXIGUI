'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth-store'
import type { Session } from '@supabase/supabase-js'

export default function AuthCallbackPage() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

  useEffect(() => {
    let handled = false

    const processSession = async (session: Session) => {
      if (handled) return
      handled = true

      const { data: existing } = await supabase
        .from('users')
        .select('id, email, full_name, role, avatar_url')
        .eq('email', session.user.email!)
        .single()

      let profile = existing
      if (!profile) {
        const { data: created } = await supabase
          .from('users')
          .insert({
            email: session.user.email!,
            full_name:
              session.user.user_metadata?.full_name ??
              session.user.user_metadata?.name ??
              session.user.email!.split('@')[0],
            avatar_url:
              session.user.user_metadata?.avatar_url ??
              session.user.user_metadata?.picture ??
              null,
            password_hash: 'oauth_user',
            role: 'STUDENT',
          })
          .select('id, email, full_name, role, avatar_url')
          .single()
        profile = created
      }

      if (!profile) {
        router.replace('/dang-nhap?error=1')
        return
      }

      setAuth(profile as Parameters<typeof setAuth>[0], session.access_token)
      router.replace(
        profile.role === 'ADMIN' || profile.role === 'INSTRUCTOR' ? '/admin' : '/hoc-vien'
      )
    }

    // Handle session already exchanged
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) processSession(session)
    })

    // Handle session being exchanged (PKCE code in URL)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) processSession(session)
    })

    return () => subscription.unsubscribe()
  }, [router, setAuth])

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-sm text-gray-500">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  )
}
