/**
 * 项目顶层信息 / 关键 KPI
 * 数据源：商业计划书 v2.3 第 0 章 / 第 1 章 / 第 8 章 / 第 9-12 章
 */

export const PROJECT = {
  name: '怀来中基锡安 300 辆矿山新能源运输车项目',
  fullName: '怀来中基锡安新型石材科技有限责任公司 矿区 300 台氢能/电动重卡可行性研究项目',
  shortName: '怀来 · 300 重卡',
  version: 'v2.3',
  versionLabel: '电氢完全分离 / 商业 ROI 优先 / 无氢外售',
  publishedAt: '2026-04',
  owner: {
    name: '怀来中基锡安新型石材科技有限责任公司',
    short: '中基锡安',
    location: '河北省张家口市怀来县土木镇',
    business: ['大型石材矿山开采', '新型人造石材深加工', '矿区物料综合运输'],
    assets: ['完整矿权', '1 GW 风光互补电站（独立资产）', '1 万亩储备建设用地'],
  },
  oneLiner: '矿区氢能 + 电动重卡 一体化纯商业项目',
  positioning: '电氢完全分离 / 商业 ROI 优先 / 无氢外售',
  hero: {
    eyebrow: 'v2.3 · 商业 ROI 优先 · 电氢完全分离 · 无氢外售',
    title: '200 辆氢能 + 100 辆电动\n重塑矿山运输',
    lede:
      '在张家口怀来矿区，建设「绿氢制储加（电网公允购电）+ 新能源重卡车队 + 矿区充换电体系」一体化纯商业项目，承担 200 km 中途运输 + 矿区短倒双工况，10 年实现矿区运输零碳化。',
  },
  buildPeriodMonths: 24,
  evalPeriodYears: 10,
  startYear: 2026,
  endYear: 2035,
  fleet: {
    total: 300,
    h2: { count: 200, role: '中途主力', spec: '49 吨牵引车', dailyDistanceKm: 400 },
    ev: {
      count: 100,
      breakdown: { trunk: 40, mining: 60 },
      role: '40 中途备份 + 60 矿区短倒',
      spec: '49 吨',
    },
    ratio: '2 : 1',
  },
} as const

export type Kpi = {
  id: string
  label: string
  value: number | string
  unit?: string
  prefix?: string
  delta?: string
  src: string
  hint?: string
  tone?: 'gold' | 'h2' | 'ev' | 'emerald' | 'flame' | 'neutral'
}

/** 首页 / Hero 6 张核心 KPI */
export const HEADLINE_KPIS: readonly Kpi[] = [
  {
    id: 'capex',
    label: '总投资',
    value: 5.45,
    unit: '亿元',
    delta: '−1,728 万 vs v2.2',
    src: '§9.1',
    tone: 'neutral',
  },
  {
    id: 'npv',
    label: '净现值（推荐+PPA）',
    value: 1.9,
    unit: '亿元',
    prefix: '+',
    src: '§10.6',
    tone: 'gold',
  },
  {
    id: 'irr',
    label: '内部收益率',
    value: 12.9,
    unit: '%',
    src: '§10.6',
    tone: 'gold',
  },
  {
    id: 'dpp',
    label: '动态投资回收期',
    value: 7.0,
    unit: '年',
    src: '§10.6',
    tone: 'h2',
  },
  {
    id: 'mix',
    label: '推荐车队配比',
    value: '200 / 100',
    unit: '氢 / 电（2:1）',
    src: '§8.1',
    tone: 'h2',
  },
  {
    id: 'co2',
    label: '年减排（绿证口径）',
    value: 31383,
    unit: 'tCO₂e/年',
    src: '§12.2.3',
    tone: 'emerald',
  },
] as const

/** v2.3 五大关键修订（vs v2.2） */
export const V23_REVISIONS = [
  {
    id: 'r1',
    title: '评价定位',
    from: '战略示范 + 商业',
    to: '纯商业项目，追求最高投入产出比',
    impact: '决策排序依据改为 NPV / IRR / 投入产出比',
  },
  {
    id: 'r2',
    title: '电氢分离',
    from: '1 GW 风光出范围（v2.2 已生效）',
    to: '1 GW 风光出范围 + 富余 7.44 亿 kWh 全部上网（不可用于制氢/充电）',
    impact: '零交叉全面闭环',
  },
  {
    id: 'r3',
    title: '制氢规模',
    from: '30 MW · 2,880 t/年（含 320 t 外售）',
    to: '28 MW · 2,816 t/年（按车队 ×110% 反推 / 无外售）',
    impact: 'CAPEX −1,728 万；OPEX −377 万',
  },
  {
    id: 'r4',
    title: '氢外售收入',
    from: '704 万/年（320 t × 22 元/kg）',
    to: '0（业主 v2.3 不规划任何对外氢气销售）',
    impact: '财务"纯净"；规模严格匹配车队',
  },
  {
    id: 'r5',
    title: '推荐 + PPA NPV',
    from: '+1.06 亿（v2.2）',
    to: '+1.90 亿（IRR 12.9% / DPP 7.0 年）',
    impact: '保留四项优化叠加 + 风光长协 PPA 0.30',
  },
] as const

/** v2.3 四条红线（电氢完全分离的硬约束） */
export const V23_REDLINES = [
  '风光电站的 18.6 亿 kWh 年发电量全部上网，绝对不可用于本项目制氢',
  '不可用于扩展制氢规模，不可用于矿区直供充电',
  '本项目所需制氢与充电电力一律按电网工商业电价 0.40 / 0.55 元/kWh 公允外购',
  '风光电站与本项目之间零交叉补贴，财务边界完全隔离',
] as const

/** 项目要览 9 个卡 */
export const PROJECT_AT_A_GLANCE = [
  { label: '总车队规模', value: '300 台', hint: '既定约束', src: '§0.3' },
  { label: '配比', value: '2 : 1', hint: '商业 ROI 综合最优', src: '§8.1' },
  { label: '氢能重卡', value: '200 台', hint: '中途主力 200 km', src: '§0.3' },
  { label: '电动重卡', value: '100 台', hint: '40 中途 + 60 矿区', src: '§0.3' },
  { label: '制氢系统装机', value: '28 MW', hint: '24 Alk + 4 PEM', src: '§9.2.2' },
  { label: '年制氢调度量', value: '2,816 t', hint: '按车队 ×110% 反推', src: '§0.3' },
  { label: '建设期', value: '24 个月', hint: '试点 → 放量 → 替代', src: '§0.3' },
  { label: '评价期', value: '10 年', hint: '2026 ~ 2035', src: '§0.3' },
  { label: '对外氢气销售', value: '0', hint: 'v2.3 不规划', src: '§0.3' },
] as const

/** 三大配置对比（首页 + 技术页通用） */
export const THREE_CONFIGS = [
  {
    id: 'all-ev',
    label: '300 全电',
    nH2: 0,
    nEv: 300,
    annualCostWan: 7400,
    payoffRatio: 1.65,
    dpp: 6.1,
    score: 65,
    verdict: '✗ 工程不可行',
    reason: '配电峰值 55.8 MW 远超怀来县电网当前主变能力；新申请 110 kV 接入工程工期 ≥ 36 月、审批风险极高',
    accent: 'ev' as const,
  },
  {
    id: 'mix',
    label: '200 + 100（推荐）',
    nH2: 200,
    nEv: 100,
    annualCostWan: 15552,
    payoffRatio: 1.35,
    dpp: 7.0,
    score: 92,
    verdict: '✓ 商业 + 政策 综合最优',
    reason: '工况-车型双匹配 / 工程可行 / 政策红利保留 / 商业 ROI 达标 / 双路线风险分散',
    accent: 'h2' as const,
    recommended: true,
  },
  {
    id: 'all-h2',
    label: '300 全氢',
    nH2: 300,
    nEv: 0,
    annualCostWan: 18100,
    payoffRatio: -0.28,
    dpp: 0,
    score: 72,
    verdict: '✗ 不推荐',
    reason: '矿区氢车经济性差（24.4 vs 矿区电车 12.2 万/年）+ 需扩至 34 MW 制氢 + 4 加氢站',
    accent: 'gold' as const,
  },
] as const

/** 推荐方案 vs 推荐+PPA 对比 */
export const RECOMMEND_VS_PPA = [
  { metric: '净现值（6% 折现）', unit: '亿元', recommend: 0.86, ppa: 1.9, threshold: '> 0' },
  { metric: '内部收益率', unit: '%', recommend: 9.2, ppa: 12.9, threshold: '≥ 8%' },
  { metric: '动态投资回收期', unit: '年', recommend: 8.9, ppa: 7.0, threshold: '≤ 8 年' },
  { metric: '投入产出比', unit: '×', recommend: 1.16, ppa: 1.35, threshold: '≥ 1.0' },
  {
    metric: '单位运输成本',
    unit: '元/吨·km',
    recommend: 0.39,
    ppa: 0.36,
    threshold: '< 0.81（柴油）',
  },
  {
    metric: 'EBITDA 率（第1-5 年）',
    unit: '%',
    recommend: 4.2,
    ppa: 42.0,
    threshold: '30-45%（行业优秀）',
  },
] as const
