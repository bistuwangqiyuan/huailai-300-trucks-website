import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    host: 'https://huailai-300-trucks.netlify.app',
    sitemap: 'https://huailai-300-trucks.netlify.app/sitemap.xml',
    rules: [{ userAgent: '*', allow: '/' }],
  }
}
