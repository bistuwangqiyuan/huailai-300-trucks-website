import type { Metadata } from 'next'
import Image from 'next/image'

import { Section } from '@/components/primitives/section'
import { SourceRef } from '@/components/primitives/source-ref'
import { PROJECT } from '@/lib/data/project'
import { ALTERNATIVES, GENESIS, GOALS_V23 } from '@/lib/data/overview'

export const metadata: Metadata = {
  title: '项目概览',
  description: '业主单位、项目缘起、目标体系、替代方案对比与张家口示范协同（商业计划书 v2.3 第 1 章）。',
}

export default function OverviewPage() {
  return (
    <>
      <div className="relative h-[42vh] min-h-[280px] w-full">
        <Image
          src="/images/hero-mining.png"
          alt="矿区运输与新能源重卡概念示意图"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 lg:px-12">
          <p className="eyebrow text-white/60">OVERVIEW · CHAPTER 01</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">项目背景与战略机遇</h1>
          <p className="mt-3 max-w-2xl text-[15px] text-white/70">
            v2.3 将项目重新定位为纯商业项目：以 NPV / IRR / 投入产出比为第一排序依据，战略目标与 ESG
            作为辅助参考。
          </p>
          <SourceRef code="§1.1 · §1.3" />
        </div>
      </div>

      <Section
        eyebrow="OWNER"
        title={PROJECT.owner.name}
        lede="位于河北省张家口市怀来县土木镇，具备矿权、石材深加工与矿区综合运输能力。"
        source="§1.1"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {PROJECT.owner.business.map((b) => (
            <div key={b} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[14px] text-white/75">
              {b}
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-white/50">
          资源禀赋中的「1 GW 风光互补电站」为集团兄弟公司独立核算资产，按 v2.3 电氢完全分离原则
          <strong className="text-white/80"> 出本项目财务边界</strong>，不作为本项目绿电补贴来源叙事。
        </p>
      </Section>

      <Section
        variant="light"
        eyebrow="GENESIS"
        title="项目缘起：柴油成本压力与三重外部条件"
        source="§1.2"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
            <h3 className="text-lg font-semibold text-ink-900">柴油基准（对照口径）</h3>
            <ul className="mt-4 space-y-2 text-[14px] text-ink-700">
              <li>年油耗约 {GENESIS.dieselLiterYear.toLocaleString('zh-CN')} 升</li>
              <li>年柴油成本约 {GENESIS.dieselCostWanPerYear.toLocaleString('zh-CN')} 万元（按 {GENESIS.dieselPricePerLiter} 元/L）</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
            <h3 className="text-lg font-semibold text-ink-900">三组外部驱动</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14px] text-ink-700">
              <li>油价波动与地缘因素推高柴油到岸价</li>
              <li>国家氢能战略将重型货运列为燃料电池示范重点</li>
              <li>张家口示范城市群窗口期与推广指标约束</li>
            </ol>
          </div>
        </div>
      </Section>

      <Section eyebrow="GOALS" title="项目目标体系（v2.3）" source="§1.3">
        <div className="grid gap-4 md:grid-cols-2">
          {GOALS_V23.map((g) => (
            <div key={g.dim} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[12px] font-semibold tracking-wide text-h2-500">{g.dim}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/75">{g.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        variant="light"
        eyebrow="ALTERNATIVES"
        title="替代方案对比"
        lede="在「维持柴油 / 全氢 / 全电 / 2:1 推荐 / 1:2」五类方案中，仅 2:1 混合同时满足商业 ROI、工程可行性与政策红利保留度。"
        source="§1.5"
      >
        <div className="space-y-4">
          {ALTERNATIVES.map((a) => (
            <div key={a.name} className="rounded-2xl border border-ink-900/10 bg-bone-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink-900">{a.name}</h3>
                <span className="rounded-full border border-ink-900/10 px-3 py-1 text-[12px] font-medium text-ink-700">
                  判定：{a.verdict}
                </span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-[12px] font-semibold text-emerald-600">优点</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-ink-700">
                    {a.pros.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-flame-500">缺点</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-ink-700">
                    {a.cons.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
