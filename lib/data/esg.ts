/**
 * ESG 与碳收益
 * 数据源：商业计划书 v2.3 第 12 章
 */

export const CARBON_BASELINE = {
  oilLiterPerKm: 0.38, // L/km
  factor: 3.10, // kgCO₂e/L
  fleetAnnualKm: 33_811_200,
  annualEmissionTon: 39_830,
  perVehiclePer100Km: 117.8,
} as const

export const CARBON_NEW = {
  h2: {
    factorKgPerKgH2: 2.9, // 绿证覆盖后
    annualH2Ton: 2560,
    annualEmissionTon: 7424,
  },
  ev: {
    factorRECCovered: 0.02,
    factorUncovered: 0.581,
    annualKwh: 9_820_000,
    coverRatio: 0.95,
    annualEmissionTon: 1023,
  },
  totalEmissionTon: 8447,
} as const

export const CARBON_SAVING = {
  annualTon: 31_383,
  saveRatio: 0.788, // 78.8%
  tenYearAccumTon: 313_830,
  equivalent: [
    '种植 168 万棵成年乔木',
    '减少 1,320 万次普通汽油车 1 km 出行',
    '抵消 70,200 户家庭年用电碳排',
  ],
} as const

export const CCER_SCENARIOS = [
  { name: '悲观', pricePerTon: 40, annualWan: 1255, tenYearWan: 12553 },
  { name: '基准', pricePerTon: 80, annualWan: 2511, tenYearWan: 25106, recommended: true },
  { name: '乐观', pricePerTon: 120, annualWan: 3766, tenYearWan: 37660 },
] as const

export const ESG_RATING = [
  { dim: '环境 (E)', before: 'BB', after: 'A', delta: '+3 档' },
  { dim: '社会 (S)', before: 'BB', after: 'BBB', delta: '+1 档' },
  { dim: '治理 (G)', before: 'BBB', after: 'BBB', delta: '持平' },
  { dim: '综合 ESG', before: 'BB', after: 'A-', delta: '+2 档', accent: true },
] as const

export const ESG_FINANCIAL_VALUE = [
  { item: '绿色信贷利率优惠', value: 'LPR -1.5%', detail: '约 1.5 个百分点' },
  { item: '60% 项目融资规模', value: '3.27 亿元', detail: '总投 5.45 亿 × 60%' },
  { item: '10 年累计利息节约', value: '2,693 万元', detail: '按本金递减、年均节息约 269 万元', accent: true },
  { item: '上市估值溢价', value: '8% - 15%', detail: 'ESG A 级溢价（若适用）' },
  { item: '国际碳市场进入门槛', value: '提前 2 年', detail: '' },
  { item: '政策性银行融资可获得性', value: '显著提升', detail: '国开、农发' },
] as const

export const GREEN_FINANCE_TOOLS = [
  { tool: '绿色信贷', basis: '人行《绿色债券支持项目目录》', match: '达标（氢能 + 新能源汽车）' },
  { tool: '绿色债券', basis: '人行 + 银保监', match: '达标（项目规模 5.45 亿符合发债门槛）' },
  { tool: '碳减排支持工具', basis: '人行 2021 设立', match: '达标（覆盖煤炭清洁利用、新能源）' },
  { tool: '转型金融', basis: 'G20 转型金融原则', match: '达标（重型货运转型典型场景）' },
  { tool: '主权 ESG 基金', basis: '国家级新能源基金', match: '达标（张家口示范区项目优先）' },
  { tool: '国际气候基金', basis: 'GCF / CIF 等', match: '达标（中国氢能产业首批项目可申报）' },
] as const

export const EMPLOYMENT = [
  { role: '司机', count: 300, type: '直接' },
  { role: '制氢运维', count: 15, type: '直接' },
  { role: '加氢站运营', count: 12, type: '直接' },
  { role: '充电站运营', count: 8, type: '直接' },
  { role: '维保工程师', count: 35, type: '直接' },
  { role: '管理与安全', count: 15, type: '直接' },
  { role: '间接拉动（供应链）', count: 150, type: '间接' },
] as const
export const EMPLOYMENT_TOTAL = 535

export const REGIONAL_CONTRIBUTION = [
  { scope: '张家口示范城市群', value: '200 台氢能重卡 + 3 加氢站', ratio: '占剩余指标 47% / 14 座目标的 21%' },
  { scope: '怀来县', value: '年新增工业增加值 1.2 亿', ratio: '税收 1,800 万元/年' },
  { scope: '京张氢能枢纽', value: '辐射北京 / 太原 / 大同 等', ratio: '区域氢能消费节点' },
  { scope: '河北省', value: '可复制"风光-氢-车"产业模型', ratio: '20+ 矿业大县示范模板' },
] as const

export const INTERNATIONAL = [
  { framework: '欧盟 CBAM（碳边境调节机制）', status: '2026 年全面实施', match: '矿区运输服务碳足迹符合钢铁原料链条要求，间接减轻业主 CBAM 合规负担' },
  { framework: 'SBTi（科学碳目标倡议）', status: '行业认证体系', match: '78.8% 减排率符合 1.5℃ 路径，业主可申请 SBTi 认证' },
  { framework: 'RE100（百分百可再生能源）', status: '全球 400+ 企业加入', match: '基于 1 GW 风光 + 绿证 + 本项目，业主可申请加入 RE100' },
] as const
