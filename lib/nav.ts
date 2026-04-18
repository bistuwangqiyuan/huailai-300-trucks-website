export type NavItem = {
  href: string
  label: string
  short?: string
  hint?: string
}

export const NAV: readonly NavItem[] = [
  { href: '/', label: '首页', short: 'Home', hint: '项目要览 + 关键 KPI' },
  { href: '/overview', label: '项目概览', short: 'Overview', hint: '背景 / 目标 / 战略机遇' },
  { href: '/site', label: '厂址与资源', short: 'Site', hint: '区位 / 气候 / 1 GW 风光（独立资产）' },
  { href: '/policy', label: '市场与政策', short: 'Policy', hint: '四级政策 / 1.7 亿示范红利' },
  { href: '/technology', label: '技术与配比', short: 'Tech', hint: '氢电对比 / 200+100 论证' },
  { href: '/system', label: '制储加电', short: 'System', hint: '28 MW / 3 加氢 / 30 充电' },
  { href: '/finance', label: '投资与财务', short: 'Finance', hint: 'CAPEX / OPEX / NPV / IRR' },
  { href: '/esg', label: 'ESG 与碳收益', short: 'ESG', hint: '减排 / 评级 / 绿色金融' },
  { href: '/roadmap', label: '实施路径', short: 'Roadmap', hint: '三阶段 / 8 标段' },
] as const

export const DASHBOARD_HREF = '/dashboard'
