import type { Metadata } from 'next'

import { Section } from '@/components/primitives/section'
import {
  CARBON_BASELINE,
  CARBON_NEW,
  CARBON_SAVING,
  CCER_SCENARIOS,
  EMPLOYMENT,
  EMPLOYMENT_TOTAL,
  ESG_FINANCIAL_VALUE,
  ESG_RATING,
  GREEN_FINANCE_TOOLS,
  INTERNATIONAL,
  REGIONAL_CONTRIBUTION,
} from '@/lib/data/esg'

export const metadata: Metadata = {
  title: 'ESG 与碳收益',
  description:
    '全生命周期碳排、减排量、CCER 三情景、ESG 评级跃迁、绿色金融工具与就业贡献（商业计划书 v2.3 第 12 章）。',
}

export default function EsgPage() {
  return (
    <>
      <div className="border-b border-white/5 bg-gradient-to-br from-emerald-950/40 via-ink-950 to-ink-950 px-5 py-16 lg:px-12 lg:py-24">
        <p className="eyebrow text-white/55">ESG & CARBON · CHAPTER 12</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-5xl">环境、社会、治理与碳收益</h1>
        <p className="mt-4 max-w-2xl text-[15px] text-white/65">
          v2.3 定位：本章为<strong className="text-white">辅助参考</strong>，不参与最终方案排序；主排序仍以商业 ROI 为准（§12 开篇）。
        </p>
        <p className="mt-4 font-mono text-[12px] text-white/40">数据锚点 · §12.1 · §12.10</p>
      </div>

      <Section eyebrow="CARBON" title="全生命周期碳排与减排" source="§12.2">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold text-white">柴油基准</h3>
            <p className="mt-3 text-[14px] text-white/70">
              全队年里程 {CARBON_BASELINE.fleetAnnualKm.toLocaleString('zh-CN')} km/年；全队年排放约{' '}
              <span className="font-mono text-flame-400">{CARBON_BASELINE.annualEmissionTon.toLocaleString('zh-CN')}</span>{' '}
              tCO₂e/年。
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold text-white">新方案（绿证覆盖后）</h3>
            <p className="mt-3 text-[14px] text-white/70">
              氢侧年排放约 {CARBON_NEW.h2.annualEmissionTon.toLocaleString('zh-CN')} tCO₂e；电侧约{' '}
              {CARBON_NEW.ev.annualEmissionTon.toLocaleString('zh-CN')} tCO₂e；合计{' '}
              <span className="font-mono text-h2-500">{CARBON_NEW.totalEmissionTon.toLocaleString('zh-CN')}</span>{' '}
              tCO₂e/年。
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
          <p className="text-[13px] text-emerald-200/90">年减排（v2.3 绿证口径）</p>
          <p className="num-mega mt-2 text-5xl font-semibold text-emerald-300">
            {CARBON_SAVING.annualTon.toLocaleString('zh-CN')}
          </p>
          <p className="mt-2 text-sm text-white/70">
            tCO₂e/年 · 减排率 {(CARBON_SAVING.saveRatio * 100).toFixed(1)}% · 10 年累计{' '}
            {CARBON_SAVING.tenYearAccumTon.toLocaleString('zh-CN')} t
          </p>
        </div>
      </Section>

      <Section variant="light" eyebrow="CCER" title="国家核证自愿减排（CCER）三情景" source="§12.3">
        <div className="grid gap-4 md:grid-cols-3">
          {CCER_SCENARIOS.map((c) => (
            <div
              key={c.name}
              className={`rounded-2xl border p-6 ${
                'recommended' in c && c.recommended
                  ? 'border-emerald-500/40 bg-emerald-50'
                  : 'border-ink-900/10 bg-white'
              }`}
            >
              <p className="text-sm font-semibold text-ink-900">{c.name}</p>
              <p className="mt-3 font-mono text-2xl text-ink-900">{c.annualWan.toLocaleString('zh-CN')} 万/年</p>
              <p className="mt-2 text-[12px] text-ink-600">单价 {c.pricePerTon} 元/t</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="RATING" title="ESG 评级影响" source="§12.4">
        <div className="grid gap-4 md:grid-cols-2">
          {ESG_RATING.map((r) => (
            <div key={r.dim} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[13px] text-white/55">{r.dim}</p>
              <p className="mt-2 text-xl font-semibold text-white">
                {r.before} → <span className="text-emerald-400">{r.after}</span>
                <span className="ml-2 text-sm font-normal text-white/45">{r.delta}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-lg font-semibold text-white">评级提升的财务价值（节选）</h3>
          <ul className="mt-4 space-y-2 text-[14px] text-white/70">
            {ESG_FINANCIAL_VALUE.map((v) => (
              <li key={v.item} className="flex flex-wrap justify-between gap-2 border-b border-white/5 py-2 last:border-0">
                <span>{v.item}</span>
                <span className="font-mono text-white/85">{v.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section variant="light" eyebrow="GREEN FINANCE" title="绿色金融工具符合性" source="§12.5">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[720px] w-full border-collapse text-left text-[13px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-4 py-3">工具</th>
                <th className="px-4 py-3">政策依据</th>
                <th className="px-4 py-3">本项目</th>
              </tr>
            </thead>
            <tbody>
              {GREEN_FINANCE_TOOLS.map((t) => (
                <tr key={t.tool} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-4 py-2 font-medium text-ink-900">{t.tool}</td>
                  <td className="px-4 py-2 text-ink-700">{t.basis}</td>
                  <td className="px-4 py-2 text-ink-700">{t.match}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="EMPLOYMENT" title="就业与区域贡献" source="§12.8">
        <p className="text-[14px] text-white/65">
          直接 + 间接就业约 <span className="font-mono text-gold-400">{EMPLOYMENT_TOTAL}</span> 人。
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EMPLOYMENT.map((e) => (
            <div key={e.role} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[12px] text-white/45">{e.type}</p>
              <p className="mt-1 text-lg font-semibold text-white">{e.role}</p>
              <p className="num-mega mt-2 text-2xl text-h2-500">{e.count}</p>
            </div>
          ))}
        </div>
        <ul className="mt-8 space-y-2 text-[14px] text-white/70">
          {REGIONAL_CONTRIBUTION.map((r) => (
            <li key={r.scope}>
              <strong className="text-white">{r.scope}</strong>：{r.value}（{r.ratio}）
            </li>
          ))}
        </ul>
      </Section>

      <Section variant="light" eyebrow="GLOBAL" title="国际接轨" source="§12.7">
        <div className="space-y-4">
          {INTERNATIONAL.map((i) => (
            <div key={i.framework} className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <p className="text-sm font-semibold text-ink-900">{i.framework}</p>
              <p className="mt-1 text-[12px] text-ink-500">{i.status}</p>
              <p className="mt-3 text-[14px] text-ink-700">{i.match}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
