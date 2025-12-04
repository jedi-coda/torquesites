import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // If domain is motamersham.co.uk, rewrite to /garages/newtown-garage
  if (hostname === 'motamersham.co.uk' || hostname === 'www.motamersham.co.uk') {
    // Only rewrite root path (not assets, etc.)
    if (url.pathname === '/') {
      url.pathname = '/newtown-garage'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}
