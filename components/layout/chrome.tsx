'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { ScrollProgress } from '@/components/layout/scroll-progress'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

const FULLSCREEN_PATHS = new Set<string>(['/', '/login'])

export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/'
  const isFullscreen = FULLSCREEN_PATHS.has(pathname) || pathname.startsWith('/login')
  const isLogin = pathname === '/login' || pathname.startsWith('/login')

  if (isLogin) {
    return <>{children}</>
  }

  if (isFullscreen) {
    return (
      <>
        <ScrollProgress />
        <main id="main">{children}</main>
      </>
    )
  }

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main id="main" className="pt-16 lg:pt-[72px]">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
