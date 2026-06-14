import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const { nextUrl } = request
  const { hostname } = nextUrl

  if (!hostname.startsWith('www.')) {
    return NextResponse.next()
  }

  const redirectUrl = nextUrl.clone()
  redirectUrl.hostname = hostname.slice(4)

  if (!redirectUrl.hostname) {
    return NextResponse.next()
  }

  redirectUrl.protocol = 'https:'

  return NextResponse.redirect(redirectUrl, 308)
}

export const config = {
  matcher: '/:path*',
}
