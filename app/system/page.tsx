import type { Metadata } from 'next'
import Image from 'next/image'

import { Section } from '@/components/primitives/section'
import { SourceRef } from '@/components/primitives/source-ref'
import {
  BYPRODUCT_VALUE,
  CHARGING,
  DUTY_PROFILE,
  ENERGY_FLOW,
  H2_COST_BRIDGE,
  H2_COST_OPTIMIZED,
  H2_SYSTEM,
  STATIONS,
} from '@/lib/data/system'

export const metadata: Metadata = {
  title: '制储加电',
  description:
    '28 MW 绿氢制储加、三层综合氢成本、3 座加氢站、30 台超充与矿区换电体系（商业计划书 v2.3 第 6-9 章相关口径）。',
}

export default function SystemPage() {
  return (
    <>
      <div className="relative h-[38vh] min-h-[260px]">
        <Image src="/images/h2-plant.png" alt="电解水制氢厂区" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 lg:px-12">
          <p className="eyebrow text-white/60">H₂ PRODUCTION & FUELING · CHAPTER 06-07</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">制氢、储运、加氢与充电体系</h1>
          <SourceRef code="§6 · §7 · §9.2" />
        </div>
      </div>

      <Section eyebrow="SCALE" title="28 MW 制氢系统（按需反推）" source="§9.2.2">
        <div className="grid gap-4 md:grid-cols-3">
          <Stat label="碱性电解槽" value={`${H2_SYSTEM.alkalineMW} MW`} />
          <Stat label="PEM 电解槽" value={`${H2_SYSTEM.pemMW} MW`} />
          <Stat label="年产氢（调度）" value={`${H2_SYSTEM.annualProduction.toLocaleString('zh-CN')} t/年`} />
        </div>
        <p className="mt-6 text-[14px] text-white/65">
          年制氢 {H2_SYSTEM.annualProduction} t 对应 200 台氢车年耗 {H2_SYSTEM.fleetDemand} t +{' '}
          {(H2_SYSTEM.redundancyRatio * 100).toFixed(0)}% 安全冗余；制氢电费按上网电价 {H2_SYSTEM.electricitySourcePrice}{' '}
          元/kWh 公允外购，年电费约 {H2_SYSTEM.annualElectricityCostWan.toLocaleString('zh-CN')} 万元（§9.6.1）。
        </p>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-lg font-semibold text-white">CAPEX 子项（万元）</h3>
          <ul className="mt-4 space-y-2 text-[13px] text-white/70">
            {H2_SYSTEM.capexBreakdownWan.map((c) => (
              <li key={c.id} className="flex justify-between">
                <span>{c.label}</span>
                <span className="font-mono text-white">{c.wan.toLocaleString('zh-CN')}</span>
              </li>
            ))}
            <li className="flex justify-between border-t border-white/10 pt-2 font-semibold text-gold-400">
              <span>小计</span>
              <span className="font-mono">{H2_SYSTEM.totalCapexWan.toLocaleString('zh-CN')}</span>
            </li>
          </ul>
        </div>
      </Section>

      <Section variant="light" eyebrow="H2 COST BRIDGE" title="综合氢成本三层叠加（n=200）" source="§8.2.2">
        <div className="space-y-3">
          {H2_COST_BRIDGE.map((b) => (
            <div
              key={b.id}
              className={`flex items-center justify-between rounded-2xl border border-ink-900/10 px-4 py-3 ${
                b.id === 'total' ? 'bg-ink-900 text-bone-50' : 'bg-white'
              }`}
            >
              <span className="text-[14px]">{b.label}</span>
              <span className="font-mono text-lg font-semibold" style={{ color: b.accent }}>
                {b.value.toFixed(2)} 元/kg
              </span>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-ink-900/10 bg-bone-50 p-6">
          <h3 className="text-sm font-semibold text-ink-900">优化路径（节选）</h3>
          <ul className="mt-3 space-y-2 text-[13px] text-ink-700">
            {H2_COST_OPTIMIZED.map((o) => (
              <li key={o.id}>
                {o.label}：<span className="font-mono font-semibold">{o.value.toFixed(2)} 元/kg</span>
                {'delta' in o && o.delta != null ? (
                  <span className="text-emerald-600">（Δ {o.delta.toFixed(2)}）</span>
                ) : null}
                {'hint' in o && o.hint ? <span className="text-ink-500"> — {o.hint}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="STATIONS" title="三座加氢站" source="§9.2.3">
        <div className="grid gap-4 md:grid-cols-3">
          {STATIONS.map((s) => (
            <div key={s.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-semibold text-h2-500">{s.name}</p>
              <p className="mt-2 text-[13px] text-white/65">
                {s.capacityKgPerDay} kg/天 · {s.pressureMpa} MPa
              </p>
              <p className="mt-2 text-[12px] text-white/45">{s.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="light" eyebrow="CHARGING" title="充电与换电" source="§9.2.4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
            <h3 className="font-semibold text-ink-900">超充桩</h3>
            <p className="mt-2 text-[14px] text-ink-700">
              {CHARGING.superchargers.count} 台 × {CHARGING.superchargers.powerKw} kW · 单价{' '}
              {CHARGING.superchargers.pricePerWan} 万 · 合计 {CHARGING.superchargers.totalWan} 万
            </p>
          </div>
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
            <h3 className="font-semibold text-ink-900">换电站</h3>
            <p className="mt-2 text-[14px] text-ink-700">{CHARGING.swapStation.note}</p>
            <p className="mt-2 font-mono text-ink-800">{CHARGING.swapStation.totalWan} 万元</p>
          </div>
        </div>
        <p className="mt-6 text-center text-[13px] text-ink-600">
          推荐方案中途充电 + 换电峰值约 <strong>{CHARGING.peakLoadMW} MW</strong>（§8.1）。
        </p>
      </Section>

      <Section eyebrow="DUTY" title="工况与内部计价口径" source="§10.2.1">
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="min-w-[800px] w-full border-collapse text-left text-[13px] text-white/75">
            <thead className="bg-white/5 text-white/55">
              <tr>
                <th className="px-4 py-3">场景</th>
                <th className="px-4 py-3">单程 km</th>
                <th className="px-4 py-3">年作业日</th>
                <th className="px-4 py-3">氢/电车队</th>
                <th className="px-4 py-3">年周转量</th>
              </tr>
            </thead>
            <tbody>
              {DUTY_PROFILE.map((d) => (
                <tr key={d.id} className="border-t border-white/10">
                  <td className="px-4 py-2 font-medium text-white">{d.label}</td>
                  <td className="px-4 py-2">{d.distance}</td>
                  <td className="px-4 py-2">{d.workdays}</td>
                  <td className="px-4 py-2">
                    氢 {d.h2Fleet} / 电 {d.evFleet}
                  </td>
                  <td className="px-4 py-2">{d.annualTonKm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section variant="light" eyebrow="BYPRODUCT" title="副产与碳资产（节选）" source="§10.2">
        <div className="grid gap-4 md:grid-cols-3">
          <StatLight label="副产氧气年收入" value={`${BYPRODUCT_VALUE.oxygen.revenueWan} 万`} />
          <StatLight label="CCER 年收益（模型口径）" value={`${BYPRODUCT_VALUE.ccer.annualWan} 万`} />
          <StatLight label="绿证采购成本（约）" value={`${BYPRODUCT_VALUE.greenCert.annualCostWan} 万/年`} />
        </div>
      </Section>

      <Section eyebrow="FLOW" title="能流示意（文字）" source="§2.7.2 · §13.7">
        <ol className="list-decimal space-y-2 pl-5 text-[14px] text-white/70">
          {ENERGY_FLOW.map((e) => (
            <li key={`${e.from}->${e.to}`}>
              {e.from} → {e.to}
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-[12px] text-white/50">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  )
}

function StatLight({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white p-5">
      <p className="text-[12px] text-ink-600">{label}</p>
      <p className="mt-2 text-xl font-semibold text-ink-900">{value}</p>
    </div>
  )
}
