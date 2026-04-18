'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { CAPEX_BREAKDOWN } from '@/lib/data/finance'

const data = CAPEX_BREAKDOWN.map((d) => ({
  name: d.label,
  value: d.wan,
  color: d.accent,
}))

export function CapexDonut() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data as unknown as { name: string; value: number; color: string }[]}
            dataKey="value"
            nameKey="name"
            innerRadius={78}
            outerRadius={112}
            paddingAngle={2}
            stroke="transparent"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number) => [`${v.toLocaleString('zh-CN')} 万元`, '']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
