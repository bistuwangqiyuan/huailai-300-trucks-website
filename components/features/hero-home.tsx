'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

import { KpiCard } from '@/components/primitives/kpi-card'
import { HEADLINE_KPIS, PROJECT } from '@/lib/data/project'

export function HeroHome() {
  const reduce = useReducedMotion()
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-mining.png"
          alt="怀来矿区新能源重卡与风光基地概念示意图（AI 生成）"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/80 to-ink-950" />
        <div className="absolute inset-0 bg-grid-fine opacity-40" />
        <div className="absolute inset-0 radial-highlight" />
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-[1440px] flex-col justify-end px-5 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] font-medium tracking-[0.16em] text-white/70">
            <Sparkles className="size-3.5 text-h2-500" aria-hidden />
            {PROJECT.hero.eyebrow}
          </p>
          <h1 className="mt-6 whitespace-pre-line text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {PROJECT.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/75 sm:text-lg">
            {PROJECT.hero.lede}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/finance"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-ink-950 transition hover:bg-bone-100"
            >
              查看商业可行性
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[14px] font-medium text-white transition hover:border-h2-500/50 hover:text-h2-500"
            >
              进入项目大屏
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {HEADLINE_KPIS.map((kpi, i) => (
            <KpiCard key={kpi.id} kpi={kpi} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
