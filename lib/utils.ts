import clsx, { type ClassValue } from 'clsx'

export function cn(...args: ClassValue[]) {
  return clsx(args)
}

const formatter0 = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 0 })
const formatter1 = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 1, minimumFractionDigits: 1 })
const formatter2 = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

export function fmt(value: number, digits = 0): string {
  if (digits === 0) return formatter0.format(value)
  if (digits === 1) return formatter1.format(value)
  if (digits === 2) return formatter2.format(value)
  return new Intl.NumberFormat('zh-CN', {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value)
}


export function pct(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`
}

export function wanToYi(wan: number): string {
  return formatter2.format(wan / 10000)
}

export function fmtRange(min: number, max: number, unit?: string): string {
  return `${fmt(min)} - ${fmt(max)}${unit ? ' ' + unit : ''}`
}
