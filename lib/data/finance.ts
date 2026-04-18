/**
 * 投资估算 / 运营成本 / 财务评价
 * 数据源：商业计划书 v2.3 第 9 章 / 第 10 章 / 第 11 章
 */

/** ==================== CAPEX ==================== */

export const CAPEX_TOTAL_WAN = 54_450 // 5.45 亿元

export const CAPEX_BREAKDOWN = [
  { id: 'vehicle', label: '车辆采购', wan: 10500, ratio: 0.193, accent: '#22D3EE' },
  { id: 'h2', label: '制氢系统（28 MW）', wan: 23436, ratio: 0.43, accent: '#D4A24C' },
  { id: 'station', label: '加氢站（3 座）', wan: 6480, ratio: 0.119, accent: '#10B981' },
  { id: 'charging', label: '充电基础设施 + 换电', wan: 9434, ratio: 0.173, accent: '#A3E635' },
  { id: 'land', label: '土地与场地', wan: 2300, ratio: 0.042, accent: '#64748B' },
  { id: 'soft', label: '软投资', wan: 2300, ratio: 0.042, accent: '#94A3B8' },
] as const

/** v2.2 → v2.3 对比 */
export const CAPEX_VERSION_DIFF = {
  v22: { totalWan: 56178, h2Mw: 30, h2Wan: 25164 },
  v23: { totalWan: 54450, h2Mw: 28, h2Wan: 23436 },
  delta: '−1,728 万（全部来自制氢系统 30→28 MW）',
} as const

/** 资金来源建议 */
export const FUNDING_SOURCES = [
  { id: 'self', label: '业主自有资金', ratio: 0.35, wan: 19058, note: '含矿区现金流积累' },
  { id: 'green', label: '绿色信贷（10 年期）', ratio: 0.5, wan: 27225, note: 'LPR -1.5%' },
  { id: 'subsidy', label: '政策补贴（一次性）', ratio: 0.08, wan: 4356, note: '国补 + 加氢站建补' },
  { id: 'lease', label: '设备融资租赁', ratio: 0.07, wan: 3811, note: '主要针对车辆与电解槽' },
] as const

/** ==================== OPEX ==================== */

export const OPEX_TOTAL_WAN = 23112 // 2.31 亿/年

export const OPEX_BREAKDOWN = [
  { id: 'g1', label: '氢能重卡运营', wan: 17836, ratio: 0.772, accent: '#22D3EE' },
  { id: 'g2', label: '电动重卡运营', wan: 3826, ratio: 0.166, accent: '#A3E635' },
  { id: 'h', label: '共用与管理', wan: 1450, ratio: 0.063, accent: '#64748B' },
] as const

export const OPEX_KEY_LINES = [
  { id: 'h2-power', label: '制氢电费（上网电价 0.40）', wan: 5632, ratio: 0.244 },
  { id: 'h2-insurance', label: '氢相关综合险（10% 资产值）', wan: 3592, ratio: 0.155 },
  { id: 'driver-h2', label: '氢能重卡司机（200 × 2 班 × 12 万）', wan: 4800, ratio: 0.208 },
  { id: 'driver-ev', label: '电动重卡司机', wan: 2160, ratio: 0.094 },
  { id: 'h2-mgmt', label: '制氢人员/原水/碱液/管理', wan: 762, ratio: 0.033 },
  { id: 'h2-om', label: '制氢系统 O&M（CAPEX × 3%）', wan: 703, ratio: 0.030 },
  { id: 'station-mgmt', label: '加氢站人员/管理', wan: 400, ratio: 0.017 },
  { id: 'station-om', label: '加氢站 O&M', wan: 194, ratio: 0.008 },
  { id: 'maint-h2', label: '氢能重卡维保', wan: 1200, ratio: 0.052 },
  { id: 'maint-ev', label: '电动重卡维保', wan: 340, ratio: 0.015 },
  { id: 'charge-svc', label: '中途充换电服务费', wan: 451, ratio: 0.020 },
  { id: 'charge-mine', label: '矿区充电费', wan: 171, ratio: 0.007 },
  { id: 'other', label: '其他车辆与设施', wan: 1261, ratio: 0.055 },
  { id: 'mgmt', label: '总部管理 + 数字化 + 安全', wan: 1450, ratio: 0.063 },
] as const

/** 氢相关综合险归集 */
export const H2_INSURANCE = {
  rate: 0.10, // 10%
  totalAssetWan: 35916,
  annualPremiumWan: 3592,
  breakdown: [
    { item: '氢能重卡资产值', assetWan: 6000, premiumWan: 600 },
    { item: '制氢系统资产值（28 MW）', assetWan: 23436, premiumWan: 2344 },
    { item: '加氢站资产值', assetWan: 6480, premiumWan: 648 },
  ],
  optimization: '通过集团统保 + 中再保分摊 + 政策性氢能保险池试点，可压降至 3% → 节省 2,515 万/年',
} as const

/** ==================== 收入 ==================== */

export const REVENUE_LINES = [
  { id: 'trunk', label: '中途运输服务（内部计价）', wanY1to10: 14112, years: 10, total: 141120 },
  { id: 'mining', label: '矿区运输服务（内部计价）', wanY1to10: 3243, years: 10, total: 32430 },
  { id: 'fcv-op', label: '张家口示范期氢能重卡运营补贴', wanY1to5: 1000, years: 5, total: 5000 },
  { id: 'station-op', label: '张家口加氢站建运补', wanY1to5: 1200, years: 5, total: 6000 },
  { id: 'oxygen', label: '副产氧气外售（22,528 t × 700 元）', wanY1to10: 1577, years: 10, total: 15770 },
  { id: 'ccer', label: 'CCER 碳收益', wanY1to10: 3000, years: 10, total: 30000 },
] as const

/** ==================== 财务评价 ==================== */

export const FINANCE_SCENARIOS = [
  {
    id: 'baseline',
    label: '基准 v2.3',
    desc: '服务定价 0.30 / 0.65、氢险 10%、税 25%、折现率 8%、上网电价 0.40、无氢外售',
    npvWan: -49787,
    irr: null,
    dpp: '> 10 年',
    payoff: 0.08,
    pass: false,
  },
  {
    id: 'opt-a',
    label: '优化 A',
    desc: '+ 西部大开发税收优惠 15%',
    npvWan: -49787,
    irr: null,
    dpp: '> 10 年',
    payoff: 0.08,
    pass: false,
  },
  {
    id: 'opt-b',
    label: '优化 B',
    desc: '+ 绿色信贷折现率 6%',
    npvWan: -38423,
    irr: null,
    dpp: '> 10 年',
    payoff: 0.26,
    pass: false,
  },
  {
    id: 'opt-c',
    label: '优化 C',
    desc: '+ 服务提价至 0.40 / 0.78',
    npvWan: -4632,
    irr: 7.4,
    dpp: '9.7 年',
    payoff: 1.00,
    pass: false,
  },
  {
    id: 'recommend',
    label: '推荐方案',
    desc: '+ 氢相关综合险 10% → 3%',
    npvWan: 8603,
    irr: 9.2,
    dpp: '8.9 年',
    payoff: 1.16,
    pass: true,
  },
  {
    id: 'recommend-ppa',
    label: '推荐方案 + 风光长协 PPA 0.30',
    desc: '+ 制氢电费 −1,408 万/年（v2.3 首选路径）',
    npvWan: 18968,
    irr: 12.9,
    dpp: '7.0 年',
    payoff: 1.35,
    pass: true,
    recommended: true,
  },
] as const

/** 10 年净现金流（基准 v2.3） */
export const CASHFLOW_BASELINE = [
  { year: 0, capex: -54450, revenue: 0, opex: 0, depreciation: 0, ebitda: -54450, salvage: 0, net: -54450 },
  { year: 1, capex: 0, revenue: 24132, opex: -23112, depreciation: -5445, ebitda: 1020, salvage: 0, net: 1020 },
  { year: 2, capex: 0, revenue: 24132, opex: -23112, depreciation: -5445, ebitda: 1020, salvage: 0, net: 1020 },
  { year: 3, capex: 0, revenue: 24132, opex: -23112, depreciation: -5445, ebitda: 1020, salvage: 0, net: 1020 },
  { year: 4, capex: 0, revenue: 24132, opex: -23112, depreciation: -5445, ebitda: 1020, salvage: 0, net: 1020 },
  { year: 5, capex: 0, revenue: 24132, opex: -23112, depreciation: -5445, ebitda: 1020, salvage: 0, net: 1020 },
  { year: 6, capex: 0, revenue: 21932, opex: -23112, depreciation: -5445, ebitda: -1180, salvage: 0, net: -1180 },
  { year: 7, capex: 0, revenue: 21932, opex: -23112, depreciation: -5445, ebitda: -1180, salvage: 0, net: -1180 },
  { year: 8, capex: 0, revenue: 21932, opex: -23112, depreciation: -5445, ebitda: -1180, salvage: 0, net: -1180 },
  { year: 9, capex: 0, revenue: 21932, opex: -23112, depreciation: -5445, ebitda: -1180, salvage: 0, net: -1180 },
  { year: 10, capex: 0, revenue: 21932, opex: -23112, depreciation: -5445, ebitda: -1180, salvage: 8200, net: 7020 },
] as const

/** 单变量临界值压力 */
export const SENSITIVITY = [
  { var: '氢相关综合险率', critical: '5.3%', distance: '+77%', meaning: '必须 ≤ 5.3%（用户原始 10% 项目严重亏损）', accent: 'flame' },
  { var: '内部中途运输定价', critical: '0.34 元/吨·km', distance: '−15%', meaning: '必须 ≥ 0.34', accent: 'gold' },
  { var: '氢能重卡利用率', critical: '108,000 km/年', distance: '−15.6%', meaning: '必须 ≥ 108,000 km（≈ 270 个作业日）', accent: 'gold' },
  { var: '柴油价', critical: '5.40 元/L', distance: '−28.0%', meaning: '必须 > 5.4 元/L', accent: 'h2' },
  { var: '氢能重卡整车价', critical: '42 万/台', distance: '+40%', meaning: '30 万采购价提供较大缓冲', accent: 'h2' },
  { var: '制氢电价', critical: '0.36 元/kWh', distance: '−10.0%', meaning: '必须 ≤ 0.36（v2.3 上网电价 0.40 超临界，需 PPA 0.30 对冲）', accent: 'flame' },
  { var: '氢气内部价', critical: '28 元/kg', distance: '+55.6%', meaning: '必须 ≤ 28', accent: 'gold' },
] as const

/** 与同类项目对比 */
export const PEER_COMPARISON = [
  { name: '内蒙古某矿区氢能重卡示范', scale: '200 氢', capexY: 5.2, npvY: 0.6, irr: 8.5, status: '已运营' },
  { name: '山西吕梁氢能重卡运输', scale: '50 氢', capexY: 1.8, npvY: 0.3, irr: 9.8, status: '已运营' },
  { name: '河北唐山钢铁运输氢能化', scale: '100 氢', capexY: 2.5, npvY: 0.5, irr: 10.2, status: '在建' },
  { name: '本项目（推荐 v2.3）', scale: '200 氢 + 100 电', capexY: 5.45, npvY: 0.86, irr: 9.2, status: '拟建', isOurs: true },
  { name: '本项目（推荐+PPA v2.3）', scale: '200 氢 + 100 电', capexY: 5.45, npvY: 1.90, irr: 12.9, status: '拟建', isOurs: true, accent: 'gold' },
] as const

/** 与柴油基准对比 */
export const DIESEL_COMPARISON = [
  { item: '车辆 CAPEX', new: 10500, diesel: 15000, delta: -4500 },
  { item: '配套设施 CAPEX', new: 43950, diesel: 500, delta: 43450 },
  { item: '总 CAPEX（万元）', new: 54450, diesel: 15500, delta: 38950, total: true },
  { item: '年能源', new: 6254, diesel: 38400, delta: -32146 },
  { item: '年维保 + 中修', new: 1639, diesel: 2400, delta: -761 },
  { item: '年人员', new: 7760, diesel: 4500, delta: 3260 },
  { item: '年保险（含氢险）', new: 3692, diesel: 450, delta: 3242 },
  { item: '年管理 + 其他', new: 1844, diesel: 1800, delta: 44 },
  { item: '年 OPEX 合计（万元）', new: 23112, diesel: 47550, delta: -24438, total: true },
] as const

/** 单位运输成本对比 */
export const UNIT_COST = {
  fleetAnnualKm: 32_140_000,
  annualTonKm: 5.88e8, // 5.88 亿吨·km
  newWithDepreciation: 0.49, // 元/吨·km
  newOpex: 0.39,
  newRecommend: 0.39,
  newPpa: 0.36,
  diesel: 0.83,
  saving: 0.34,
  savingRatio: 0.41,
} as const

/** 收入饼（示范期 第1-5 年） */
export const REVENUE_PIE_PHASE1 = [
  { name: '中途运输服务', wan: 14112, accent: '#22D3EE' },
  { name: '矿区运输服务', wan: 3243, accent: '#A3E635' },
  { name: '氢能重卡运营补贴', wan: 1000, accent: '#10B981' },
  { name: '加氢站建运补', wan: 1200, accent: '#34D399' },
  { name: '副产氧气', wan: 1577, accent: '#D4A24C' },
  { name: 'CCER 碳收益', wan: 3000, accent: '#F97316' },
] as const
