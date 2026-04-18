import type { MetadataRoute } from 'next'

import { DASHBOARD_HREF, NAV } from '@/lib/nav'

const SITE = 'https://huailai-300-trucks.netlify.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-04-19')
  const routes = [...NAV.map((n) => n.href), DASHBOARD_HREF]
  return routes.map((path) => ({
    url: `${SITE}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
}
