/**
 * 市场与政策环境
 * 数据源：商业计划书 v2.3 第 3 章
 */

export const POLICY_LEVELS = [
  {
    level: '国家级',
    color: '#D4A24C',
    items: [
      { name: '《氢能产业发展中长期规划（2021-2035）》', org: '国家发改委 / 能源局', date: '2022.03', point: '明确氢能战略地位，鼓励"绿氢就近消纳"' },
      { name: '《关于开展氢能综合应用试点工作的通知》', org: '财政部 / 工信部 / 国家发改委', date: '2026.03', point: '新增试点支持政策，规模化商业化推进' },
      { name: '燃料电池汽车示范期奖励', org: '财政部', date: '在执行', point: '按系统功率计奖（基准 3,000 元/kW），单台氢能重卡可达 30 万元' },
      { name: '购置税减免', org: '国家财政部 / 税总', date: '至 2027', point: '氢能重卡购置税全免；电动重卡 2024-2025 全免，2026-2027 减半' },
    ],
  },
  {
    level: '河北省',
    color: '#22D3EE',
    items: [
      { name: '《河北省氢能产业发展"十四五"规划》', org: '河北省发改委', date: '2022.06', point: '张家口、唐山、保定为氢能三大核心区' },
      { name: '《河北省支持张家口建设国家级氢能示范区若干措施》', org: '河北省政府', date: '2022', point: '省级配套补贴（按中央 1:1）+ 产业引导基金' },
    ],
  },
  {
    level: '张家口市',
    color: '#10B981',
    items: [
      { name: '加氢站建设补贴', org: '张家口市', date: '示范期内', point: '实际设备投资 20%，单座最高 400 万元（一次性）' },
      { name: '加氢站运营补贴', org: '张家口市', date: '示范期内', point: '氢气供应 ≤ 30 元/kg 时，每座最高 400 万元/年' },
      { name: '重卡运营补', org: '张家口市', date: '示范期内', point: '5 万元/台·年（年均用氢里程 ≥ 7,500 km）' },
      { name: '示范应用城市群行动方案', org: '张家口市', date: '2021.12 - 2025.12', point: '推广 1,130 辆燃料电池汽车，建 14 座加氢站' },
    ],
  },
  {
    level: '怀来县',
    color: '#A3E635',
    items: [
      { name: '土地使用绿色通道', org: '怀来县政府', date: '在执行', point: '示范区核心县属地协调' },
      { name: '电网接入绿色通道', org: '怀来县发改 + 国网', date: '在执行', point: '主变扩容审批简化' },
      { name: '环评 / 安评属地协调', org: '怀来县环保 + 应急', date: '在执行', point: '降低前期审批周期' },
    ],
  },
] as const

/** 示范期 1.7 亿政策资金组成 */
export const POLICY_DIVIDEND = {
  totalWan: 17000,
  items: [
    { id: 'fcv', label: '燃料电池示范期奖励', wan: 6000, calc: '30 万/台 × 200 台' },
    { id: 'op', label: '张家口运营补', wan: 5000, calc: '5 万/台·年 × 200 × 5 年' },
    { id: 'station', label: '加氢站建运补', wan: 6000, calc: '400 万/座·年 × 3 × 5 年' },
  ],
} as const

/** 行业市场格局：氢能重卡（2026 一季度） */
export const MARKET_FCEV = [
  { metric: '国内累计推广', value: '≈ 18,000 辆' },
  { metric: '主流车型', value: '49T 牵引（60%）/ 49T 自卸（25%）/ 其他（15%）' },
  { metric: '燃料电池系统功率', value: '130 - 150 kW' },
  { metric: '百公里氢耗', value: '7.0 - 8.5 kg/100km' },
  { metric: '招标限价区间', value: '90 - 128 万/台（公开）' },
  { metric: '业主直采价（v2.3 锚定）', value: '30 万/台（裸车）', accent: true },
  { metric: '储氢瓶', value: '8 - 10 瓶 @ 70 MPa，60 - 70 kg' },
  { metric: '续航 / 加注', value: '500 - 700 km / 8 - 15 分钟' },
] as const

export const MARKET_BEV = [
  { metric: '国内累计推广', value: '≈ 110,000 辆' },
  { metric: '主流车型', value: '49T 牵引（45%）/ 49T 自卸（40%）/ 矿用宽体（15%）' },
  { metric: '主流电池容量', value: '350 - 450 kWh' },
  { metric: '百公里电耗', value: '130 - 160 kWh/100km' },
  { metric: '价格区间', value: '100 - 200 万/台（含电池）' },
  { metric: '车电分离裸车价', value: '47 - 65 万/台' },
  { metric: '业主直采价（v2.3 锚定）', value: '45 万/台', accent: true },
  { metric: '续航 / 充电', value: '200 - 400 km / 30 - 60 分钟 80%（480-600 kW 超充）' },
] as const

export const MARKET_ELECTROLYZER = [
  { type: '碱性电解槽', share: '75%', priceMW: '500 - 650 万', kwh: '4.5 - 4.8 kWh/Nm³', startStop: '慢（10-30 分钟）', minLoad: '25-40%', life: '8-15 年' },
  { type: 'PEM', share: '18%', priceMW: '800 - 1,200 万', kwh: '4.6 - 5.0 kWh/Nm³', startStop: '快（< 1 分钟）', minLoad: '5-10%', life: '6-10 年' },
] as const

export const MARKET_STATION = [
  { metric: '国内已建加氢站', value: '≈ 540 座' },
  { metric: '1,000 kg/天 35 MPa 标准站', value: '1,800 - 2,500 万' },
  { metric: '1,000 kg/天 70 MPa 站', value: '2,500 - 3,500 万' },
  { metric: '现行氢气终端价', value: '35 - 65 元/kg（张家口示范区已降至 30 以下）' },
] as const

/** 替代能源价格趋势 */
export const ENERGY_TRENDS = [
  { name: '柴油（怀来加油站）', cur: '7.30 - 7.80 元/L', y2030: '7.5 - 9.0 元/L', trend: '上行' },
  { name: '工业用电（怀来）', cur: '0.55 - 0.70 元/kWh', y2030: '维持/微降', trend: '平' },
  { name: '谷电（22:00 - 06:00）', cur: '0.40 - 0.50 元/kWh', y2030: '维持', trend: '平' },
  { name: '自发自用绿电边际成本', cur: '0.18 - 0.22 元/kWh', y2030: '维持/微降', trend: '微降' },
  { name: '制氢成本（自发自用绿氢）', cur: '18 - 25 元/kg', y2030: '15 - 18 元/kg', trend: '下行' },
  { name: 'CCER 碳价', cur: '60 - 100 元/t', y2030: '100 - 200 元/t', trend: '上行' },
] as const

/** 政策风险与应对 */
export const POLICY_RISKS = [
  { risk: '示范期补贴退坡幅度大于预期', prob: '中', impact: 'NPV −3,000 万', mitigation: '第1年-第5年集中投入，最大化示范期回收' },
  { risk: '示范期截止后无延续', prob: '低', impact: 'NPV −2,500 万', mitigation: '提前申请国家级氢能综合应用试点' },
  { risk: '加氢站建设补贴上限下调', prob: '低', impact: 'CAPEX +800 万', mitigation: '锁定 2026 三季度前完成核准并启动建设' },
  { risk: 'CCER 方法学发布延迟', prob: '中', impact: 'NPV −1,200 万', mitigation: '改用绿色信贷利率优惠对冲' },
  { risk: '购置税减免提前结束', prob: '低', impact: 'CAPEX +600 万', mitigation: '加快采购节奏，2027 年内完成主体采购' },
] as const
