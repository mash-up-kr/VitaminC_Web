import { cookies } from 'next/headers'
import { AUTHORIZATION } from '@/constants/cookie'
import { NextResponse } from 'next/server'

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
