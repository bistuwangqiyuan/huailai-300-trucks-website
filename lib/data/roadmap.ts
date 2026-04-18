/**
 * 实施路径与里程碑
 * 数据源：商业计划书 v2.3 第 13 章
 */

export type Phase = {
  id: 'pilot' | 'scale' | 'steady'
  name: string
  shortName: string
  yearsLabel: string
  startMonth: string
  endMonth: string
  capexWan: number
  capexRatio: number
  goals: readonly string[]
  milestones: readonly { date: string; title: string; output: string }[]
}

export const PHASES: readonly Phase[] = [
  {
    id: 'pilot',
    name: '阶段 1 · 试点期',
    shortName: '试点',
    yearsLabel: '第 1 年（2026-01 ~ 2026-12）',
    startMonth: '2026-01',
    endMonth: '2026-12',
    capexWan: 12435,
    capexRatio: 0.228,
    goals: [
      '完成可研、立项、EPC 招标',
      '部署 30 台氢能重卡 + 15 台电动重卡 + 1 座加氢站 + 8 MW 电解槽 + 10 台超充',
      '启动试运营，回收 6 个月真实数据',
      '取得国家燃料电池示范期奖励首批资金 + 张家口示范配套首笔补贴',
    ],
    milestones: [
      { date: '2026-01', title: '可研报告 v1.0 评审通过', output: '立项决议' },
      { date: '2026-02', title: '项目立项申请', output: '发改委批复' },
      { date: '2026-03', title: '资金筹措完成', output: '绿色信贷 + 自有资金到位' },
      { date: '2026-04', title: 'EPC 招标启动', output: '招标公告发布' },
      { date: '2026-06', title: 'EPC 中标 + 主设备订货', output: '设备订单签约' },
      { date: '2026-07', title: '试点车辆首批到货', output: '30 氢能重卡 + 15 电动重卡入场' },
      { date: '2026-08', title: '8 MW 电解槽安装', output: '调试启动' },
      { date: '2026-10', title: '加氢站-01 建成', output: '投入运行' },
      { date: '2026-11', title: '试运营启动', output: '首月数据采集' },
      { date: '2026-12', title: '第 1 年总结评估', output: '配比方案微调建议' },
    ],
  },
  {
    id: 'scale',
    name: '阶段 2 · 放量期',
    shortName: '放量',
    yearsLabel: '第 2-3 年（2027-01 ~ 2028-06）',
    startMonth: '2027-01',
    endMonth: '2028-06',
    capexWan: 42015,
    capexRatio: 0.772,
    goals: [
      '车辆全部到位：累计 200 氢能重卡 + 100 电动重卡',
      '制氢系统全部建成：累计 28 MW v2.3（严格按车队需求 110% 反推）',
      '加氢站全部建成：累计 3 座',
      '充电桩全部建成：累计 30 台',
      '全队进入正式运营，柴油车队同步退役',
    ],
    milestones: [
      { date: '2027-Q1', title: '第二批车辆到货（70 + 35）', output: '累计 100 氢能重卡 + 50 电动重卡' },
      { date: '2027-Q2', title: '加氢站-02 建成 + 20 MW 电解槽全开', output: '累计 20 MW' },
      { date: '2027-Q3', title: '第三批车辆到货（70 + 35）', output: '累计 170 氢能重卡 + 85 电动重卡' },
      { date: '2027-Q4', title: '加氢站-03 建成', output: '加氢站全部投运' },
      { date: '2028-Q1', title: '28 MW 电解槽全部建成 v2.3', output: '制氢能力达成（2,816 t/年）' },
      { date: '2028-Q2', title: '配电改造完成、全部充电桩投运', output: '充电体系建成' },
    ],
  },
  {
    id: 'steady',
    name: '阶段 3 · 替代与稳态运营',
    shortName: '稳态',
    yearsLabel: '第 4-10 年（2028-07 ~ 2035-12）',
    startMonth: '2028-07',
    endMonth: '2035-12',
    capexWan: 0,
    capexRatio: 0,
    goals: [
      '完全替代柴油运输（柴油车队退役完毕）',
      '副产氧气、绿证、CCER 等合规副产收益稳态变现',
      '取得 CCER 核证并入账首批',
      '【v2.3 已删除】启动富余氢的对外销售',
      '评估扩能空间（仅当车队扩至 400+ 台时启动）',
    ],
    milestones: [
      { date: '2028-Q3', title: '柴油车队完全退役', output: '完成全替代' },
      { date: '2028-Q4', title: '副产氧气稳态销售达 2.2 万吨/年', output: '销售率 ≥ 95%' },
      { date: '2029-Q2', title: 'CCER 首批入账', output: '碳收益落地' },
      { date: '2030-Q4', title: '示范期补贴结束、过渡至常态运营', output: '5 年示范期收尾' },
      { date: '2031-Q1', title: '扩能预研启动（仅当车队扩至 400+ 台时）', output: '反推扩能制氢规模' },
      { date: '2033-Q4', title: '二期扩能（如批准）建成', output: '新增车队入场' },
      { date: '2035-Q4', title: '项目 10 年评价期结束', output: '残值评估' },
    ],
  },
]

/** 8 个 EPC 标段 */
export const TENDERS = [
  { id: 'truck-h2', name: '标段 1 · 氢能重卡', desc: '200 台 49T（30 万/台）', wan: 6000, suppliers: ['福田', '陕汽', '东风'] },
  { id: 'truck-ev', name: '标段 2 · 电动重卡', desc: '100 台 49T（45 万/台）', wan: 4500, suppliers: ['重汽', '陕汽', '解放'] },
  { id: 'h2-system', name: '标段 3 · 制氢系统 v2.3', desc: '28 MW（24 Alk + 4 PEM）', wan: 23436, suppliers: ['阳光氢能', '隆基', '亿华通'], accent: 'gold' },
  { id: 'station', name: '标段 4 · 加氢站', desc: '3 座 1,000 kg/天', wan: 6480, suppliers: ['厚普', '合众思壮', '重塑'] },
  { id: 'charging', name: '标段 5 · 充电体系', desc: '30 桩 + 1 换电站 + 配电', wan: 9434, suppliers: ['特来电', '星星充电', '南瑞'] },
  { id: 'civil', name: '标段 6 · 土建与配套', desc: '场地 / 围墙 / 办公', wan: 2300, suppliers: ['当地施工总包'] },
  { id: 'super', name: '标段 7 · 监理', desc: '全过程监理', wan: 800, suppliers: ['国家级监理资质'] },
  { id: 'insurance', name: '标段 8 · 氢相关综合险 v2.3', desc: '车 + 制氢 + 加氢站资产保险（首年集采）', wan: 3592, suppliers: ['中再保 + 经纪人招标'], note: '/年', accent: 'flame' },
] as const

/** 数字化系统 */
export const DIGITAL_SYSTEMS = [
  { name: '车辆调度系统（TMS）', func: '全队任务排班、动态调度', wan: 200 },
  { name: '充电调度系统（EMS）', func: '充电峰谷优化、绿电匹配', wan: 150 },
  { name: '制氢运营系统（DCS+SCADA）', func: '28 MW 制氢全流程监控', wan: 0, included: true },
  { name: '加氢站管理系统（HSMS）', func: '3 座加氢站统一管理', wan: 100 },
  { name: '碳资产管理系统', func: 'CCER 核证、ESG 数据', wan: 80 },
  { name: '综合运营智能平台', func: '全场景数据汇聚与决策', wan: 150 },
] as const

/** 关键运营 KPI */
export const OPERATION_KPI = [
  { metric: '氢能重卡 单车年里程', target: '≥ 128,000 km' },
  { metric: '电动重卡 中途单车年里程', target: '≥ 110,000 km（含换电）' },
  { metric: '电动重卡 矿区单车年里程', target: '≥ 47,000 km' },
  { metric: '单车出勤率', target: '≥ 75%' },
  { metric: '基准 LCOH 目标', target: '≤ 22 元/kg（PPA + 国产化后）' },
  { metric: '加氢站日加注量', target: '≥ 1,200 kg/座' },
  { metric: '充电桩利用率', target: '≥ 60%' },
  { metric: '对外氢气销售', target: '0 t/年（v2.3 不规划）', accent: true },
  { metric: '副产氧气销售率', target: '≥ 95%（21,400+ t/年）' },
  { metric: 'HSE 事故率', target: '< 0.5 次/千万车·km' },
  { metric: 'ESG 评级', target: 'A- 及以上' },
] as const
