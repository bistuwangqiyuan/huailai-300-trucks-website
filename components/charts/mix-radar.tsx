'use client'

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { ROI_RADAR_DATA } from '@/lib/data/technology'

const data = ROI_RADAR_DATA.map((d) => ({
  subject: d.name.replace('（推荐）', ''),
  payoff: d.payoff,
  dpp: d.dpp,
  reliability: d.reliability,
  feasibility: d.feasibility,
  policy: d.policy,
}))

export function MixRadar() {
  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="52%" outerRadius="72%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="投入产出比" dataKey="payoff" stroke="#D4A24C" fill="#D4A24C" fillOpacity={0.15} />
          <Radar name="动态回收期" dataKey="dpp" stroke="#22D3EE" fill="#22D3EE" fillOpacity={0.12} />
          <Radar name="出勤可控性" dataKey="reliability" stroke="#A3E635" fill="#A3E635" fillOpacity={0.12} />
          <Radar name="工程可行性" dataKey="feasibility" stroke="#10B981" fill="#10B981" fillOpacity={0.12} />
          <Radar name="政策红利" dataKey="policy" stroke="#F97316" fill="#F97316" fillOpacity={0.12} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
