/**
 * 技术路线 + 最优配比
 * 数据源：商业计划书 v2.3 第 4 章（技术）+ 第 8 章 / 第 8a 章（配比）
 */

/** 氢能 vs 电动 横向对比 */
export const TECH_COMPARE = [
  { dim: '续航里程', h2: '500 - 700 km', ev: '200 - 400 km', winner: 'h2' },
  { dim: '加注 / 充电时间', h2: '8 - 15 分钟', ev: '30 - 60 分钟（480 kW 超充）', winner: 'h2' },
  { dim: '低温启动（< -10 ℃）', h2: '续航影响 < 8%', ev: '续航下降 20 - 30%', winner: 'h2' },
  { dim: '工况-200 km 中途', h2: '单车日均 1 趟稳定可达', ev: '需中途换电', winner: 'h2' },
  { dim: '工况-矿区短倒（4 km × 18 趟）', h2: '可用但能源成本高', ev: '可计划性强、TCO 占优', winner: 'ev' },
  { dim: '车辆采购价（业主直采）', h2: '30 万/台', ev: '45 万/台（车电分离）', winner: 'h2' },
  { dim: '能源全成本（n=200 推荐）', h2: '47.94 元/kg ≈ 0.61 元/km', ev: '中途 0.28 / 矿区 0.17 元/km', winner: 'ev' },
  { dim: '配电基础设施压力', h2: '低（仅制氢 5.6 MW + 加氢站）', ev: '高（300 全电峰值 55.8 MW）', winner: 'h2' },
  { dim: '政策红利（张家口示范）', h2: '5 万/台·年 + 30 万一次性', ev: '购置税减免', winner: 'h2' },
  { dim: '碳减排效果', h2: '7,424 t（绿证后）', ev: '1,023 t', winner: 'ev' },
] as const

/** 配比枚举（综合氢成本 三层叠加摊薄 / v2.3） */
export const MIX_ENUMERATION = [
  { nH2: 0,   nEvTrunk: 240, nEvMine: 60, costWan: 7400,  h2Demand: 0,    chargingPeakMW: 55.8, feasible: false, note: '配电不可行' },
  { nH2: 180, nEvTrunk: 60,  nEvMine: 60, costWan: 15348, h2Demand: 2304, chargingPeakMW: 12.6, feasible: true },
  { nH2: 190, nEvTrunk: 50,  nEvMine: 60, costWan: 15445, h2Demand: 2432, chargingPeakMW: 10.5, feasible: true },
  { nH2: 200, nEvTrunk: 40,  nEvMine: 60, costWan: 15552, h2Demand: 2560, chargingPeakMW: 8.4,  feasible: true, recommended: true },
  { nH2: 210, nEvTrunk: 30,  nEvMine: 60, costWan: 15679, h2Demand: 2688, chargingPeakMW: 6.3,  feasible: true },
  { nH2: 220, nEvTrunk: 20,  nEvMine: 60, costWan: 15812, h2Demand: 2816, chargingPeakMW: 4.2,  feasible: true, note: '制氢满载' },
  { nH2: 230, nEvTrunk: 10,  nEvMine: 60, costWan: 16055, h2Demand: 2944, chargingPeakMW: 2.1,  feasible: false, note: '需扩容制氢' },
  { nH2: 240, nEvTrunk: 0,   nEvMine: 60, costWan: 16301, h2Demand: 3072, chargingPeakMW: 0,    feasible: false, note: '需扩容制氢' },
] as const

/** 综合氢成本三层叠加 vs n_氢 摊薄 */
export const H2_COST_BY_N = [
  { n: 180, baseline: 18.0, h2Cap: 11.88, stationCap: 5.86, insurance: 15.30, total: 51.04, perVehicleWan: 65.33 },
  { n: 190, baseline: 18.0, h2Cap: 11.26, stationCap: 5.55, insurance: 14.52, total: 49.33, perVehicleWan: 63.14 },
  { n: 200, baseline: 18.0, h2Cap: 10.69, stationCap: 5.28, insurance: 13.97, total: 47.94, perVehicleWan: 61.36, recommended: true },
  { n: 210, baseline: 18.0, h2Cap: 10.19, stationCap: 5.03, insurance: 13.41, total: 46.63, perVehicleWan: 59.69 },
  { n: 220, baseline: 18.0, h2Cap: 9.72,  stationCap: 4.80, insurance: 12.91, total: 45.43, perVehicleWan: 58.15 },
] as const

/** 商业 ROI 综合得分（5 个方案，6 个维度） */
export const ROI_RADAR_DIMS = [
  { id: 'payoff', label: '投入产出比 基准', weight: 0.30 },
  { id: 'dpp', label: '动态投资回收期', weight: 0.20 },
  { id: 'reliability', label: '出勤可控性', weight: 0.20 },
  { id: 'feasibility', label: '工程可行性', weight: 0.15 },
  { id: 'policy', label: '政策红利保留度', weight: 0.15 },
] as const

export const ROI_RADAR_DATA = [
  { name: '300 全电', payoff: 100, dpp: 100, reliability: 70, feasibility: 10, policy: 30, score: 65, accent: 'ev' },
  { name: '180 + 120', payoff: 35, dpp: 70, reliability: 85, feasibility: 95, policy: 90, score: 82, accent: 'gold' },
  { name: '200 + 100（推荐）', payoff: 33, dpp: 78, reliability: 95, feasibility: 95, policy: 94, score: 92, accent: 'h2', recommended: true },
  { name: '210 + 90', payoff: 30, dpp: 75, reliability: 96, feasibility: 95, policy: 96, score: 88, accent: 'h2' },
  // payoff / dpp 为「归一化展示分」：全氢方案基准投入产出比为负、回收期 >10 年（§8.3.2）
  { name: '300 全氢', payoff: 8, dpp: 12, reliability: 98, feasibility: 80, policy: 96, score: 72, accent: 'flame' },
] as const

/** 200 + 100 推荐解六大论据 */
export const RECOMMEND_ARGS = [
  { id: 'engineering', title: '工程可行性', body: '300 全电配电峰值 55.8 MW 不可行 → 必须有氢车分流；200+100 配电峰值 8.4 MW 与当前电网主变余量匹配' },
  { id: 'roi', title: '商业 ROI', body: '推荐+PPA 投入产出比 1.35× / NPV +1.90 亿 / IRR 12.9% / DPP 7.0 年' },
  { id: 'duty', title: '工况匹配', body: '200 km 中途持续作业 → 氢能重卡占优；矿区 4 km × 18 趟可计划 → 电动重卡占优' },
  { id: 'cost', title: '综合氢成本', body: '47.94 元/kg（n=200 v2.3）经氢险 + PPA 叠加 → 29.5 元/kg，商业闭环路径清晰' },
  { id: 'supply', title: '供能匹配', body: '制氢 28 MW → 2,816 t/年严格匹配 200 氢车 2,560 t + 10% 冗余，无外售 / 无扩容' },
  { id: 'policy', title: '政策红利', body: '200 台氢能重卡享 5 万/台·年 × 5 年 = 5,000 万运营补贴；3 加氢站 2,750 万建运补' },
] as const

/** 稳健性扰动测试 */
export const ROBUSTNESS = [
  { case: '推荐方案', cost: 15552, delta: 0, status: '基准' },
  { case: '综合氢成本 +10%', cost: 16876, delta: 1324, status: '可行' },
  { case: '综合氢成本 -10%', cost: 14441, delta: -1111, status: '可行' },
  { case: '电动重卡车辆侧 +10%', cost: 15782, delta: 230, status: '可行' },
  { case: '电动重卡车辆侧 -10%', cost: 15092, delta: -460, status: '可行' },
  { case: '氢险率 10% → 3%（集团采购）', cost: 13037, delta: -2515, status: '强建议路径', accent: 'gold' },
  { case: '风光长协 PPA 0.30 元/kWh', cost: 14144, delta: -1408, status: '核心商业杠杆', accent: 'h2' },
] as const
