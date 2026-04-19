'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Activity, BatteryCharging, Fuel, Gauge, Radio, ShieldAlert, Truck } from 'lucide-react'
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
import { PROJECT } from '@/lib/data/project'
import { FINANCE_SCENARIOS } from '@/lib/data/finance'
import { cn, fmt } from '@/lib/utils'

export function DashboardClient() {
  const [t, setT] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 text-bone-50">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <Image
          src="/images/h2-plant.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/92 to-ink-950" />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="relative mx-auto max-w-[1920px] px-4 py-6 lg:px-10 lg:py-8">
        {/* Top bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl lg:px-6">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg border border-h2-500/40 bg-h2-500/15 text-sm font-bold text-h2-500">
              屏
            </span>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-white/45">COMMAND CENTER</p>
              <h1 className="text-lg font-semibold tracking-tight text-white lg:text-xl">
                {PROJECT.shortName} · 运营与能源可视化
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-white/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono">
              <Radio className="size-3.5 text-emerald-400" />
              伪实时节拍 5s
            </span>
            <span className="font-mono text-white/80">
              {t === 0 ? '— · —' : new Date(t * 1000).toLocaleString('zh-CN', { hour12: false })}
            </span>
            <button
              type="button"
              onClick={() => {
                if (!document.fullscreenElement) {
                  void document.documentElement.requestFullscreen()
                } else {
                  void document.exitFullscreen()
                }
              }}
              className="rounded-full border border-white/15 px-3 py-1 text-[12px] font-medium text-white/85 hover:border-h2-500/50 hover:text-h2-500"
            >
              {fullscreen ? '退出全屏' : '全屏'}
            </button>
          </div>
        </header>

        {/* KPI mega row */}
        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          <Mega
            icon={<Truck className="size-5 text-h2-500" />}
            label="在线车辆 / 总规模"
            value={`${live.fleetOnline} / 300`}
            sub="出勤率（示意）"
            subVal={fmt(live.fleetUtilization * 100, 1) + '%'}
          />
          <Mega
            icon={<Fuel className="size-5 text-gold-400" />}
            label="制氢实时功率"
            value={`${live.h2PowerMW} MW`}
            sub="绿证覆盖（示意）"
            subVal={fmt(live.h2Coverage * 100, 1) + '%'}
          />
          <Mega
            icon={<BatteryCharging className="size-5 text-ev-500" />}
            label="充电峰值"
            value={`${live.chargingPowerMW} MW`}
            sub="当日累计充电量"
            subVal={`${live.chargingTodayKwh.toLocaleString('zh-CN')} kWh`}
          />
          <Mega
            icon={<Gauge className="size-5 text-emerald-400" />}
            label="推荐 + PPA 净现值"
            value={ppa ? `+${(ppa.npvWan / 10000).toFixed(2)} 亿` : '—'}
            sub="IRR / DPP"
            subVal={ppa ? `${ppa.irr}% · ${ppa.dpp}` : '—'}
          />
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-12">
          {/* Left */}
          <div className="space-y-4 xl:col-span-3">
            <Panel title="三站加氢吞吐（kg/h）">
              {live.stationFlowKgPerH.map((v, i) => {
                const id = `H2-${String(i + 1).padStart(2, '0')}`
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between border-b border-white/5 py-2 last:border-0"
                  >
                    <span className="text-[13px] text-white/55">加氢站-{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-sm text-h2-500">{v.toLocaleString('zh-CN')}</span>
                  </div>
                )
              })}
            </Panel>
            <Panel title="风险与价格哨兵">
              <div className="space-y-2 text-[13px] text-white/70">
                <Row k="上网电价口径" v="0.40 元/kWh" hint="§9.6.1" />
                <Row k="PPA 目标价" v={`${live.ppaPrice.toFixed(2)} 元/kWh`} hint="§10.5.1" />
                <Row k="氢险计提（示意）" v={`${(live.insuranceRate * 100).toFixed(0)}%`} hint="§9.5" />
                <Row k="怀来柴油参考" v={`${live.oilPrice.toFixed(2)} 元/L`} hint="§3.6" />
              </div>
            </Panel>
          </div>

          {/* Center */}
          <div className="space-y-4 xl:col-span-6">
            <Panel title="24h 制氢功率 / 充电功率（示意曲线）" className="h-[320px]">
              <div className="h-[260px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gH2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gEv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#A3E635" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#A3E635" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 6" vertical={false} />
                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="h2" name="制氢 MW" stroke="#22D3EE" fill="url(#gH2)" strokeWidth={2} />
                    <Area type="monotone" dataKey="charging" name="充电 MW" stroke="#A3E635" fill="url(#gEv)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Panel>
            <Panel title="当日货运周转量（万吨·km，示意）">
              <p className="num-mega text-5xl font-semibold tracking-tight text-white">
                {(live.todayTonKm / 10000).toFixed(2)}
              </p>
              <p className="mt-2 text-[13px] text-white/50">
                与商业计划书稳态目标同量级对齐，用于指挥中心节奏演示，不代表实时生产数据。
              </p>
            </Panel>
          </div>

          {/* Right */}
          <div className="space-y-4 xl:col-span-3">
            <Panel title="本月累计（示意）">
              <div className="space-y-3">
                <div>
                  <p className="text-[12px] text-white/45">内部服务收入（万）</p>
                  <p className="num-mega text-2xl text-gold-400">{live.monthRevenueWan.toLocaleString('zh-CN')}</p>
                </div>
                <div>
                  <p className="text-[12px] text-white/45">碳减排（tCO₂e）</p>
                  <p className="num-mega text-2xl text-emerald-400">{live.monthCO2SaveTon.toLocaleString('zh-CN')}</p>
                </div>
              </div>
            </Panel>
            <Panel title="事件流">
              <ul className="max-h-[220px] space-y-3 overflow-auto pr-1 text-[12px] text-white/70">
                {ALERTS.map((a) => (
                  <li key={a.text} className="flex gap-2">
                    <span className="shrink-0 font-mono text-white/35">{a.ts}</span>
                    <span>{a.text}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="安全与合规">
              <div className="flex gap-2 text-[12px] text-white/65">
                <ShieldAlert className="size-4 shrink-0 text-flame-400" />
                大屏为路演/参观用途；生产环境需对接 SCADA / TMS / EMS 实时数据源。
              </div>
            </Panel>
          </div>
        </div>

        {/* Ticker */}
        <div className="marquee-mask mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-3">
          <div className="animate-marquee flex whitespace-nowrap text-[13px] text-white/55">
            {[...TICKER_NEWS, ...TICKER_NEWS].map((n, i) => (
              <span key={i} className="mx-8 inline-flex items-center gap-2">
                <Activity className="size-3.5 text-h2-500" />
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

function Mega({
  icon,
  label,
  value,
  sub,
  subVal,
}: {
  icon: ReactNode
  label: string
  value: string
  sub: string
  subVal: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-[12px] text-white/55">
        {icon}
        {label}
      </div>
      <p className="num-mega mt-3 text-2xl font-semibold tracking-tight text-white lg:text-3xl">{value}</p>
      <p className="mt-2 text-[11px] text-white/40">
        {sub}：<span className="text-white/70">{subVal}</span>
      </p>
    </div>
  )
}

function Panel({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl lg:p-5',
        className,
      )}
    >
      <h2 className="text-[12px] font-semibold tracking-[0.16em] text-white/45">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function Row({ k, v, hint }: { k: string; v: string; hint: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/55">
        {k}
        <span className="ml-2 font-mono text-[10px] text-white/30">{hint}</span>
      </span>
      <span className="font-mono text-sm text-white">{v}</span>
    </div>
  )
}
