import type { Metadata } from 'next'

import { DashboardClient } from './dashboard-client'

export const metadata: Metadata = {
  title: '项目大屏',
  description:
    '怀来 300 重卡项目指挥中心风格大屏：车队、制氢、加氢、充电与财务关键指标伪实时展示（数据口径对齐商业计划书 v2.3）。',
}

export default function DashboardPage() {
  return <DashboardClient />
}
