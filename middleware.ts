import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_COOKIE = 'site-auth'
const AUTH_VALUE = 'ok'

const PUBLIC_PATH_PREFIXES = ['/login', '/api/login', '/_next', '/images', '/favicon']
const PUBLIC_EXACT = new Set(['/robots.txt', '/sitemap.xml', '/favicon.svg', '/favicon.ico'])

function isPublic(pathname: string): boolean {
  if (PUBLIC_EXACT.has(pathname)) return true
  for (const p of PUBLIC_PATH_PREFIXES) if (pathname.startsWith(p)) return true
  return false
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (isPublic(pathname)) return NextResponse.next()

  const cookie = req.cookies.get(AUTH_COOKIE)?.value
  if (cookie === AUTH_VALUE) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/login'
  if (pathname && pathname !== '/') url.searchParams.set('next', pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
}
