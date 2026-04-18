'use client'

import { motion, useReducedMotion } from 'framer-motion'

import type { Kpi } from '@/lib/data/project'
import { cn, fmt } from '@/lib/utils'

const toneMap: Record<NonNullable<Kpi['tone']>, string> = {
  gold: 'from-gold-500/25 to-transparent text-gold-400',
  h2: 'from-h2-500/25 to-transparent text-h2-500',
  ev: 'from-ev-500/25 to-transparent text-ev-500',
  emerald: 'from-emerald-500/25 to-transparent text-emerald-400',
  flame: 'from-flame-500/25 to-transparent text-flame-400',
  neutral: 'from-white/10 to-transparent text-white',
}

export function KpiCard({ kpi, index = 0 }: { kpi: Kpi; index?: number }) {
  const reduce = useReducedMotion()
  const tone = kpi.tone ?? 'neutral'

  const displayValue =
    typeof kpi.value === 'number'
      ? kpi.value >= 1000 && kpi.unit?.includes('t')
        ? fmt(kpi.value, 0)
        : fmt(kpi.value, kpi.value < 20 && kpi.unit === '亿元' ? 2 : 1)
      : kpi.value

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="glass group relative overflow-hidden rounded-2xl p-5"
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70',
          toneMap[tone],
        )}
      />
      <div className="relative">
        <p className="text-[12px] font-medium tracking-wide text-white/55">{kpi.label}</p>
        <div className="mt-3 flex items-baseline gap-1.5">
          {kpi.prefix && (
            <span className="num-mega text-2xl font-semibold text-gold-400">{kpi.prefix}</span>
          )}
          <span className="num-mega text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {displayValue}
          </span>
          {kpi.unit && (
            <span className="text-[13px] font-medium text-white/45">{kpi.unit}</span>
          )}
        </div>
        {kpi.delta && (
          <p className="mt-2 text-[12px] text-white/45">{kpi.delta}</p>
        )}
        {kpi.hint && (
          <p className="mt-2 text-[12px] text-white/50">{kpi.hint}</p>
        )}
        <p className="mt-4 font-mono text-[11px] tracking-wider text-white/35">{kpi.src}</p>
      </div>
    </motion.div>
  )
}
