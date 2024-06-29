import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
  const [userId, mapName] = [
    request.nextUrl.searchParams.get('userId'),
    request.nextUrl.searchParams.get('mapName'),
  ]

  console.log(userId)

  if (!userId || !mapName) {
    return NextResponse.redirect(new URL('/empty', request.url))
  }
}

export const config = {
  matcher: ['/map', '/place/:placeId*', '/search'],
}
