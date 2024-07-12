import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { AUTHORIZATION, RECENT_MAP_ID } from '@/utils/storage/index'

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl
  const pathname = url.pathname

  const authorization = request.cookies.get(AUTHORIZATION)?.value
  const recentMapId = request.cookies.get(RECENT_MAP_ID)?.value

  if (!authorization && pathname !== '/intro') {
    return NextResponse.redirect(new URL('/intro', request.url))
  }

  if (authorization && recentMapId && pathname === '/intro') {
    return NextResponse.redirect(
      new URL(`/map/${recentMapId || ''}`, request.url),
    )
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
