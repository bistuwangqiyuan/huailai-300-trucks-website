/**
 * 制储加电体系：28 MW 制氢 + 3 加氢站 + 30 充电桩 + 1 换电站
 * 数据源：商业计划书 v2.3 第 6 / 7 / 8 / 9 章
 */

export const H2_SYSTEM = {
  totalMW: 28,
  alkalineMW: 24,
  pemMW: 4,
  annualProduction: 2816, // 吨
  fleetDemand: 2560,
  redundancyRatio: 0.1,
  electricitySourcePrice: 0.4, // 元/kWh，电网工商业上网电价
  ppaTargetPrice: 0.3,
  annualElectricityKwh: 140_800_000,
  annualElectricityCostWan: 5632,
  byproductOxygen: {
    annualTons: 22528,
    pricePerTon: 700,
    annualRevenueWan: 1577,
    note: '高纯氧出厂；张家口钢铁/医用/水处理三行业年需求 ~5 万吨',
  },
  capexBreakdownWan: [
    { id: 'alk', label: '碱性电解槽 + 配套（24 MW × 432 万）', wan: 10368 },
    { id: 'pem', label: 'PEM 电解槽 + 配套（4 MW × 900 万）', wan: 3600 },
    { id: 'support', label: '原水/碱液/压缩机/储氢/配电/土建/DCS', wan: 7732 },
    { id: 'misc', label: '工程管理与不可预见（8%）', wan: 1736 },
  ],
  totalCapexWan: 23436,
} as const

/** 综合氢成本 三层叠加桥接（n=200 推荐解） */
export const H2_COST_BRIDGE = [
  { id: 'baseline', label: '基准氢价（业主目标）', value: 18.0, accent: '#94a3b8' },
  { id: 'h2cap', label: '+ 28 MW 制氢系统摊薄', value: 10.69, accent: '#22D3EE' },
  { id: 'station', label: '+ 3 加氢站摊薄', value: 5.28, accent: '#A3E635' },
  { id: 'insurance', label: '+ 氢相关综合险（10%）', value: 13.97, accent: '#F97316' },
  { id: 'total', label: '综合氢成本（n=200）', value: 47.94, accent: '#D4A24C', isTotal: true },
] as const

/** 三层桥接经过优化后路径 */
export const H2_COST_OPTIMIZED = [
  { id: 'recommend', label: '推荐方案（综合氢成本）', value: 47.94 },
  { id: 'insurance', label: '叠加 氢险 10%→3%', value: 35.39, delta: -12.55 },
  { id: 'ppa', label: '叠加 风光长协 PPA 0.30', value: 29.5, delta: -5.89 },
  { id: 'goal', label: '业主目标 LCOH', value: 22.0, delta: -7.5, hint: '需国产化 + 示范期补贴 加持' },
] as const

/** 加氢站布局（3 座） */
export const STATIONS = [
  { id: 'st-01', name: '加氢站-01', capacityKgPerDay: 1000, pressureMpa: 35, role: '试点期首站' },
  { id: 'st-02', name: '加氢站-02', capacityKgPerDay: 1000, pressureMpa: 35, role: '放量首批' },
  { id: 'st-03', name: '加氢站-03', capacityKgPerDay: 1000, pressureMpa: 35, role: '放量二批' },
] as const

export const STATION_CAPEX_WAN = 6480
export const STATION_UNIT_WAN = 2160
export const STATION_DAILY_TOTAL = 3000

/** 充电体系 */
export const CHARGING = {
  superchargers: { count: 30, powerKw: 480, pricePerWan: 80, totalWan: 2400, note: '480 kW 液冷超充' },
  swapStation: { count: 1, totalWan: 1500, modules: 60, note: '矿区换电站含 60 个备用电池模块，专门服务 40 台中途电动重卡' },
  mainTransformer: { count: 1, totalWan: 3500, mva: '31.5 MVA', voltage: '110/10 kV' },
  distribution: { totalWan: 1500, note: '矿区 10 kV 配电网延伸' },
  engineering: { totalWan: 534, note: '工程管理（6%）' },
  totalCapexWan: 9434,
  peakLoadMW: 8.4, // 推荐方案配电峰值
} as const

/** 副产物经济价值汇总 */
export const BYPRODUCT_VALUE = {
  oxygen: { annualTons: 22528, revenueWan: 1577 },
  ccer: { annualWan: 3000 },
  greenCert: { annualKwh: 1_408_000_000 * 0.95, annualCostWan: 423 },
} as const

/** 制氢能流（电网→电解→储氢→车辆） */
export const ENERGY_FLOW = [
  { from: '国网怀来 220 kV 变电站', to: '主变 2×31.5 MVA', value: 28 },
  { from: '主变 2×31.5 MVA', to: '28 MW 制氢系统', value: 22 },
  { from: '主变 2×31.5 MVA', to: '14.4 MW 充电体系', value: 6 },
  { from: '28 MW 制氢系统', to: '3 加氢站储氢', value: 22 },
  { from: '3 加氢站储氢', to: '200 氢能重卡', value: 22 },
  { from: '14.4 MW 充电体系', to: '100 电动重卡', value: 6 },
] as const

/** 氢能重卡 vs 电动重卡 工况对比（中途 + 矿区） */
export const DUTY_PROFILE = [
  {
    id: 'trunk',
    label: '200 km 中途运输',
    distance: 200,
    workdays: 320,
    dailyTrips: 1,
    weight: '49 t',
    h2Fleet: 200,
    evFleet: 40,
    annualTonKm: '4.704 亿',
    pricingBase: 0.30,
    pricingRecommend: 0.40,
  },
  {
    id: 'mining',
    label: '矿区短倒（4 km × 18 趟）',
    distance: 4,
    workdays: 330,
    dailyTrips: 18,
    weight: '49 t',
    h2Fleet: 0,
    evFleet: 60,
    annualTonKm: '0.499 亿',
    pricingBase: 0.65,
    pricingRecommend: 0.78,
  },
] as const
