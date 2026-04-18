'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { REVENUE_PIE_PHASE1 } from '@/lib/data/finance'

const data = REVENUE_PIE_PHASE1.map((d) => ({
  name: d.name,
  value: d.wan,
  color: d.accent,
}))

export function RevenueDonut() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={104}
            paddingAngle={2}
            stroke="transparent"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => [`${v.toLocaleString('zh-CN')} 万/年`, '']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
