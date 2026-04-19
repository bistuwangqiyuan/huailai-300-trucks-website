import { NextResponse } from 'next/server'

const SITE_PASSWORD = process.env.SITE_PASSWORD ?? '88888888'
const COOKIE = 'site-auth'

export async function POST(req: Request) {
  let body: { password?: string; next?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_BODY' }, { status: 400 })
  }

  if (typeof body.password !== 'string' || body.password.length === 0) {
    return NextResponse.json({ ok: false, error: 'EMPTY_PASSWORD' }, { status: 400 })
  }

  if (body.password !== SITE_PASSWORD) {
    return NextResponse.json({ ok: false, error: 'WRONG_PASSWORD' }, { status: 401 })
  }

  const next = typeof body.next === 'string' && body.next.startsWith('/') ? body.next : '/'
  const res = NextResponse.json({ ok: true, next })
  res.cookies.set(COOKIE, 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return res
}
