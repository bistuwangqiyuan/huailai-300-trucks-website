import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Noto_Sans_SC, JetBrains_Mono } from 'next/font/google'

import './globals.css'

import { Chrome } from '@/components/layout/chrome'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
  weight: ['300', '400', '500', '700', '900'],
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const SITE_URL = 'https://huailai-300-trucks.netlify.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '怀来 300 辆矿山新能源运输车项目 | 中基锡安 v2.3',
    template: '%s | 怀来 300 重卡 v2.3',
  },
  description:
    '在张家口怀来矿区建设「绿氢制储加 + 200 辆氢能重卡 + 100 辆电动重卡 + 矿区充换电体系」一体化纯商业项目。总投资 5.45 亿元，推荐+PPA 情景净现值 +1.90 亿、IRR 12.9%、动态回收期 7.0 年；年减排 31,383 tCO₂e。',
  keywords: [
    '怀来矿区',
    '氢能重卡',
    '电动重卡',
    '张家口示范',
    '绿氢',
    '电解槽',
    '加氢站',
    '换电站',
    'CCER',
    'ESG',
    '商业可行性',
    '中基锡安',
    'v2.3',
  ],
  authors: [{ name: '怀来中基锡安新型石材科技有限责任公司' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: SITE_URL,
    siteName: '怀来 300 辆矿山新能源运输车项目',
    title: '200 辆氢能 + 100 辆电动 重塑矿山运输',
    description:
      '总投资 5.45 亿，推荐+PPA NPV +1.90 亿、IRR 12.9%、回收 7.0 年。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '怀来 300 辆矿山新能源运输车项目 v2.3',
    description: '一体化纯商业项目，10 年实现矿区运输零碳化。',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#060912',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Project',
  name: '怀来中基锡安 300 辆矿山新能源运输车项目',
  description:
    '矿区绿氢制储加 + 200 辆氢能重卡 + 100 辆电动重卡 + 矿区充换电一体化纯商业项目（可行性研究 v2.3）。',
  url: SITE_URL,
  foundingDate: '2026',
  location: { '@type': 'Place', name: '河北省张家口市怀来县土木镇' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${notoSansSC.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-ink-950 font-sans antialiased text-bone-50">
        <Script id="ld-project" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        <Chrome>{children}</Chrome>
      </body>
    </html>
  )
}
