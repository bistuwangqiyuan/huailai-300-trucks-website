'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { DASHBOARD_HREF, NAV } from '@/lib/nav'
import { PROJECT } from '@/lib/data/project'

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/5 bg-[#060912]/85 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5 lg:h-[72px] lg:px-12">
        <Link href="/" className="group flex items-center gap-3" aria-label="返回首页">
          <Logo />
          <span className="hidden flex-col leading-none lg:flex">
            <span className="text-[12px] font-medium tracking-[0.18em] text-white/60">
              中基锡安 · HUAILAI
            </span>
            <span className="text-[15px] font-medium tracking-tight text-white">
              {PROJECT.shortName}
              <span className="ml-2 text-white/40">{PROJECT.version}</span>
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {NAV.slice(1).map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-3 py-2 text-[13.5px] font-medium transition-colors',
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/65 hover:bg-white/5 hover:text-white',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link
            href={DASHBOARD_HREF}
            className={cn(
              'group hidden items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-all md:inline-flex',
              pathname === DASHBOARD_HREF
                ? 'border-h2-500/60 bg-h2-500/10 text-h2-500'
                : 'border-white/15 text-white/85 hover:border-h2-500/60 hover:text-h2-500',
            )}
          >
            <span className="pulse-dot text-h2-500" />
            进入项目大屏
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-white/10 text-white/80 lg:hidden"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-ink-950/95 backdrop-blur-xl lg:hidden">
          <nav className="grid gap-1 px-5 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-baseline justify-between rounded-2xl px-3 py-3 text-[15px] font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-white/10 text-white'
                    : 'text-white/75 hover:bg-white/5 hover:text-white',
                )}
              >
                <span>{item.label}</span>
                <span className="text-[11px] font-normal tracking-wider text-white/45">
                  {item.short}
                </span>
              </Link>
            ))}
            <Link
              href={DASHBOARD_HREF}
              className="mt-2 flex items-center justify-between rounded-2xl border border-h2-500/40 bg-h2-500/10 px-3 py-3 text-[15px] font-medium text-h2-500"
            >
              <span className="pulse-dot text-h2-500">进入项目大屏</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function Logo() {
  return (
    <span
      className="grid size-9 place-items-center rounded-md border border-white/15 bg-gradient-to-br from-h2-500/40 via-emerald-500/20 to-gold-500/20 text-[13px] font-bold tracking-tight text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]"
      aria-hidden="true"
    >
      300
    </span>
  )
}
