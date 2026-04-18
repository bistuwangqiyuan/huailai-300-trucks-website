import type { Metadata } from 'next'

import { CapexDonut } from '@/components/charts/capex-donut'
import { CashflowBars } from '@/components/charts/cashflow-bars'
import { RevenueDonut } from '@/components/charts/revenue-donut'
import { Section } from '@/components/primitives/section'
import {
  CAPEX_TOTAL_WAN,
  DIESEL_COMPARISON,
  FINANCE_SCENARIOS,
  FUNDING_SOURCES,
  H2_INSURANCE,
  OPEX_BREAKDOWN,
  OPEX_KEY_LINES,
  OPEX_TOTAL_WAN,
  PEER_COMPARISON,
  SENSITIVITY,
  UNIT_COST,
} from '@/lib/data/finance'

export const metadata: Metadata = {
  title: '投资与财务',
  description:
    'CAPEX 5.45 亿、OPEX 2.31 亿/年、氢险归集、情景 NPV/IRR/DPP、10 年现金流、敏感性与同类对标（商业计划书 v2.3 第 9-11 章）。',
}

export default function FinancePage() {
  return (
    <>
      <div className="border-b border-white/5 bg-gradient-to-br from-ink-900 via-ink-950 to-ink-950 px-5 py-16 lg:px-12 lg:py-24">
        <p className="eyebrow text-white/55">FINANCE · CHAPTER 09-10</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">投资估算与财务评价</h1>
        <p className="mt-4 max-w-2xl text-[15px] text-white/65">
          评价期 10 年、折现率基准 8%（绿色信贷情景 6%）、所得税基准 25%（西部大开发优惠 15%）。一次性总投资{' '}
          <span className="font-mono text-gold-400">{(CAPEX_TOTAL_WAN / 10000).toFixed(2)} 亿元</span>
          ；年运营成本 <span className="font-mono text-h2-500">{OPEX_TOTAL_WAN.toLocaleString('zh-CN')} 万</span>。
        </p>
        <p className="mt-4 font-mono text-[12px] text-white/40">数据锚点 · §9.1 · §10.1</p>
      </div>

      <Section eyebrow="CAPEX" title="一次性总投资结构" source="§9.1">
        <div className="grid gap-8 lg:grid-cols-2">
          <CapexDonut />
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold text-white">资金来源建议</h3>
            <ul className="mt-4 space-y-2 text-[13px] text-white/70">
              {FUNDING_SOURCES.map((f) => (
                <li key={f.id} className="flex justify-between">
                  <span>{f.label}</span>
                  <span className="font-mono">
                    {(f.ratio * 100).toFixed(0)}% · {f.wan.toLocaleString('zh-CN')} 万
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section variant="light" eyebrow="OPEX" title="年运营成本拆解" source="§9.4 · §9.6">
        <div className="grid gap-4 md:grid-cols-3">
          {OPEX_BREAKDOWN.map((o) => (
            <div key={o.id} className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <p className="text-[13px] text-ink-600">{o.label}</p>
              <p className="num-mega mt-2 text-3xl font-semibold text-ink-900">
                {o.wan.toLocaleString('zh-CN')}
                <span className="text-base font-normal text-ink-500"> 万/年</span>
              </p>
              <p className="mt-2 text-[12px] text-ink-500">{(o.ratio * 100).toFixed(1)}%</p>
            </div>
          ))}
        </div>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[720px] w-full border-collapse text-left text-[12px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-3 py-2">子项</th>
                <th className="px-3 py-2">万元/年</th>
                <th className="px-3 py-2">占比</th>
              </tr>
            </thead>
            <tbody>
              {OPEX_KEY_LINES.map((l) => (
                <tr key={l.id} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-3 py-2 text-ink-800">{l.label}</td>
                  <td className="px-3 py-2 font-mono text-ink-900">{l.wan.toLocaleString('zh-CN')}</td>
                  <td className="px-3 py-2">{(l.ratio * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 rounded-2xl border border-ink-900/10 bg-bone-100 p-6">
          <h3 className="text-sm font-semibold text-ink-900">氢相关综合险归集（用户口径 10%）</h3>
          <p className="mt-2 text-[13px] text-ink-700">
            合计资产值 {H2_INSURANCE.totalAssetWan.toLocaleString('zh-CN')} 万 → 年保费{' '}
            {H2_INSURANCE.annualPremiumWan.toLocaleString('zh-CN')} 万（§9.5）。
          </p>
        </div>
      </Section>

      <Section eyebrow="REVENUE" title="示范期收入结构" source="§10.2">
        <RevenueDonut />
      </Section>

      <Section variant="light" eyebrow="SCENARIOS" title="情景门槛矩阵" source="§10.5">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[900px] w-full border-collapse text-left text-[12px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-3 py-2">情景</th>
                <th className="px-3 py-2">NPV（万）</th>
                <th className="px-3 py-2">IRR</th>
                <th className="px-3 py-2">DPP</th>
                <th className="px-3 py-2">投入产出比</th>
              </tr>
            </thead>
            <tbody>
              {FINANCE_SCENARIOS.map((s) => (
                <tr key={s.id} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-3 py-2 font-medium text-ink-900">{s.label}</td>
                  <td className="px-3 py-2 font-mono">{s.npvWan.toLocaleString('zh-CN')}</td>
                  <td className="px-3 py-2">{s.irr == null ? '—' : `${s.irr}%`}</td>
                  <td className="px-3 py-2">{s.dpp}</td>
                  <td className="px-3 py-2 font-mono">{s.payoff}×</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="CASHFLOW" title="基准情景 10 年净现金流（万元）" source="§10.3">
        <CashflowBars />
        <p className="mt-4 text-center text-[12px] text-white/45">
          第 10 年含残值 8,200 万；折旧简化 10 年线性（§10.3 / §10.8）。
        </p>
      </Section>

      <Section variant="light" eyebrow="SENSITIVITY" title="单变量临界值" source="§10.10.1">
        <div className="grid gap-3 md:grid-cols-2">
          {SENSITIVITY.map((s) => (
            <div key={s.var} className="rounded-2xl border border-ink-900/10 bg-white p-5">
              <p className="text-sm font-semibold text-ink-900">{s.var}</p>
              <p className="mt-2 font-mono text-lg text-h2-600">{s.critical}</p>
              <p className="mt-1 text-[12px] text-ink-600">{s.distance} · {s.meaning}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="PEERS" title="与同类项目对比" source="§10.11">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[720px] w-full border-collapse text-left text-[13px] text-white/75">
            <thead className="bg-white/5 text-white/55">
              <tr>
                <th className="px-4 py-3">项目</th>
                <th className="px-4 py-3">规模</th>
                <th className="px-4 py-3">总投资（亿）</th>
                <th className="px-4 py-3">NPV（亿）</th>
                <th className="px-4 py-3">IRR</th>
              </tr>
            </thead>
            <tbody>
              {PEER_COMPARISON.map((p) => (
                <tr key={p.name} className="border-t border-white/10">
                  <td className="px-4 py-2 font-medium text-white">{p.name}</td>
                  <td className="px-4 py-2">{p.scale}</td>
                  <td className="px-4 py-2 font-mono">{p.capexY}</td>
                  <td className="px-4 py-2 font-mono">{p.npvY}</td>
                  <td className="px-4 py-2">{p.irr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section variant="light" eyebrow="DIESEL" title="与柴油基准对比（节选）" source="§9.7">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[640px] w-full border-collapse text-left text-[13px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-4 py-3">项目</th>
                <th className="px-4 py-3">新方案</th>
                <th className="px-4 py-3">柴油</th>
                <th className="px-4 py-3">差额</th>
              </tr>
            </thead>
            <tbody>
              {DIESEL_COMPARISON.map((r) => (
                <tr key={r.item} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-4 py-2 font-medium text-ink-900">{r.item}</td>
                  <td className="px-4 py-2 font-mono text-ink-800">{r.new.toLocaleString('zh-CN')}</td>
                  <td className="px-4 py-2 font-mono text-ink-800">{r.diesel.toLocaleString('zh-CN')}</td>
                  <td className="px-4 py-2 font-mono text-ink-800">{r.delta.toLocaleString('zh-CN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-[14px] text-ink-700">
          单位运输成本（含折旧）新方案 <strong>{UNIT_COST.newWithDepreciation}</strong> 元/吨·km vs 柴油{' '}
          <strong>{UNIT_COST.diesel}</strong> 元/吨·km，节约约 <strong>{(UNIT_COST.savingRatio * 100).toFixed(0)}%</strong>（§9.8）。
        </p>
      </Section>
    </>
  )
}
