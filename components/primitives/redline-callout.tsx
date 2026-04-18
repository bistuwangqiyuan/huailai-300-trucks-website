import { AlertTriangle } from 'lucide-react'

import { cn } from '@/lib/utils'

export function RedlineCallout({
  title,
  lines,
  className,
}: {
  title: string
  lines: readonly string[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-flame-500/35 bg-flame-500/10 p-6 lg:p-8',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-flame-400" aria-hidden />
        <div>
          <p className="text-sm font-semibold tracking-wide text-flame-300">{title}</p>
          <ul className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-white/75">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
