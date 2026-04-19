import type { Metadata } from 'next'
import { Suspense } from 'react'

import { LoginForm } from './login-form'

export const metadata: Metadata = {
  title: '访问验证',
  description: '怀来 300 辆矿山新能源运输车项目官网 · 访问受限',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-950 text-bone-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_-10%,rgba(34,211,238,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_120%,rgba(212,162,76,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col px-5 py-10 lg:px-10 lg:py-12">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-md border border-white/15 bg-gradient-to-br from-h2-500/40 via-emerald-500/20 to-gold-500/20 text-[14px] font-bold tracking-tight text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]">
              300
            </span>
            <div>
              <p className="text-[11px] font-medium tracking-[0.22em] text-white/55">
                中基锡安 · HUAILAI · v2.3
              </p>
              <p className="text-[15px] font-medium tracking-tight text-white">
                怀来矿区 · 300 辆新能源运输车项目
              </p>
            </div>
          </div>
          <p className="hidden font-mono text-[11px] tracking-wider text-white/35 lg:block">
            ACCESS · GATEWAY · LV.1
          </p>
        </header>

        <div className="grid flex-1 items-center gap-12 pt-12 lg:grid-cols-2 lg:pt-0">
          <section className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-h2-500/30 bg-h2-500/10 px-3 py-1 text-[12px] font-medium tracking-[0.16em] text-h2-500">
              CONFIDENTIAL · 仅授权访问
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              本站为商业可行性研究内部站
              <br />
              <span className="bg-gradient-to-r from-h2-500 via-emerald-400 to-gold-400 bg-clip-text text-transparent">
                需访问凭证方可进入
              </span>
            </h1>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/65">
              本站完整呈现「怀来 300 辆矿山新能源运输车项目（v2.3）」的可行性研究、财务模型、技术配比、政策红利、ESG 收益与项目大屏。
              所有数据来自商业计划书 v2.3 第 0 - 14 章，仅供项目相关决策方与监管机构参阅。
            </p>
            <ul className="grid gap-2 text-[13px] text-white/55 sm:grid-cols-2">
              <li className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                · 一次性总投资 <span className="font-mono text-white/85">5.45 亿元</span>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                · 推荐+PPA NPV <span className="font-mono text-gold-400">+1.90 亿</span>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                · IRR <span className="font-mono text-h2-500">12.9%</span>
              </li>
              <li className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                · 年减排 <span className="font-mono text-emerald-400">31,383 tCO₂e</span>
              </li>
            </ul>
          </section>

          <Suspense
            fallback={<div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/50">加载…</div>}
          >
            <LoginForm />
          </Suspense>
        </div>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-5 text-[11px] text-white/35">
          <span>© 怀来中基锡安新型石材科技有限责任公司</span>
          <span className="font-mono">数据口径：商业计划书 v2.3 · 2026-04</span>
        </footer>
      </div>
    </main>
  )
}
