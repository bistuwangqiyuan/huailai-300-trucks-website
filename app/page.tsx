import Link from 'next/link'
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react'

import { HeroHome } from '@/components/features/hero-home'
import { Section } from '@/components/primitives/section'
import { SourceRef } from '@/components/primitives/source-ref'
import { CapexDonut } from '@/components/charts/capex-donut'
import { RevenueDonut } from '@/components/charts/revenue-donut'
import { MixRadar } from '@/components/charts/mix-radar'
import {
  PROJECT_AT_A_GLANCE,
  RECOMMEND_VS_PPA,
  THREE_CONFIGS,
  V23_REVISIONS,
} from '@/lib/data/project'
import { CAPEX_TOTAL_WAN, FINANCE_SCENARIOS } from '@/lib/data/finance'
import { RECOMMEND_ARGS } from '@/lib/data/technology'
import { PHASES } from '@/lib/data/roadmap'
import { CARBON_SAVING, ESG_RATING } from '@/lib/data/esg'
import { fmt } from '@/lib/utils'

type RecRow = (typeof RECOMMEND_VS_PPA)[number]

function formatScenarioNumber(row: RecRow, key: 'recommend' | 'ppa'): string {
  const v = row[key]
  if (typeof v !== 'number') return String(v)
  if (row.unit === '亿元') return v.toFixed(2)
  if (row.unit === '×' || row.unit === '元/吨·km') return v.toFixed(2)
  if (row.unit === '%') return fmt(v, 1)
  return String(v)
}

export default function HomePage() {
  return (
    <>
      <HeroHome />

      <Section
        eyebrow="PROJECT AT A GLANCE"
        title="项目要览：规模、边界与 v2.3 核心修订"
        lede="在既定 300 台车队规模约束下，以商业 ROI 为第一排序依据，完成电氢完全分离评估与制氢规模按需反推。"
        source="§0.3 · §0.2"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECT_AT_A_GLANCE.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="text-[12px] font-medium tracking-wide text-white/50">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.value}</p>
              <p className="mt-2 text-[13px] text-white/55">{item.hint}</p>
              <p className="mt-3 font-mono text-[11px] text-white/35">{item.src}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-white">v2.3 关键修订（vs v2.2）</h3>
            <ul className="mt-4 space-y-4">
              {V23_REVISIONS.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <p className="text-sm font-semibold text-h2-500">{r.title}</p>
                  <p className="mt-2 text-[13px] text-white/55">
                    <span className="text-white/35">v2.2：</span>
                    {r.from}
                  </p>
                  <p className="mt-1 text-[13px] text-white/75">
                    <span className="text-white/35">v2.3：</span>
                    {r.to}
                  </p>
                  <p className="mt-2 text-[12px] text-gold-400/90">影响：{r.impact}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">三大配置对比</h3>
            <p className="mt-2 text-[14px] text-white/60">
              300 全电在纯财务维度投入产出比最高，但被工程可行性硬约束淘汰；300 全氢商业 ROI
              落后；200+100 为综合最优解。
            </p>
            <div className="mt-6 space-y-4">
              {THREE_CONFIGS.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-2xl border p-5 ${
                    'recommended' in c && c.recommended
                      ? 'border-h2-500/40 bg-h2-500/10'
                      : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{c.label}</p>
                      <p className="mt-1 text-[12px] text-white/50">
                        氢 {c.nH2} / 电 {c.nEv} · 年综合成本约 {fmt(c.annualCostWan, 0)} 万
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/60">
                      得分 {c.score}
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] text-white/70">{c.reason}</p>
                  <p className="mt-3 text-[12px] font-medium text-white/80">{c.verdict}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <SourceRef code="§8.3 · §8a" />
            </div>
          </div>
        </div>
      </Section>

      <Section
        variant="light"
        eyebrow="COMMERCIAL ROI"
        title="推荐方案 vs 推荐 + PPA：四项核心财务指标"
        lede="推荐 + PPA 为 v2.3 首选路径：在合规市场化购电前提下，将制氢电费每年降低约 1,408 万元，是商业 ROI 达标的核心杠杆之一。"
        source="§10.6 · §10.5"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {RECOMMEND_VS_PPA.map((row) => (
            <div
              key={row.metric}
              className="rounded-2xl border border-ink-900/10 bg-white p-6 shadow-sm"
            >
              <p className="text-[13px] font-medium text-ink-700">{row.metric}</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-wide text-ink-500">推荐方案</p>
                  <p className="num-mega mt-1 text-3xl font-semibold text-ink-900">
                    {formatScenarioNumber(row, 'recommend')}
                    <span className="ml-1 text-base font-medium text-ink-500">{row.unit}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] tracking-wide text-ink-500">推荐 + PPA</p>
                  <p className="num-mega mt-1 text-3xl font-semibold text-h2-600">
                    {formatScenarioNumber(row, 'ppa')}
                    <span className="ml-1 text-base font-medium text-ink-500">{row.unit}</span>
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[12px] text-ink-500">门槛：{row.threshold}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="CAPEX & REVENUE"
        title={`一次性总投资 ${(CAPEX_TOTAL_WAN / 10000).toFixed(2)} 亿元与示范期收入结构`}
        lede="制氢系统仍为第一大 CAPEX 板块；示范期第 1-5 年年收入约 2.41 亿元（基准口径），其中运输服务内部计价占绝对主导。"
        source="§9.1 · §10.2"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">CAPEX 结构</h3>
              <SourceRef code="§9.1" />
            </div>
            <CapexDonut />
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">示范期收入结构（第 1-5 年）</h3>
              <SourceRef code="§10.2" />
            </div>
            <RevenueDonut />
          </div>
        </div>
      </Section>

      <Section
        variant="light"
        eyebrow="OPTIMAL MIX"
        title="商业 ROI 综合得分雷达：为什么不是 300 全电或 300 全氢"
        lede="雷达维度与权重来自商业计划书第 8.3.2 节；「投入产出比 / 动态回收期」在基准定价口径下对 300 全电友好，但工程可行性与政策红利维度将其淘汰。"
        source="§8.3.2"
      >
        <MixRadar />
        <p className="mt-6 text-center text-[12px] text-ink-600">
          说明：雷达中的「投入产出比 / 动态回收期」为商业计划书 §8.3.2 节给出的归一化对比分；其中 300
          全氢方案原始投入产出比为负、回收期大于 10 年，图中为可视化下限处理。
        </p>
      </Section>

      <Section
        eyebrow="ARGUMENT MAP"
        title="200 氢 + 100 电：六大论据闭环"
        source="§8.8"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {RECOMMEND_ARGS.map((a) => (
            <div key={a.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-sm font-semibold text-gold-400">{a.title}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        variant="light"
        eyebrow="ROADMAP"
        title="三阶段实施：试点 → 放量 → 稳态"
        lede={`试点阶段投资约占 ${(PHASES[0].capexRatio * 100).toFixed(1)}%，放量阶段约占 ${(PHASES[1].capexRatio * 100).toFixed(1)}%。`}
        source="§13.1 · §13.2 · §13.3"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {PHASES.map((p) => (
            <div key={p.id} className="rounded-2xl border border-ink-900/10 bg-bone-50 p-6">
              <p className="eyebrow text-ink-500">{p.shortName}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink-900">{p.name}</h3>
              <p className="mt-2 text-[13px] text-ink-600">{p.yearsLabel}</p>
              <p className="mt-4 text-sm font-semibold text-ink-800">
                阶段投资：{fmt(p.capexWan, 0)} 万（{(p.capexRatio * 100).toFixed(1)}%）
              </p>
              <ul className="mt-4 space-y-2 text-[13px] text-ink-700">
                {p.goals.slice(0, 3).map((g) => (
                  <li key={g} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/roadmap"
                className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-h2-600 hover:underline"
              >
                查看完整里程碑
                <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="ESG"
        title={`年减排 ${CARBON_SAVING.annualTon.toLocaleString('zh-CN')} tCO₂e · 综合评级 ${ESG_RATING[3].before} → ${ESG_RATING[3].after}`}
        lede="v2.3 在电氢完全分离与绿证覆盖口径下，减排率 78.8%；ESG 章节作为辅助参考，不改变商业 ROI 主排序。"
        source="§12.2.3 · §12.4.1"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-lg font-semibold">评级跃迁</h3>
            <ul className="mt-4 space-y-3">
              {ESG_RATING.map((r) => (
                <li
                  key={r.dim}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <span className="text-[14px] text-white/70">{r.dim}</span>
                  <span className="font-mono text-[13px] text-white/45">
                    {r.before} → <span className="text-emerald-400">{r.after}</span>{' '}
                    <span className="text-white/35">({r.delta})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <h3 className="text-lg font-semibold">等价环境效益（叙事口径）</h3>
            <ul className="mt-4 space-y-3 text-[14px] text-white/70">
              {CARBON_SAVING.equivalent.map((e) => (
                <li key={e} className="flex gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {e}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12px] text-white/45">
              以上等价表述来自商业计划书第 12.2.3 节脚注口径。
            </p>
          </div>
        </div>
      </Section>

      <Section
        variant="light"
        eyebrow="FINANCE GATE"
        title="情景门槛矩阵：从基准到推荐 + PPA"
        source="§10.5"
      >
        <div className="overflow-x-auto rounded-2xl border border-ink-900/10">
          <table className="min-w-[900px] w-full border-collapse text-left text-[13px]">
            <thead className="bg-ink-900 text-bone-50">
              <tr>
                <th className="px-4 py-3 font-medium">情景</th>
                <th className="px-4 py-3 font-medium">NPV（万元）</th>
                <th className="px-4 py-3 font-medium">IRR</th>
                <th className="px-4 py-3 font-medium">DPP</th>
                <th className="px-4 py-3 font-medium">投入产出比</th>
                <th className="px-4 py-3 font-medium">达标</th>
              </tr>
            </thead>
            <tbody>
              {FINANCE_SCENARIOS.map((s) => (
                <tr key={s.id} className="border-t border-ink-900/10 odd:bg-white even:bg-bone-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink-900">{s.label}</p>
                    <p className="mt-1 text-[12px] text-ink-600">{s.desc}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-ink-800">{s.npvWan.toLocaleString('zh-CN')}</td>
                  <td className="px-4 py-3 text-ink-800">{s.irr == null ? '—' : `${s.irr}%`}</td>
                  <td className="px-4 py-3 text-ink-800">{s.dpp}</td>
                  <td className="px-4 py-3 font-mono text-ink-800">{s.payoff}×</td>
                  <td className="px-4 py-3">
                    {s.pass ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="size-4" /> 达标
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-flame-500">
                        <XCircle className="size-4" /> 未达标
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        eyebrow="COMMAND CENTER"
        title="进入项目大屏：运营、能源与风险一屏掌握"
        lede="大屏采用商业计划书目标值驱动的伪实时数据，用于指挥中心 / 参观路演场景；支持全屏展示。"
        source="§13.7"
      >
        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-h2-500 px-6 py-3 text-[14px] font-semibold text-ink-950 transition hover:bg-h2-400"
          >
            打开项目大屏
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/finance"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[14px] font-medium text-white/85 hover:border-white/30"
          >
            深入财务模型
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  )
}
