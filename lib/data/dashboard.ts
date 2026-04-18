/**
 * Dashboard 大屏的伪实时数据生成
 * 基于商业计划书 v2.3 推荐+PPA 稳态目标值，按时间维度模拟
 */

const TWO_PI = Math.PI * 2

function rand(seed: number) {
  let s = seed | 0
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export type LiveMetrics = {
  ts: number
  // 制氢
  h2PowerMW: number
  h2TodayTon: number
  h2Coverage: number
  // 加氢站
  stationFlowKgPerH: number[]
  stationDailyKg: number[]
  // 充电
  chargingPowerMW: number
  chargingTodayKwh: number
  // 车队
  fleetOnline: number
  fleetUtilization: number
  fleetTodayKm: number
  // 运营
  todayTonKm: number
  monthRevenueWan: number
  monthCO2SaveTon: number
  // 风险
  insuranceRate: number
  ppaPrice: number
  oilPrice: number
}

/** 由当前秒计算稳态值 */
export function snapshot(t: number, seed = 7): LiveMetrics {
  const r = rand(seed + Math.floor(t / 60))
  const minuteOfDay = (t / 60) % 1440
  const hourOfDay = minuteOfDay / 60
  // 白天 8-22 高负荷，夜间低负荷
  const dayPattern = Math.max(0.3, Math.sin(((hourOfDay - 6) / 16) * Math.PI) * 0.7 + 0.5)
  const noise = (r() - 0.5) * 0.08

  const h2Base = 22 // 22 MW 平均
  const h2Power = clamp(h2Base * dayPattern * (1 + noise), 8, 28)
  const h2Today = (h2Power * Math.min(hourOfDay, 24) * 0.020) // 大致估算 ton

  const station1 = clamp(900 * dayPattern + r() * 60, 200, 1500)
  const station2 = clamp(880 * dayPattern + r() * 60, 200, 1500)
  const station3 = clamp(910 * dayPattern + r() * 60, 200, 1500)

  const chargingBase = 7.6 // 推荐方案配电峰值 8.4 MW
  const chargingPower = clamp(chargingBase * (0.7 + dayPattern * 0.4) + (r() - 0.5) * 0.6, 1.5, 9.8)

  // Fleet
  const fleetOnline = Math.round(clamp(265 + Math.sin(hourOfDay / 24 * TWO_PI) * 18 + (r() - 0.5) * 6, 220, 295))
  const fleetUtilization = clamp(0.78 + Math.sin(hourOfDay / 24 * TWO_PI) * 0.08 + (r() - 0.5) * 0.03, 0.55, 0.93)
  const fleetTodayKm = Math.round(clamp(hourOfDay * 4500 + r() * 800, 0, 110_000))

  // 稳态目标 5.88 亿吨·km/年 ≈ 161 万吨·km/天
  const todayTonKm = Math.round(clamp(hourOfDay * 67000 + r() * 5000, 0, 1_700_000))
  const monthRevenueWan = Math.round(clamp(2300 + (t / 86400) % 30 * 60 + r() * 80, 1500, 2400))
  const monthCO2SaveTon = Math.round(clamp(2350 + (t / 86400) % 30 * 30 + r() * 60, 1700, 2700))

  return {
    ts: t,
    h2PowerMW: round(h2Power, 2),
    h2TodayTon: round(h2Today, 1),
    h2Coverage: round(0.95 + r() * 0.04, 3),
    stationFlowKgPerH: [round(station1, 0), round(station2, 0), round(station3, 0)],
    stationDailyKg: [round(station1 * hourOfDay * 0.85, 0), round(station2 * hourOfDay * 0.85, 0), round(station3 * hourOfDay * 0.85, 0)],
    chargingPowerMW: round(chargingPower, 2),
    chargingTodayKwh: Math.round(clamp(chargingPower * hourOfDay * 1000, 0, 80_000)),
    fleetOnline,
    fleetUtilization: round(fleetUtilization, 3),
    fleetTodayKm,
    todayTonKm,
    monthRevenueWan,
    monthCO2SaveTon,
    insuranceRate: 0.10,
    ppaPrice: 0.30,
    oilPrice: 7.65,
  }
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}
function round(v: number, d = 2) {
  const p = 10 ** d
  return Math.round(v * p) / p
}

/** 24 小时趋势序列（用于折线/面积图） */
export function generate24hSeries(seed = 7) {
  const out: { hour: number; h2: number; charging: number; revenue: number }[] = []
  for (let h = 0; h < 24; h++) {
    const t = h * 3600
    const m = snapshot(t, seed)
    out.push({
      hour: h,
      h2: m.h2PowerMW,
      charging: m.chargingPowerMW,
      revenue: round(60 + Math.sin((h - 6) / 16 * Math.PI) * 35 + (h * 1.2), 1),
    })
  }
  return out
}

export const ALERTS = [
  { ts: '06:42', tone: 'h2', text: '加氢站-02 储氢压力恢复至 35.0 MPa' },
  { ts: '07:18', tone: 'gold', text: 'PPA 长协合规审查进入第三轮反馈' },
  { ts: '08:55', tone: 'ev', text: '矿区换电站完成第 12 次电池模组循环' },
  { ts: '09:30', tone: 'emerald', text: 'CCER 减排监测累计达 2,650 tCO₂e（本月）' },
  { ts: '10:14', tone: 'flame', text: '风险提示：制氢电价距离临界 0.36 元/kWh 边际 +11%，需推进 PPA' },
  { ts: '11:02', tone: 'h2', text: '电解槽 #03 启停响应耗时 11 分 24 秒，达标' },
] as const

export const TICKER_NEWS = [
  '张家口示范城市群 第二阶段 申报材料已提交，本项目作为标杆项目',
  '副产氧气与张家口本地钢铁企业签订年度长协 1.8 万吨',
  '阶段 1 试点车辆累计行驶 920 万 km，故障率 0.12 次/万 km',
  '绿色信贷批复进入终审；预计 LPR -1.5%，节息 2,693 万（10 年）',
  'CCER 第二批方法学（"重型车辆电动化/氢能化"）预计 2027 一季度发布',
  '业主集团 ESG 评级由 BB 提升至 A-，触达国际供应链合作门槛',
] as const
