import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter: 10 POST submissions per IP per 10 minutes
const LIMIT = 10
const WINDOW_MS = 10 * 60 * 1000

const store = new Map<string, { count: number; resetAt: number }>()

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export function middleware(req: NextRequest) {
  if (req.method !== 'POST') return NextResponse.next()

  const ip = getIp(req)
  const key = ip
  const now = Date.now()

  const entry = store.get(key)
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return NextResponse.next()
  }

  entry.count += 1
  if (entry.count > LIMIT) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/adoptions', '/api/contacts', '/api/volunteers'],
}
