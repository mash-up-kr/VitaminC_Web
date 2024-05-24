import { NextResponse } from 'next/server'

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const delay = Number(searchParams.get('delay'))

  await new Promise((resolve) => setTimeout(resolve, delay))

  return NextResponse.json({ ok: true, message: `delay ${delay}ms` })
}
