import type { Metadata } from 'next'
import Image from 'next/image'

import { MixRadar } from '@/components/charts/mix-radar'
import { Section } from '@/components/primitives/section'
import { SourceRef } from '@/components/primitives/source-ref'
import {
  H2_COST_BY_N,
  MIX_ENUMERATION,
  RECOMMEND_ARGS,
  ROBUSTNESS,
  TECH_COMPARE,
} from '@/lib/data/technology'

export const metadata: Metadata = {
  title: '技术与配比',
  description:
    '氢电技术路线对比、配比枚举可行域、综合氢成本摊薄、商业 ROI 雷达与稳健性测试（商业计划书 v2.3 第 4 / 8 章）。',
}

export default function TechnologyPage() {
  return (
    <>
      <div className="relative h-[36vh] min-h-[240px]">
        <Image src="/images/h2-plant.png" alt="制氢系统概念示意图" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/8 to-ink-950/55" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 lg:px-12">
          <p className="eyebrow text-white/60">TECHNOLOGY & MIX · CHAPTER 08</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">技术路线与最优配比</h1>
          <SourceRef code="§8.1 · §8.3" />
        </div>
      </div>

      <Section eyebrow="COMPARE" title="氢能重卡 vs 电动重卡" source="§4.x（对照第 8 章工况结论）">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[800px] w-full border-collapse text-left text-[13px]">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="px-4 py-3">维度</th>
                <th className="px-4 py-3">氢能</th>
                <th className="px-4 py-3">电动</th>
                <th className="px-4 py-3">相对优势</th>
              </tr>
            </thead>
            <tbody>
              {TECH_COMPARE.map((r) => (
                <tr key={r.dim} className="border-t border-white/10 text-white/75">
                  <td className="px-4 py-3 font-medium text-white">{r.dim}</td>
                  <td className="px-4 py-3">{r.h2}</td>
                  <td className="px-4 py-3">{r.ev}</td>
                  <td className="px-4 py-3 text-h2-500">{r.winner === 'h2' ? '氢能' : '电动'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section variant="light" eyebrow="ENUMERATION" title="配比枚举与工程可行域" source="§8.3">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[960px] w-full border-collapse text-left text-[12px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-3 py-3">n 氢</th>
                <th className="px-3 py-3">中途电</th>
                <th className="px-3 py-3">矿区电</th>
                <th className="px-3 py-3">年综合成本（万）</th>
                <th className="px-3 py-3">H₂ 需求（t）</th>
                <th className="px-3 py-3">充电峰值 MW</th>
                <th className="px-3 py-3">可行</th>
              </tr>
            </thead>
            <tbody>
              {MIX_ENUMERATION.map((m) => (
                <tr
                  key={m.nH2}
                  className={`border-t border-ink-900/10 odd:bg-white even:bg-bone-50 ${
                    'recommended' in m && m.recommended ? 'bg-cyan-50' : ''
                  }`}
                >
                  <td className="px-3 py-2 font-mono text-ink-900">{m.nH2}</td>
                  <td className="px-3 py-2 font-mono">{m.nEvTrunk}</td>
                  <td className="px-3 py-2 font-mono">{m.nEvMine}</td>
                  <td className="px-3 py-2 font-mono">{m.costWan.toLocaleString('zh-CN')}</td>
                  <td className="px-3 py-2 font-mono">{m.h2Demand.toLocaleString('zh-CN')}</td>
                  <td className="px-3 py-2 font-mono">{m.chargingPeakMW}</td>
                  <td className="px-3 py-2">{m.feasible ? '✓' : '✗'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="H2 COST" title="综合氢成本随 n_氢 摊薄" source="§8.2.2">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[720px] w-full border-collapse text-left text-[13px] text-white/75">
            <thead className="bg-white/5 text-white/55">
              <tr>
                <th className="px-4 py-3">n</th>
                <th className="px-4 py-3">基准</th>
                <th className="px-4 py-3">制氢摊薄</th>
                <th className="px-4 py-3">加氢摊薄</th>
                <th className="px-4 py-3">氢险摊薄</th>
                <th className="px-4 py-3">综合（元/kg）</th>
              </tr>
            </thead>
            <tbody>
              {H2_COST_BY_N.map((r) => (
                <tr key={r.n} className="border-t border-white/10">
                  <td className="px-4 py-2 font-mono">{r.n}</td>
                  <td className="px-4 py-2">{r.baseline}</td>
                  <td className="px-4 py-2">{r.h2Cap}</td>
                  <td className="px-4 py-2">{r.stationCap}</td>
                  <td className="px-4 py-2">{r.insurance}</td>
                  <td className="px-4 py-2 font-semibold text-gold-400">{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section variant="light" eyebrow="RADAR" title="商业 ROI 综合得分雷达" source="§8.3.2">
        <MixRadar />
        <p className="mt-6 text-[12px] text-ink-600">
          说明：雷达中的「投入产出比 / 动态回收期」为归一化对比分；300 全氢原始投入产出比为负、回收期大于 10 年，图中为可视化下限处理。
        </p>
      </Section>

      <Section eyebrow="ARGS" title="推荐解六大论据" source="§8.8">
        <div className="grid gap-4 md:grid-cols-2">
          {RECOMMEND_ARGS.map((a) => (
            <div key={a.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold text-gold-400">{a.title}</p>
              <p className="mt-3 text-[14px] text-white/70">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="light" eyebrow="ROBUST" title="稳健性扰动" source="§8.4">
        <div className="grid gap-3 md:grid-cols-2">
          {ROBUSTNESS.map((r) => (
            <div
              key={r.case}
              className={`rounded-2xl border p-5 ${
                'accent' in r && r.accent
                  ? 'border-h2-500/40 bg-h2-500/10'
                  : 'border-ink-900/10 bg-white'
              }`}
            >
              <p className="text-sm font-semibold text-ink-900">{r.case}</p>
              <p className="mt-2 font-mono text-lg text-ink-900">{r.cost.toLocaleString('zh-CN')} 万</p>
              <p className="mt-1 text-[12px] text-ink-600">
                Δ {r.delta.toLocaleString('zh-CN')} 万 · {r.status}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
