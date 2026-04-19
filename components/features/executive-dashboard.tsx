'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import {
  Activity,
  BatteryCharging,
  Building2,
  Cpu,
  Factory,
  Flag,
  Fuel,
  Gauge,
  GitMerge,
  LandPlot,
  Leaf,
  Loader2,
  LogOut,
  MapPin,
  Maximize2,
  Minimize2,
  Radio,
  Route,
  ShieldCheck,
  Truck,
  Wallet,
  Wind,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ALERTS, TICKER_NEWS, generate24hSeries, snapshot } from '@/lib/data/dashboard'
import { CAPEX_TOTAL_WAN, FINANCE_SCENARIOS } from '@/lib/data/finance'
import { CARBON_SAVING, ESG_RATING } from '@/lib/data/esg'
import { POLICY_DIVIDEND, POLICY_LEVELS } from '@/lib/data/policy'
import { PHASES } from '@/lib/data/roadmap'
import { cn, fmt } from '@/lib/utils'

const PROJECT_TAGS = [
  '国家氢能产业示范',
  '张家口示范城市群',
  '京津冀双碳战略',
  '河北省"风光氢"示范',
] as const

export function ExecutiveDashboard() {
  const router = useRouter()
  const [t, setT] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const live = useMemo(() => snapshot(t, 11), [t])
  const series = useMemo(() => generate24hSeries(11), [])

  useEffect(() => {
    setT(Math.floor(Date.now() / 1000))
    const id = window.setInterval(() => setT(Math.floor(Date.now() / 1000)), 5000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  const ppa = FINANCE_SCENARIOS.find((s) => s.id === 'recommend-ppa')
  const recommended = FINANCE_SCENARIOS.find((s) => s.id === 'recommend')

  async function onSignOut() {
    setSigningOut(true)
    try {
      await fetch('/api/login', { method: 'DELETE' })
    } catch {}
    router.replace('/login')
    router.refresh()
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950 text-bone-50">
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(34,211,238,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_120%,rgba(212,162,76,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1920px] flex-col gap-4 px-4 py-4 lg:gap-5 lg:px-8 lg:py-6">
        <TopBar
          t={t}
          fullscreen={fullscreen}
          signingOut={signingOut}
          onSignOut={onSignOut}
        />

        <HeroBand />

        <div className="grid flex-1 gap-4 xl:grid-cols-12">
          <LeftColumn live={live} />
          <CenterColumn live={live} series={series} />
          <RightColumn ppa={ppa} recommended={recommended} live={live} />
        </div>

        <Footer />
      </div>

      {/* News marquee fixed across the bottom edge */}
      <div className="marquee-mask sticky bottom-0 z-10 mt-2 border-t border-white/10 bg-ink-950/90 py-2.5 backdrop-blur-xl">
        <div className="animate-marquee flex whitespace-nowrap text-[12.5px] text-white/60">
          {[...TICKER_NEWS, ...TICKER_NEWS].map((n, i) => (
            <span key={`${n}-${i}`} className="mx-8 inline-flex items-center gap-2">
              <Activity className="size-3.5 text-h2-500" />
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* --------------------------------- TopBar --------------------------------- */

function TopBar({
  t,
  fullscreen,
  signingOut,
  onSignOut,
}: {
  t: number
  fullscreen: boolean
  signingOut: boolean
  onSignOut: () => void
}) {
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen?.()
    } else {
      void document.exitFullscreen?.()
    }
  }

  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-white/[0.06] px-4 py-3 backdrop-blur-xl lg:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_120%_at_30%_50%,rgba(34,211,238,0.12),transparent_60%)]" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid size-12 place-items-center rounded-xl border border-white/15 bg-gradient-to-br from-h2-500/40 via-emerald-500/20 to-gold-500/20 text-base font-bold tracking-tight text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]">
            300
          </span>
          <div className="leading-tight">
            <p className="font-mono text-[11px] tracking-[0.22em] text-white/50">
              COMMAND CENTER · 怀来 · v2.3
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
              怀来矿区 300 辆新能源运输车项目 · 综合指挥与决策中心
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12px] text-white/65">
          <span className="hidden items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 font-mono text-emerald-300 sm:inline-flex">
            <span className="pulse-dot text-emerald-400" />
            SYSTEM · ONLINE
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono">
            <Radio className="size-3.5 text-h2-500" />
            5s 节拍
          </span>
          <span className="font-mono text-white/85">
            {t === 0 ? '— · —' : new Date(t * 1000).toLocaleString('zh-CN', { hour12: false })}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/85 hover:border-h2-500/50 hover:text-h2-500"
            aria-label={fullscreen ? '退出全屏' : '进入全屏'}
          >
            {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            {fullscreen ? '退出全屏' : '全屏'}
          </button>
          <button
            type="button"
            onClick={onSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/75 hover:border-flame-400/50 hover:text-flame-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {signingOut ? <Loader2 className="size-3.5 animate-spin" /> : <LogOut className="size-3.5" />}
            退出
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11.5px]">
        {PROJECT_TAGS.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-2.5 py-1 font-medium text-gold-300"
          >
            <Flag className="size-3" />
            {tag}
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-white/55">
          数据口径：商业计划书 v2.3 · 推荐+PPA 路径
        </span>
      </div>
    </header>
  )
}

/* -------------------------------- Hero band ------------------------------- */

function HeroBand() {
  const ppa = FINANCE_SCENARIOS.find((s) => s.id === 'recommend-ppa')
  return (
    <section className="grid gap-4 lg:grid-cols-6">
      <MegaCard
        accent="h2"
        icon={<Truck className="size-5" />}
        label="车队总规模"
        value="300"
        unit="台"
        sub="200 氢 + 40 中途电 + 60 矿区电"
        src="§0.3"
      />
      <MegaCard
        accent="gold"
        icon={<Wallet className="size-5" />}
        label="一次性总投资"
        value={(CAPEX_TOTAL_WAN / 10000).toFixed(2)}
        unit="亿元"
        sub="较 v2.2 节省 1,728 万"
        src="§9.1"
      />
      <MegaCard
        accent="emerald"
        icon={<Gauge className="size-5" />}
        label="净现值（推荐+PPA）"
        prefix="+"
        value={ppa ? (ppa.npvWan / 10000).toFixed(2) : '—'}
        unit="亿元"
        sub={ppa ? `IRR ${ppa.irr}% · DPP ${ppa.dpp}` : '—'}
        src="§10.6"
      />
      <MegaCard
        accent="h2"
        icon={<Cpu className="size-5" />}
        label="制氢系统装机"
        value="28"
        unit="MW"
        sub="24 Alk + 4 PEM · 2,816 t/年"
        src="§9.2.2"
      />
      <MegaCard
        accent="ev"
        icon={<BatteryCharging className="size-5" />}
        label="充电峰值"
        value="8.4"
        unit="MW"
        sub="30 充电桩 + 1 换电站"
        src="§7"
      />
      <MegaCard
        accent="emerald"
        icon={<Leaf className="size-5" />}
        label="年减排（绿证口径）"
        value={CARBON_SAVING.annualTon.toLocaleString('zh-CN')}
        unit="tCO₂e"
        sub={`减排率 ${(CARBON_SAVING.saveRatio * 100).toFixed(1)}%`}
        src="§12.2.3"
      />
    </section>
  )
}

const accentMap = {
  gold: { ring: 'border-gold-500/40', bg: 'from-gold-500/15 via-gold-500/5', text: 'text-gold-300', glow: 'rgba(212,162,76,0.35)' },
  h2: { ring: 'border-h2-500/40', bg: 'from-h2-500/15 via-h2-500/5', text: 'text-h2-300', glow: 'rgba(34,211,238,0.4)' },
  ev: { ring: 'border-ev-500/40', bg: 'from-ev-500/15 via-ev-500/5', text: 'text-ev-300', glow: 'rgba(163,230,53,0.35)' },
  emerald: { ring: 'border-emerald-400/40', bg: 'from-emerald-400/15 via-emerald-400/5', text: 'text-emerald-300', glow: 'rgba(52,211,153,0.35)' },
} as const

function MegaCard({
  accent,
  icon,
  label,
  value,
  unit,
  prefix,
  sub,
  src,
}: {
  accent: keyof typeof accentMap
  icon: ReactNode
  label: string
  value: string
  unit?: string
  prefix?: string
  sub?: string
  src?: string
}) {
  const a = accentMap[accent]
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-white/[0.04] p-4 backdrop-blur-xl',
        a.ring,
      )}
      style={{ boxShadow: `0 30px 90px -50px ${a.glow}` }}
    >
      <div className={cn('pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br to-transparent', a.bg)} />
      <div className="flex items-center gap-2 text-[12px] font-medium text-white/65">
        <span className={cn('grid size-7 place-items-center rounded-md border border-white/10 bg-white/5', a.text)}>
          {icon}
        </span>
        {label}
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        {prefix && <span className={cn('num-mega text-2xl', a.text)}>{prefix}</span>}
        <span className="num-mega text-3xl font-semibold tracking-tight text-white sm:text-[40px]">
          {value}
        </span>
        {unit && <span className="text-[13px] font-medium text-white/55">{unit}</span>}
      </div>
      {sub && <p className="mt-2 text-[12px] text-white/55">{sub}</p>}
      {src && <p className="mt-3 font-mono text-[10.5px] tracking-wider text-white/30">{src}</p>}
    </div>
  )
}

/* -------------------------------- Columns -------------------------------- */

function LeftColumn({ live }: { live: ReturnType<typeof snapshot> }) {
  return (
    <div className="space-y-4 xl:col-span-3">
      <Panel title="制氢系统 · 实时" icon={<Factory className="size-4" />}>
        <Gauge28
          value={live.h2PowerMW}
          max={28}
          unit="MW"
          label="实时功率"
        />
        <div className="mt-4 grid grid-cols-2 gap-2 text-[12px]">
          <KV k="今日产氢" v={`${live.h2TodayTon.toFixed(1)} t`} />
          <KV k="绿证覆盖" v={`${(live.h2Coverage * 100).toFixed(1)}%`} accent="emerald" />
          <KV k="电解槽 在线" v="22 / 28 槽" />
          <KV k="氢气纯度" v="99.999%" />
        </div>
      </Panel>

      <Panel title="加氢站 · 实时吞吐" icon={<Fuel className="size-4" />}>
        <ul className="space-y-3 text-[12.5px]">
          {live.stationFlowKgPerH.map((v, i) => {
            const id = `H2-${String(i + 1).padStart(2, '0')}`
            const ratio = Math.min(1, v / 1500)
            return (
              <li key={id}>
                <div className="flex items-center justify-between text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded border border-h2-500/30 bg-h2-500/10 font-mono text-[10px] text-h2-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {id}
                  </span>
                  <span className="font-mono text-h2-300">{v.toLocaleString('zh-CN')} kg/h</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-h2-500 via-h2-400 to-emerald-400"
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
              </li>
            )
          })}
          <li className="border-t border-white/5 pt-3 text-[12px] text-white/45">
            标称产能 · 每座 1,000 kg/天 35MPa
          </li>
        </ul>
      </Panel>

      <Panel title="车队 · 调度概览" icon={<Truck className="size-4" />}>
        <div className="grid grid-cols-3 gap-2">
          <FleetTile label="氢能" online={Math.round(live.fleetOnline * (200 / 300))} total={200} accent="h2" />
          <FleetTile label="电中途" online={Math.round(live.fleetOnline * (40 / 300))} total={40} accent="ev" />
          <FleetTile label="电矿区" online={Math.round(live.fleetOnline * (60 / 300))} total={60} accent="emerald" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
          <KV k="出勤率" v={`${(live.fleetUtilization * 100).toFixed(1)}%`} />
          <KV k="今日里程" v={`${(live.fleetTodayKm / 10000).toFixed(2)} 万 km`} />
        </div>
      </Panel>
    </div>
  )
}

function CenterColumn({
  live,
  series,
}: {
  live: ReturnType<typeof snapshot>
  series: ReturnType<typeof generate24hSeries>
}) {
  return (
    <div className="space-y-4 xl:col-span-6">
      <Panel
        title="24h 能源曲线 · 制氢功率 / 充电功率"
        icon={<Wind className="size-4" />}
        right={<span className="font-mono text-[11px] text-white/40">MW</span>}
      >
        <div className="h-[260px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="dgH2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dgEv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A3E635" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#A3E635" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="h2"
                name="制氢 MW"
                stroke="#22D3EE"
                fill="url(#dgH2)"
                strokeWidth={2.2}
              />
              <Area
                type="monotone"
                dataKey="charging"
                name="充电 MW"
                stroke="#A3E635"
                fill="url(#dgEv)"
                strokeWidth={2.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Panel
            title="项目区位 · 怀来矿区 / 张家口示范城市群"
            icon={<MapPin className="size-4" />}
            className="h-full"
          >
            <ChinaMiniMap />
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11.5px]">
              <KV k="厂址" v="怀来 · 土木镇" />
              <KV k="距 北京" v="≈ 80 km" />
              <KV k="海拔" v="500–800 m" />
              <KV k="年日照" v="≈ 2,872 h" />
              <KV k="年风速" v="6.8 m/s" />
              <KV k="电网" v="110 kV 主变" />
            </div>
          </Panel>
        </div>
        <div className="lg:col-span-5">
          <Panel title="今日运营节拍" icon={<GitMerge className="size-4" />} className="h-full">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-[11px] text-white/45">当日货运周转量（示意）</p>
              <p className="num-mega mt-2 text-4xl font-semibold tracking-tight text-white">
                {(live.todayTonKm / 10000).toFixed(2)}
                <span className="ml-1 text-base font-medium text-white/45">万 吨·km</span>
              </p>
              <p className="mt-1 text-[11px] text-white/50">
                稳态目标 5.88 亿 吨·km/年（§9.8）
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
              <KV k="今日充电" v={`${(live.chargingTodayKwh / 1000).toFixed(1)} MWh`} />
              <KV k="充电峰值" v={`${live.chargingPowerMW.toFixed(2)} MW`} />
              <KV k="本月营收" v={`${live.monthRevenueWan.toLocaleString('zh-CN')} 万`} accent="gold" />
              <KV k="本月碳减" v={`${live.monthCO2SaveTon.toLocaleString('zh-CN')} t`} accent="emerald" />
            </div>
          </Panel>
        </div>
      </div>

      <Panel
        title="实施路径 · 三阶段甘特"
        icon={<Route className="size-4" />}
      >
        <PhaseTimeline />
      </Panel>
    </div>
  )
}

function RightColumn({
  ppa,
  recommended,
  live,
}: {
  ppa: ReturnType<typeof FINANCE_SCENARIOS.find>
  recommended: ReturnType<typeof FINANCE_SCENARIOS.find>
  live: ReturnType<typeof snapshot>
}) {
  return (
    <div className="space-y-4 xl:col-span-3">
      <Panel title="商业 ROI · 推荐+PPA 路径" icon={<Wallet className="size-4" />}>
        <div className="grid grid-cols-2 gap-2">
          <RoiTile label="净现值" value={ppa ? `+${(ppa.npvWan / 10000).toFixed(2)} 亿` : '—'} accent="gold" />
          <RoiTile label="内部收益率" value={ppa ? `${ppa.irr}%` : '—'} accent="h2" />
          <RoiTile label="动态回收期" value={ppa ? String(ppa.dpp) : '—'} accent="emerald" />
          <RoiTile label="投入产出比" value={ppa ? `${ppa.payoff}×` : '—'} accent="ev" />
        </div>
        <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-[12px] text-white/60">
          保底路径（推荐）：
          <span className="ml-1 font-mono text-white/85">
            NPV +{recommended ? (recommended.npvWan / 10000).toFixed(2) : '—'} 亿 / IRR{' '}
            {recommended?.irr ?? '—'}% / DPP {recommended?.dpp ?? '—'}
          </span>
        </div>
      </Panel>

      <Panel title="政策红利 · 四级落实" icon={<Building2 className="size-4" />}>
        <ul className="space-y-2">
          {POLICY_LEVELS.map((lv) => (
            <li
              key={lv.level}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-[12.5px]"
            >
              <span className="inline-flex items-center gap-2 text-white/70">
                <span
                  className="size-2 rounded-full"
                  style={{ background: lv.color, boxShadow: `0 0 10px ${lv.color}` }}
                />
                {lv.level}
              </span>
              <span className="font-mono text-[11px] text-white/50">{lv.items.length} 项</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-lg border border-gold-500/20 bg-gold-500/5 px-3 py-2 text-[12px] text-gold-200">
          示范期合计补贴红利：
          <span className="ml-1 font-mono text-gold-300">
            {(POLICY_DIVIDEND.totalWan / 10000).toFixed(2)} 亿元
          </span>
          <span className="ml-2 text-gold-200/65">（§3.7）</span>
        </div>
      </Panel>

      <Panel title="ESG · 评级与减排" icon={<Leaf className="size-4" />}>
        <div className="grid grid-cols-2 gap-2 text-[12px]">
          {ESG_RATING.map((r) => (
            <div
              key={r.dim}
              className={cn(
                'rounded-lg border px-3 py-2',
                'accent' in r && r.accent
                  ? 'border-emerald-400/40 bg-emerald-400/10'
                  : 'border-white/5 bg-white/[0.02]',
              )}
            >
              <p className="text-white/55">{r.dim}</p>
              <p className="mt-1 font-mono text-[12.5px] text-white">
                {r.before} → <span className="text-emerald-300">{r.after}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-[12px] text-emerald-200">
          十年累计减排：
          <span className="ml-1 font-mono">{(CARBON_SAVING.tenYearAccumTon / 10000).toFixed(2)} 万 t</span>
        </div>
      </Panel>

      <Panel title="事件流 · 实时" icon={<ShieldCheck className="size-4" />}>
        <ul className="max-h-[180px] space-y-2 overflow-auto pr-1 text-[12px] text-white/70">
          {ALERTS.map((a) => (
            <li key={a.text} className="flex gap-2">
              <span className="shrink-0 font-mono text-white/35">{a.ts}</span>
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="价格 / 风险哨兵" icon={<LandPlot className="size-4" />}>
        <div className="space-y-1.5 text-[12.5px]">
          <Row k="上网电价" v="0.40 元/kWh" hint="§9.6.1" />
          <Row k="PPA 目标" v={`${live.ppaPrice.toFixed(2)} 元/kWh`} hint="§10.5.1" />
          <Row k="氢险率" v={`${(live.insuranceRate * 100).toFixed(0)}%`} hint="§9.5" />
          <Row k="柴油参考" v={`${live.oilPrice.toFixed(2)} 元/L`} hint="§3.6" />
        </div>
      </Panel>
    </div>
  )
}

/* ---------------------------- Reusable widgets ---------------------------- */

function Panel({
  title,
  icon,
  right,
  children,
  className,
}: {
  title: string
  icon?: ReactNode
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl lg:p-5',
        className,
      )}
    >
      <header className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] text-white/60">
          {icon && <span className="text-white/55">{icon}</span>}
          {title}
        </h2>
        {right}
      </header>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function KV({
  k,
  v,
  accent,
}: {
  k: string
  v: string
  accent?: 'gold' | 'h2' | 'ev' | 'emerald'
}) {
  const color =
    accent === 'gold' ? 'text-gold-300' : accent === 'h2' ? 'text-h2-300' : accent === 'ev' ? 'text-ev-300' : accent === 'emerald' ? 'text-emerald-300' : 'text-white'
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      <p className="text-[10.5px] uppercase tracking-wide text-white/40">{k}</p>
      <p className={cn('mt-0.5 font-mono text-[13px] tracking-tight', color)}>{v}</p>
    </div>
  )
}

function Row({ k, v, hint }: { k: string; v: string; hint: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 py-1.5 last:border-0">
      <span className="text-white/55">
        {k}
        <span className="ml-2 font-mono text-[10px] text-white/30">{hint}</span>
      </span>
      <span className="font-mono text-white">{v}</span>
    </div>
  )
}

function FleetTile({
  label,
  online,
  total,
  accent,
}: {
  label: string
  online: number
  total: number
  accent: 'h2' | 'ev' | 'emerald'
}) {
  const color =
    accent === 'h2' ? 'text-h2-300 border-h2-500/30 bg-h2-500/8' : accent === 'ev' ? 'text-ev-300 border-ev-500/30 bg-ev-500/8' : 'text-emerald-300 border-emerald-400/30 bg-emerald-400/8'
  return (
    <div className={cn('rounded-xl border px-3 py-2.5 text-center', color)}>
      <p className="text-[10.5px] uppercase tracking-wide text-white/55">{label}</p>
      <p className="num-mega mt-1 text-lg font-semibold text-white">
        {online}
        <span className="text-[12px] font-medium text-white/45"> / {total}</span>
      </p>
    </div>
  )
}

function RoiTile({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: 'h2' | 'ev' | 'emerald' | 'gold'
}) {
  const a = accentMap[accent]
  return (
    <div className={cn('rounded-xl border bg-white/[0.02] px-3 py-3 text-center', a.ring)}>
      <p className="text-[10.5px] uppercase tracking-wide text-white/55">{label}</p>
      <p className={cn('num-mega mt-1 text-xl font-semibold tracking-tight', a.text)}>{value}</p>
    </div>
  )
}

function Gauge28({
  value,
  max,
  unit,
  label,
}: {
  value: number
  max: number
  unit: string
  label: string
}) {
  const pct = Math.min(100, (value / max) * 100)
  const angle = -90 + (pct / 100) * 180
  return (
    <div className="relative mx-auto h-[140px] w-full max-w-[260px]">
      <svg viewBox="0 0 200 110" className="h-full w-full">
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#D4A24C" />
          </linearGradient>
        </defs>
        <path d="M10,100 A90,90 0 0 1 190,100" stroke="rgba(255,255,255,0.06)" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path
          d="M10,100 A90,90 0 0 1 190,100"
          stroke="url(#gaugeGrad)"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="282.7"
          strokeDashoffset={282.7 * (1 - pct / 100)}
        />
        <line
          x1="100"
          y1="100"
          x2={100 + Math.cos((angle * Math.PI) / 180) * 70}
          y2={100 + Math.sin((angle * Math.PI) / 180) * 70}
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="4" fill="#fff" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p className="num-mega text-3xl font-semibold tracking-tight text-white">
          {value.toFixed(1)}
          <span className="ml-1 text-sm font-medium text-white/55">{unit}</span>
        </p>
        <p className="mt-0.5 text-[11px] text-white/45">
          {label} · 装机上限 {max} {unit}
        </p>
      </div>
    </div>
  )
}

function PhaseTimeline() {
  const total = 120 // months from 2026-01 to 2035-12
  function offset(d: string) {
    const [y, m] = d.split('-').map(Number)
    return ((y - 2026) * 12 + (m - 1)) / total
  }
  return (
    <div className="space-y-3">
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
        {PHASES.map((p, i) => {
          const start = offset(p.startMonth) * 100
          const end = offset(p.endMonth) * 100
          const palette = ['from-h2-500 to-h2-400', 'from-emerald-500 to-emerald-300', 'from-gold-500 to-gold-300']
          return (
            <div
              key={p.id}
              className={cn('absolute top-0 h-full rounded-full bg-gradient-to-r', palette[i])}
              style={{ left: `${start}%`, width: `${end - start}%`, opacity: 0.85 }}
            />
          )
        })}
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {PHASES.map((p, i) => {
          const palette = ['border-h2-500/40 bg-h2-500/8', 'border-emerald-400/40 bg-emerald-400/8', 'border-gold-500/40 bg-gold-500/8']
          return (
            <div key={p.id} className={cn('rounded-xl border p-3', palette[i])}>
              <p className="text-[11px] tracking-wide text-white/55">{p.shortName}</p>
              <p className="mt-1 text-[13px] font-semibold text-white">{p.name}</p>
              <p className="mt-1 text-[11.5px] text-white/55">{p.yearsLabel}</p>
              <p className="mt-2 font-mono text-[11px] text-white/65">
                投资 {fmt(p.capexWan, 0)} 万 · {(p.capexRatio * 100).toFixed(1)}%
              </p>
              <ul className="mt-2 space-y-1 text-[11.5px] text-white/65">
                {p.goals.slice(0, 2).map((g) => (
                  <li key={g} className="line-clamp-1">· {g}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Stylized China map using SVG outline (省界/海岸近似形态)，标注怀来位置。
 * 该路径为示意性轮廓，用于指挥中心可视化，不作为真实地理参考。
 */
function ChinaMiniMap() {
  return (
    <div className="relative h-[200px] w-full overflow-hidden rounded-xl border border-white/5 bg-[radial-gradient(ellipse_60%_60%_at_55%_45%,rgba(34,211,238,0.08),transparent_70%)]">
      <svg viewBox="0 0 600 400" className="h-full w-full">
        <defs>
          <linearGradient id="mapFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.02" />
          </linearGradient>
          <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 简化的中国陆地轮廓（示意） */}
        <path
          d="M120,210 C100,180 90,150 110,120 C130,95 175,85 210,75 C260,60 300,50 350,55 C420,60 470,75 510,110 C540,135 545,165 530,195 C515,225 480,235 460,260 C445,280 460,305 440,325 C420,345 380,345 340,335 C300,325 270,330 240,325 C210,320 180,315 165,295 C150,275 140,250 130,235 C125,225 122,218 120,210 Z"
          fill="url(#mapFill)"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.2"
        />
        {/* 怀来 marker - approx 河北西北 (高约 28%) */}
        <g transform="translate(345,160)">
          <circle r="22" fill="url(#pulseGrad)">
            <animate attributeName="r" values="14;26;14" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r="6" fill="#22D3EE" stroke="#fff" strokeWidth="1.5" />
          <text x="12" y="-8" fill="#fff" fontSize="13" fontWeight="600" fontFamily="var(--font-sans)">
            怀来
          </text>
          <text x="12" y="8" fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="var(--font-mono)">
            HUAILAI · 张家口示范区
          </text>
        </g>
        {/* 北京标记 */}
        <g transform="translate(385,170)">
          <circle r="3" fill="rgba(255,255,255,0.5)" />
          <text x="6" y="3" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="var(--font-sans)">
            北京
          </text>
        </g>
      </svg>
      <div className="absolute bottom-2 right-3 font-mono text-[10px] tracking-wider text-white/35">
        SCHEMATIC · 仅示意
      </div>
    </div>
  )
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-2 text-[11.5px] text-white/45">
      <span>© 怀来中基锡安新型石材科技有限责任公司 · 商业可行性研究 v2.3 · 仅供项目相关方参阅</span>
      <span className="font-mono text-white/35">DASHBOARD · v2.3.1 · DEMONSTRATION</span>
    </footer>
  )
}
