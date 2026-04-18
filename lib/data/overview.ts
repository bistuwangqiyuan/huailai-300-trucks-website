/**
 * 项目背景与战略机遇（摘要）
 * 数据源：商业计划书 v2.3 第 1 章
 */

export const GENESIS = {
  dieselLiterYear: 6_450_000,
  dieselCostWanPerYear: 4839,
  dieselPricePerLiter: 7.5,
} as const

export const GOALS_V23 = [
  { dim: '商业经营目标（首要）', text: 'NPV > 0；IRR ≥ 8%；DPP ≤ 8 年；投入产出比 ≥ 1.30' },
  { dim: '单位成本目标', text: '全周期降低运输单位成本 ≥ 20%（低于柴油基准）' },
  { dim: '战略目标（辅助）', text: '矿区运输低碳化；张家口示范区协同（不参与主决策）' },
  { dim: '政策目标（辅助）', text: '完成张家口示范城市群第二阶段 200 台氢能重卡推广任务' },
  { dim: '技术目标', text: '基准 LCOH ≤ 22 元/kg（PPA 情景）；矿区充氢加电出勤率 ≥ 85%' },
  { dim: 'ESG 目标（辅助）', text: '年减排 ≥ 3.0 万 tCO₂e；ESG 评级提升 ≥ 2 档' },
] as const

export const ALTERNATIVES = [
  { name: '维持柴油', pros: ['资本支出低', '技术成熟'], cons: ['油价风险', '碳成本上升', '不符合战略'], verdict: '否决' },
  { name: '全部氢能重卡（300）', pros: ['零碳率最高', '政策红利最大'], cons: ['制氢成本高', '短倒工况浪费', '商业 ROI 显著低于推荐'], verdict: '否决' },
  { name: '全部电动重卡（300）', pros: ['纯财务 ROI 最优'], cons: ['工程可行性红线不通过（200 km 中途补能/续航/充电时间）'], verdict: '否决（仅作财务参照）' },
  { name: '2:1 混合（推荐）', pros: ['工况-车型双匹配', '商业+政策综合最优', '工程可行', '风险分散'], cons: ['需协调两套补能体系'], verdict: '推荐' },
  { name: '1:2 混合', pros: ['充电友好', '初期投资低'], cons: ['氢车规模不足', '示范区政策红利利用不充分'], verdict: '不推荐' },
] as const
