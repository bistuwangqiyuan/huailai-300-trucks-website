/**
 * 厂址、资源与既有资产
 * 数据源：商业计划书 v2.3 第 2 章
 */

export const SITE_LOCATION = {
  province: '河北省',
  city: '张家口市',
  county: '怀来县',
  town: '土木镇',
  detail: '怀来欣翰林文化旅游开发有限公司东 700 米',
  lat: 40.4,
  lng: 115.51,
  altitude: '540 - 720 m',
} as const

export const SITE_DISTANCES = [
  { label: '距京张高速最近匝道', km: 5 },
  { label: '距怀来县政府', km: 12 },
  { label: '距张家口市区', km: 65 },
  { label: '距北京六环', km: 95 },
] as const

export const CLIMATE = [
  { metric: '年均气温', value: '8.1 ℃', impact: '冬季低温对电动重卡续航有显著影响' },
  { metric: '极端低温', value: '-22 ℃', impact: '氢能重卡低温启动优势凸显' },
  { metric: '极端高温', value: '38 ℃', impact: '储氢瓶组散热设计需校核' },
  { metric: '年日照时数', value: '2,800 - 3,000 h', impact: '光伏年利用 1,500 h（实际可利用）' },
  { metric: '年均风速', value: '3.5 - 4.5 m/s', impact: '风电年利用 2,400 h' },
  { metric: '年降水量', value: '380 - 420 mm', impact: '半干旱，制氢用水需重视' },
  { metric: '主导风向', value: '冬西北 / 夏东南', impact: '加氢站防爆区设计依据' },
] as const

export const POWER_STATION_1GW = {
  status: '已建成 / 已并网 / 独立资产',
  edge: 'v2.3 出本项目财务边界',
  plates: [
    { type: '光伏', mw: 600, hours: 1500, twh: 0.9 },
    { type: '风电', mw: 400, hours: 2400, twh: 0.96 },
  ],
  totalMW: 1000,
  totalAnnualGenerationTwh: 1.86,
  consumption: {
    gridAbsorbed: { ratio: 0.6, twh: 1.116 },
    surplus: { ratio: 0.4, twh: 0.744 },
  },
  redlines: [
    '18.6 亿 kWh 全部上网，绝对不可用于本项目制氢',
    '不可用于扩展制氢规模',
    '不可用于矿区直供充电',
    '本项目所需电力一律按电网工商业电价 0.40 / 0.55 元/kWh 公允外购',
  ],
  ppaOption: {
    enabled: true,
    pricePerKwh: 0.3,
    note: '若签订市场化长协 PPA 0.30 元/kWh（≥ 上网电价 75% 合规底线），制氢电费 -1,408 万/年（v2.3 唯一商业杠杆）',
  },
} as const

/** 1 万亩储备地分配（亩） */
export const LAND_TOTAL_ACRE = 10000
export const LAND_RESERVE_ACRE = 1200

export const LAND_USE_TOP = [
  { id: 'pv', label: '风光电站本体', acre: 6500, ratio: 0.65 },
  { id: 'mining', label: '矿山生产作业区', acre: 1800, ratio: 0.18 },
  { id: 'project', label: '本项目可用', acre: 1200, ratio: 0.12, accent: true },
  { id: 'roads', label: '道路与防护', acre: 500, ratio: 0.05 },
] as const

/** 本项目 1,200 亩内分配 315 亩（v2.3） */
export const LAND_USE_PROJECT = [
  { id: 'h2', label: '28 MW 制氢厂房 + 配套', acre: 95, accent: 'h2' },
  { id: 'station', label: '加氢站 3 座', acre: 30, accent: 'h2' },
  { id: 'charging', label: '充电站集结点 5 处', acre: 25, accent: 'ev' },
  { id: 'storage', label: '储能站（100 MWh 预留）', acre: 60, accent: 'gold' },
  { id: 'sub', label: '配电与变电', acre: 15, accent: 'neutral' },
  { id: 'mgmt', label: '综合管理楼 / 食宿', acre: 20, accent: 'neutral' },
  { id: 'roads', label: '道路与场地', acre: 70, accent: 'neutral' },
] as const
export const LAND_USE_PROJECT_TOTAL = 315
export const LAND_USE_PROJECT_REMAIN = 885

/** 矿权与采掘 */
export const MINING_RIGHTS = {
  type: '新型石材原料（大理石/花岗岩复合）',
  capacityRange: '1,800 - 2,000 万吨/年',
  workfaces: '3 个，分别位于厂区东、南、西方向',
  routes: [
    { name: '工作面 → 破碎站', km: 4 },
    { name: '破碎站 → 加工厂/集运站', km: 12 },
  ],
} as const

/** 水资源 */
export const WATER = [
  {
    metric: '用水来源',
    value: '怀来县工业供水管网 + 矿区自有水库（5 万 m³）',
    impact: '充足',
  },
  { metric: '制氢年用水量', value: '~ 47,900 m³', impact: '占当地工业用水比例 < 1%' },
  { metric: '充电站冷却水', value: '~ 2,000 m³/年', impact: '可循环利用' },
  { metric: '水权审批', value: '县水利局已具备前置许可', impact: '不构成约束' },
] as const

/** 既有基础设施 */
export const INFRA_REUSE = [
  { item: '矿山道路', status: '良好', reuse: true },
  { item: '矿山供水', status: '良好', reuse: true },
  { item: '矿区办公楼', status: '良好', reuse: true },
  { item: '食堂宿舍', status: '在建（第1年完工）', reuse: true },
  { item: '矿山综合维修车间', status: '良好', reuse: true, note: '改造为新能源车维保中心' },
  { item: '110 kV 升压站', status: '已建成', reuse: true, note: '接入扩容' },
] as const
