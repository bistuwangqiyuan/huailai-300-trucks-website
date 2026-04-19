import type { Metadata } from 'next'

import { ExecutiveDashboard } from '@/components/features/executive-dashboard'

export const metadata: Metadata = {
  title: '项目大屏 · 综合指挥与决策中心',
  description:
    '怀来 300 辆矿山新能源运输车项目（v2.3）综合指挥与决策中心：运营、能源、财务、政策、ESG 全景大屏。',
}

export default function HomePage() {
  return <ExecutiveDashboard />
}
