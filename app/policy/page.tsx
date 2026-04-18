import type { Metadata } from 'next'
import Image from 'next/image'

import { Section } from '@/components/primitives/section'
import { SourceRef } from '@/components/primitives/source-ref'
import {
  ENERGY_TRENDS,
  MARKET_BEV,
  MARKET_ELECTROLYZER,
  MARKET_FCEV,
  MARKET_STATION,
  POLICY_DIVIDEND,
  POLICY_LEVELS,
  POLICY_RISKS,
} from '@/lib/data/policy'

export const metadata: Metadata = {
  title: '市场与政策',
  description:
    '国家 / 省 / 市 / 县四级政策叠加、示范期约 1.7 亿元政策资金拆解、行业市场格局与能源价格趋势（商业计划书 v2.3 第 3 章）。',
}

export default function PolicyPage() {
  return (
    <>
      <div className="relative h-[36vh] min-h-[240px]">
        <Image src="/images/ev-charging.png" alt="充电基础设施概念示意图" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/8 to-ink-950/50" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 lg:px-12">
          <p className="eyebrow text-white/60">MARKET & POLICY · CHAPTER 03</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">市场与政策环境</h1>
          <SourceRef code="§3.1 · §3.10" />
        </div>
      </div>

      <Section eyebrow="POLICY STACK" title="四级政策叠加" source="§3.1 - §3.4">
        <div className="space-y-6">
          {POLICY_LEVELS.map((lvl) => (
            <div key={lvl.level} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold" style={{ color: lvl.color }}>
                {lvl.level}
              </h3>
              <ul className="mt-4 space-y-3">
                {lvl.items.map((it) => (
                  <li key={it.name} className="border-l-2 border-white/10 pl-4 text-[14px] text-white/75">
                    <p className="font-medium text-white">{it.name}</p>
                    <p className="mt-1 text-[13px] text-white/55">
                      {it.org} · {it.date}
                    </p>
                    <p className="mt-1 text-[13px] text-white/65">{it.point}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="light" eyebrow="SUBSIDY" title="示范期政策资金拆解（约 1.7 亿元）" source="§3.10">
        <div className="grid gap-4 md:grid-cols-3">
          {POLICY_DIVIDEND.items.map((i) => (
            <div key={i.id} className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <p className="text-[13px] text-ink-600">{i.label}</p>
              <p className="num-mega mt-2 text-3xl font-semibold text-ink-900">
                {(i.wan / 10000).toFixed(2)} 亿
              </p>
              <p className="mt-2 text-[12px] text-ink-500">{i.calc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[13px] text-ink-600">
          合计约 {(POLICY_DIVIDEND.totalWan / 10000).toFixed(2)} 亿元（与商业计划书第 3.10 节口径一致）。
        </p>
      </Section>

      <Section eyebrow="MARKET" title="行业市场格局（2026 一季度）" source="§3.5">
        <div className="grid gap-6 lg:grid-cols-2">
          <MarketTable title="氢能重卡" rows={MARKET_FCEV} />
          <MarketTable title="电动重卡" rows={MARKET_BEV} />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold text-white">电解槽</h3>
            <table className="mt-4 w-full text-left text-[13px] text-white/75">
              <tbody>
                {MARKET_ELECTROLYZER.map((r) => (
                  <tr key={r.type} className="border-t border-white/10">
                    <td className="py-2 font-medium text-white">{r.type}</td>
                    <td className="py-2">{r.share}</td>
                    <td className="py-2">{r.priceMW}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <MarketTable title="加氢站" rows={MARKET_STATION} />
        </div>
      </Section>

      <Section variant="light" eyebrow="PRICES" title="替代能源价格趋势" source="§3.6">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[720px] w-full border-collapse text-left text-[13px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-4 py-3">能源</th>
                <th className="px-4 py-3">2026 当前</th>
                <th className="px-4 py-3">2030 预测</th>
                <th className="px-4 py-3">趋势</th>
              </tr>
            </thead>
            <tbody>
              {ENERGY_TRENDS.map((e) => (
                <tr key={e.name} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-4 py-3 font-medium text-ink-900">{e.name}</td>
                  <td className="px-4 py-3 text-ink-800">{e.cur}</td>
                  <td className="px-4 py-3 text-ink-800">{e.y2030}</td>
                  <td className="px-4 py-3 text-ink-700">{e.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="RISKS" title="政策风险与应对" source="§3.9">
        <div className="grid gap-4 md:grid-cols-2">
          {POLICY_RISKS.map((r) => (
            <div key={r.risk} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-white">{r.risk}</p>
              <p className="mt-2 text-[12px] text-white/50">
                概率 {r.prob} · 影响 {r.impact}
              </p>
              <p className="mt-3 text-[13px] text-white/70">应对：{r.mitigation}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}

function MarketTable({
  title,
  rows,
}: {
  title: string
  rows: readonly { metric: string; value: string; accent?: boolean }[]
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2">
        {rows.map((r) => (
          <li
            key={r.metric}
            className={`flex justify-between gap-4 border-b border-white/5 py-2 text-[13px] last:border-0 ${
              r.accent ? 'text-gold-400' : 'text-white/70'
            }`}
          >
            <span className="text-white/55">{r.metric}</span>
            <span className="text-right font-medium">{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
