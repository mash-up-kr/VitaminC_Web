import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { cookies } from 'next/headers'
import { AUTHORIZATION } from '@/constants/cookie'

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl
  const pathname = url.pathname

  const authorization = cookies().get(AUTHORIZATION)?.value

  const isPublicPage = pathname === '/intro' || pathname === '/invite'

  if (!authorization && !isPublicPage) {
    return NextResponse.redirect(new URL('/intro', request.url))
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
}
