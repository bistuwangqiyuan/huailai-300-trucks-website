import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { SourceRef } from './source-ref'

type SectionProps = {
  id?: string
  eyebrow?: string
  title: string
  lede?: ReactNode
  source?: string
  children?: ReactNode
  className?: string
  variant?: 'dark' | 'light'
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  source,
  children,
  className,
  variant = 'dark',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 py-20 lg:py-28',
        variant === 'light' ? 'bg-bone-50 text-ink-900' : 'bg-ink-950 text-bone-50',
        className,
      )}
    >
      <div className="mx-auto max-w-[1440px] px-5 lg:px-12">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2
            className={cn(
              'text-3xl font-semibold tracking-tight sm:text-4xl',
              variant === 'light' ? 'text-ink-900' : 'text-white',
            )}
          >
            {title}
          </h2>
          {lede && (
            <div
              className={cn(
                'mt-4 text-[16px] leading-relaxed sm:text-lg',
                variant === 'light' ? 'text-ink-700' : 'text-white/70',
              )}
            >
              {lede}
            </div>
          )}
          {source && (
            <div className="mt-4">
              <SourceRef code={source} variant={variant} />
            </div>
          )}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  )
}
