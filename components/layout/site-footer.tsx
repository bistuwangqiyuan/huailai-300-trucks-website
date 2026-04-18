import Link from 'next/link'

import { NAV, DASHBOARD_HREF } from '@/lib/nav'
import { PROJECT } from '@/lib/data/project'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <div className="mx-auto max-w-[1440px] px-5 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="eyebrow mb-3">数据来源</p>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {PROJECT.fullName}
            </h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/60">
              本站全部关键数字、表格与结论均与商业计划书{' '}
              <strong className="text-white/85">{PROJECT.version}</strong>{' '}
              对齐，并在各章节以「§章节号」标注可追溯锚点。商业计划书正文位于仓库目录{' '}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-[13px] text-h2-500">
                /商业计划书
              </code>
              。
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-white/45">
              概念示意图（配图）为 AI 生成或设计示意，不代表现场实景；正式对外材料以盖章版可研与财务模型为准。
            </p>
          </div>

          <div>
            <p className="eyebrow mb-3">站点地图</p>
            <ul className="grid gap-2 text-[14px] text-white/70">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 hover:text-h2-500"
                  >
                    <span className="text-white/35">§</span>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={DASHBOARD_HREF}
                  className="inline-flex items-center gap-2 hover:text-h2-500"
                >
                  <span className="text-white/35">§</span>
                  项目大屏
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3">联系与合规</p>
            <ul className="space-y-2 text-[14px] text-white/65">
              <li>业主：{PROJECT.owner.name}</li>
              <li>地址：{PROJECT.owner.location}</li>
              <li>编制：{PROJECT.publishedAt}</li>
            </ul>
            <p className="mt-6 text-[12px] leading-relaxed text-white/40">
              本站为项目展示与路演用途，不构成投资建议。部署：Netlify（Next.js App Router）。
            </p>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col gap-3 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {year} {PROJECT.owner.short} · 保留所有权利</p>
          <p className="font-mono text-[11px] tracking-wide">
            HUAILAI 300 TRUCKS · {PROJECT.version} · COMMERCIAL ROI FIRST
          </p>
        </div>
      </div>
    </footer>
  )
}
