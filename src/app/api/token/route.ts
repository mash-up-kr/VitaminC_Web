import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { AUTHORIZATION } from '@/constants/cookie'

export async function GET() {
  const cookieStore = cookies()
  const token = cookieStore.get(AUTHORIZATION)

  if (!token?.value) {
    return NextResponse.json(
      { message: 'Unauthorized', statusCode: 401 },
      {
        status: 401,
      },
    )
  }

  return NextResponse.json({
    message: 'success',
    data: { token: token.value },
  })
}

export async function DELETE() {
  const cookieStore = cookies()
  const token = cookieStore.get(AUTHORIZATION)

  if (!token?.value) {
    return NextResponse.json(
      { message: '쿠키 없는데 뭘 또 지워!', statusCode: 404 },
      { status: 404 },
    )
  }

  cookieStore.set(AUTHORIZATION, '', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    expires: new Date(Date.now() - 1),
    domain: process.env.NODE_ENV === 'production' ? '.korrk.kr' : 'localhost',
  })

  return NextResponse.json({ message: 'success', data: {} })
}
