import { cn } from '@/lib/utils'

export function SourceRef({
  code,
  variant = 'dark',
}: {
  code: string
  variant?: 'dark' | 'light'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-[12px] font-mono tracking-wide',
        variant === 'light'
          ? 'border-ink-900/10 bg-ink-900/5 text-ink-700'
          : 'border-white/10 bg-white/5 text-white/70',
      )}
    >
      数据锚点 <span className="mx-1 text-white/35">·</span> {code}
    </span>
  )
}
