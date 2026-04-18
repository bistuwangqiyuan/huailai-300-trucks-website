import type { Metadata } from 'next'
import Image from 'next/image'

import { Section } from '@/components/primitives/section'
import { RedlineCallout } from '@/components/primitives/redline-callout'
import { SourceRef } from '@/components/primitives/source-ref'
import {
  CLIMATE,
  INFRA_REUSE,
  LAND_USE_PROJECT,
  LAND_USE_PROJECT_TOTAL,
  LAND_USE_TOP,
  MINING_RIGHTS,
  POWER_STATION_1GW,
  SITE_DISTANCES,
  SITE_LOCATION,
  WATER,
} from '@/lib/data/site'
import { V23_REDLINES } from '@/lib/data/project'

export const metadata: Metadata = {
  title: '厂址与资源',
  description:
    '怀来县土木镇区位、气候、土地、水资源、电网接入与 1 GW 风光电站独立资产边界（商业计划书 v2.3 第 2 章）。',
}

export default function SitePage() {
  return (
    <>
      <div className="relative h-[40vh] min-h-[260px]">
        <Image src="/images/h2-station.png" alt="加氢站概念示意图" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 lg:px-12">
          <p className="eyebrow text-white/60">SITE & RESOURCES · CHAPTER 02</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">厂址、资源与既有资产</h1>
          <SourceRef code="§2.1 · §2.3" />
        </div>
      </div>

      <Section eyebrow="LOCATION" title="区位与交通" source="§2.1 · §2.8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[14px] text-white/70">
              {SITE_LOCATION.province}
              {SITE_LOCATION.city}
              {SITE_LOCATION.county}
              {SITE_LOCATION.town}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">{SITE_LOCATION.detail}</p>
            <p className="mt-4 font-mono text-[13px] text-white/50">
              约 N {SITE_LOCATION.lat}°, E {SITE_LOCATION.lng}° · 海拔 {SITE_LOCATION.altitude}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <ul className="space-y-2 text-[14px] text-white/75">
              {SITE_DISTANCES.map((d) => (
                <li key={d.label} className="flex justify-between border-b border-white/5 py-2 last:border-0">
                  <span className="text-white/55">{d.label}</span>
                  <span className="font-mono text-h2-500">{d.km} km</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section variant="light" eyebrow="CLIMATE" title="气候与自然条件" source="§2.2">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[720px] w-full border-collapse text-left text-[13px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-4 py-3">指标</th>
                <th className="px-4 py-3">数值</th>
                <th className="px-4 py-3">对项目影响</th>
              </tr>
            </thead>
            <tbody>
              {CLIMATE.map((c) => (
                <tr key={c.metric} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-4 py-3 font-medium text-ink-900">{c.metric}</td>
                  <td className="px-4 py-3 text-ink-800">{c.value}</td>
                  <td className="px-4 py-3 text-ink-700">{c.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="1 GW STATION" title="1 GW 风光互补电站（独立资产，出项目边界）" source="§2.3">
        <RedlineCallout title="v2.3 四条红线（节选）" lines={V23_REDLINES} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-semibold text-white">装机与年发电量（背景信息）</h3>
            <ul className="mt-3 space-y-2 text-[13px] text-white/70">
              {POWER_STATION_1GW.plates.map((p) => (
                <li key={p.type}>
                  {p.type} {p.mw} MW · 年利用 {p.hours} h · 年发电 {(p.twh * 10).toFixed(1)} 亿 kWh
                </li>
              ))}
              <li className="font-semibold text-gold-400">合计年发电 {POWER_STATION_1GW.totalAnnualGenerationTwh * 10} 亿 kWh</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-sm font-semibold text-white">消纳口径（仅信息呈现）</h3>
            <p className="mt-3 text-[13px] text-white/65">
              电网消纳 {POWER_STATION_1GW.consumption.gridAbsorbed.ratio * 100}% ≈{' '}
              {(POWER_STATION_1GW.consumption.gridAbsorbed.twh * 10).toFixed(2)} 亿 kWh；富余{' '}
              {(POWER_STATION_1GW.consumption.surplus.twh * 10).toFixed(2)} 亿 kWh 全部按上网电价上网。
            </p>
            <p className="mt-4 text-[12px] text-h2-500">{POWER_STATION_1GW.ppaOption.note}</p>
          </div>
        </div>
      </Section>

      <Section variant="light" eyebrow="LAND" title="土地与矿权" source="§2.4 · §2.5">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-ink-900">1 万亩储备地结构</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink-700">
              {LAND_USE_TOP.map((l) => (
                <li key={l.id} className="flex justify-between">
                  <span>{l.label}</span>
                  <span className="font-mono">
                    {l.acre} 亩（{(l.ratio * 100).toFixed(0)}%）
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-ink-900">本项目用地 {LAND_USE_PROJECT_TOTAL} 亩</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink-700">
              {LAND_USE_PROJECT.map((l) => (
                <li key={l.id} className="flex justify-between">
                  <span>{l.label}</span>
                  <span className="font-mono">{l.acre} 亩</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-ink-900/10 bg-white p-6">
          <h3 className="text-lg font-semibold text-ink-900">矿权与采掘</h3>
          <p className="mt-3 text-[14px] text-ink-700">{MINING_RIGHTS.type}</p>
          <p className="mt-2 text-[14px] text-ink-700">设计年产能：{MINING_RIGHTS.capacityRange}</p>
          <p className="mt-2 text-[14px] text-ink-700">{MINING_RIGHTS.workfaces}</p>
        </div>
      </Section>

      <Section eyebrow="WATER & GRID" title="水与电网接入" source="§2.6 · §2.7">
        <div className="grid gap-4 md:grid-cols-2">
          {WATER.map((w) => (
            <div key={w.metric} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[12px] text-white/50">{w.metric}</p>
              <p className="mt-2 text-[15px] text-white">{w.value}</p>
              <p className="mt-2 text-[13px] text-white/55">{w.impact}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="light" eyebrow="INFRA" title="既有基础设施复用" source="§2.9">
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[640px] w-full border-collapse text-left text-[13px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-4 py-3">项目</th>
                <th className="px-4 py-3">现状</th>
                <th className="px-4 py-3">复用</th>
              </tr>
            </thead>
            <tbody>
              {INFRA_REUSE.map((r) => (
                <tr key={r.item} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-4 py-3 font-medium text-ink-900">{r.item}</td>
                  <td className="px-4 py-3 text-ink-700">{r.status}</td>
                  <td className="px-4 py-3 text-ink-700">{r.reuse ? '是' : '否'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}
