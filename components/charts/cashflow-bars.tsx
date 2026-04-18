'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { CASHFLOW_BASELINE } from '@/lib/data/finance'

const rows = CASHFLOW_BASELINE.map((r) => ({
  year: `Y${r.year}`,
  net: r.net,
  ebitda: r.ebitda,
}))

export function CashflowBars() {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 6" vertical={false} />
          <XAxis dataKey="year" tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${(v / 10000).toFixed(1)} 亿`}
          />
          <Tooltip
            formatter={(v: number) => [`${v.toLocaleString('zh-CN')} 万元`, '']}
            labelFormatter={(l) => `年份：${l}`}
          />
          <Bar dataKey="net" name="净现金流" fill="#22D3EE" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
