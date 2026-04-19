import type { MetadataRoute } from 'next'

import { NAV } from '@/lib/nav'

const SITE = 'https://huailai-300-trucks.netlify.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-04-19')
  const routes = Array.from(new Set(NAV.map((n) => n.href)))
  return routes.map((path) => ({
    url: `${SITE}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
}
