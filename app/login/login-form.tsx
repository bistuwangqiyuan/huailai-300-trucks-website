'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, type FormEvent } from 'react'
import { ArrowRight, KeyRound, Loader2, ShieldCheck } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const next = search.get('next') ?? '/'
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd, next }),
      })
      if (res.ok) {
        const data = (await res.json()) as { ok: boolean; next?: string }
        const target = data.next && data.next.startsWith('/') ? data.next : '/'
        router.replace(target)
        router.refresh()
        return
      }
      if (res.status === 401) setError('访问凭证不正确，请重试')
      else setError('请求失败，请稍后重试')
    } catch {
      setError('网络异常，请检查后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl shadow-[0_30px_120px_-40px_rgba(34,211,238,0.45)]"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_120%_50%_at_50%_-20%,rgba(34,211,238,0.18),transparent_60%)]" />

      <div className="flex items-center gap-3 text-h2-500">
        <span className="grid size-9 place-items-center rounded-lg border border-h2-500/40 bg-h2-500/10">
          <ShieldCheck className="size-4" />
        </span>
        <p className="text-[12px] font-medium tracking-[0.18em]">SECURE GATEWAY · v2.3</p>
      </div>

      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">输入访问凭证</h2>
      <p className="mt-2 text-[13px] text-white/55">
        本站设有访问保护，凭证由项目管理处统一下发。会话有效期 30 天，可在右上角「退出」清除。
      </p>

      <label className="mt-7 block text-[12px] font-medium tracking-wide text-white/55" htmlFor="pwd">
        访问凭证
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-ink-950/60 px-3 py-2 focus-within:border-h2-500/60 focus-within:ring-1 focus-within:ring-h2-500/30">
        <KeyRound className="size-4 text-white/45" aria-hidden />
        <input
          id="pwd"
          type="password"
          inputMode="numeric"
          autoComplete="current-password"
          autoFocus
          required
          minLength={4}
          placeholder="请输入凭证"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="w-full bg-transparent py-1 text-[15px] tracking-[0.18em] text-white outline-none placeholder:text-white/25"
        />
      </div>

      {error && (
        <p className="mt-3 rounded-lg border border-flame-500/30 bg-flame-500/10 px-3 py-2 text-[12px] text-flame-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-h2-500 px-5 py-3 text-[14px] font-semibold text-ink-950 transition hover:bg-h2-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            正在校验…
          </>
        ) : (
          <>
            进入站点
            <ArrowRight className="size-4" />
          </>
        )}
      </button>

      <p className="mt-5 text-center font-mono text-[11px] tracking-wider text-white/30">
        ENCRYPTED · HTTPONLY · SAMESITE-LAX
      </p>
    </form>
  )
}
