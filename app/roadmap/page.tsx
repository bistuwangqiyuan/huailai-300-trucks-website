import type { Metadata } from 'next'

import { Section } from '@/components/primitives/section'
import { SourceRef } from '@/components/primitives/source-ref'
import { cn } from '@/lib/utils'
import { DIGITAL_SYSTEMS, OPERATION_KPI, PHASES, TENDERS } from '@/lib/data/roadmap'

export const metadata: Metadata = {
  title: '实施路径',
  description: '三阶段实施、关键里程碑、EPC 标段划分、数字化系统与运营 KPI（商业计划书 v2.3 第 13 章）。',
}

export default function RoadmapPage() {
  return (
    <>
      <div className="border-b border-white/5 bg-gradient-to-br from-ink-900 to-ink-950 px-5 py-16 lg:px-12 lg:py-24">
        <p className="eyebrow text-white/55">ROADMAP · CHAPTER 13</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">实施路径与里程碑</h1>
        <p className="mt-4 max-w-2xl text-[15px] text-white/65">
          建设期 24 个月：试点（第 1 年）→ 放量（第 2-3 年）→ 替代与稳态运营（第 4-10 年）。制氢 28 MW 严格按车队需求 ×110% 反推，不规划对外氢气销售。
        </p>
        <SourceRef code="§13.1 · §13.4" />
      </div>

      {PHASES.map((p, idx) => (
        <Section key={p.id} variant={idx % 2 === 1 ? 'light' : 'dark'} eyebrow={p.shortName} title={p.name} source="§13.2-13.4">
          <p
            className={cn(
              'mb-6 text-[14px]',
              idx % 2 === 1 ? 'text-ink-700' : 'text-white/65',
            )}
          >
            {p.yearsLabel} · 阶段投资 {p.capexWan.toLocaleString('zh-CN')} 万（占总投资 {(p.capexRatio * 100).toFixed(1)}%）
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            <div
              className={cn(
                'rounded-2xl border p-6',
                idx % 2 === 1 ? 'border-ink-900/10 bg-white' : 'border-white/10 bg-white/[0.03]',
              )}
            >
              <h3
                className={cn(
                  'text-sm font-semibold tracking-wide',
                  idx % 2 === 1 ? 'text-ink-800' : 'text-white/80',
                )}
              >
                阶段目标
              </h3>
              <ul
                className={cn(
                  'mt-3 list-disc space-y-2 pl-5 text-[13px]',
                  idx % 2 === 1 ? 'text-ink-700' : 'text-white/80',
                )}
              >
                {p.goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <div
              className={cn(
                'rounded-2xl border p-6',
                idx % 2 === 1 ? 'border-ink-900/10 bg-white' : 'border-white/10 bg-white/[0.03]',
              )}
            >
              <h3
                className={cn(
                  'text-sm font-semibold tracking-wide',
                  idx % 2 === 1 ? 'text-ink-800' : 'text-white/80',
                )}
              >
                关键里程碑
              </h3>
              <ul
                className={cn(
                  'mt-3 space-y-2 text-[12px]',
                  idx % 2 === 1 ? 'text-ink-700' : 'text-white/80',
                )}
              >
                {p.milestones.map((m) => (
                  <li key={m.date} className="flex gap-2">
                    <span
                      className={cn(
                        'shrink-0 font-mono',
                        idx % 2 === 1 ? 'text-ink-500' : 'text-white/45',
                      )}
                    >
                      {m.date}
                    </span>
                    <span>
                      {m.title} — {m.output}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      ))}

      <Section eyebrow="TENDERS" title="EPC 标段划分" source="§13.5.1">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[900px] w-full border-collapse text-left text-[12px] text-white/75">
            <thead className="bg-white/5 text-white/55">
              <tr>
                <th className="px-3 py-2">标段</th>
                <th className="px-3 py-2">内容</th>
                <th className="px-3 py-2">预算（万）</th>
                <th className="px-3 py-2">推荐供应商</th>
              </tr>
            </thead>
            <tbody>
              {TENDERS.map((t) => (
                <tr key={t.id} className="border-t border-white/10">
                  <td className="px-3 py-2 font-medium text-white">{t.name}</td>
                  <td className="px-3 py-2">{t.desc}</td>
                  <td className="px-3 py-2 font-mono">
                    {t.wan.toLocaleString('zh-CN')}
                    {'note' in t && t.note ? ` ${t.note}` : ''}
                  </td>
                  <td className="px-3 py-2">{t.suppliers.join(' / ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section variant="light" eyebrow="DIGITAL" title="数字化系统投资包" source="§13.7.1">
        <ul className="grid gap-3 md:grid-cols-2">
          {DIGITAL_SYSTEMS.map((d) => (
            <li key={d.name} className="rounded-2xl border border-ink-900/10 bg-white p-5">
              <p className="font-semibold text-ink-900">{d.name}</p>
              <p className="mt-2 text-[13px] text-ink-700">{d.func}</p>
              <p className="mt-3 font-mono text-sm text-ink-600">
                {'included' in d && d.included ? '已含于 CAPEX' : `${d.wan} 万`}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="KPI" title="稳态运营 KPI（节选）" source="§13.4.3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OPERATION_KPI.map((k) => (
            <div
              key={k.metric}
              className={`rounded-2xl border p-4 ${
                'accent' in k && k.accent
                  ? 'border-flame-500/40 bg-flame-500/10'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <p className="text-[12px] text-white/50">{k.metric}</p>
              <p className="mt-2 text-sm font-semibold text-white">{k.target}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
