import React from 'react'

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'
import { pretendard } from '@/styles/fonts'

export const metadata: Metadata = {
  title: '꼬르륵',
  description: '전설의 보물섬으로 가는 맛집 지도',
}

const gaId = 'G-J03LXYNV9K'
const gtagId = 'GTM-N8FPN3G2'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.className} ${pretendard.variable} flex justify-center items-start bg-neutral-800`}
      >
        <Script
          async
          strategy="beforeInteractive"
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`}
        />
        <main className="relative w-full max-w-[420px] min-h-dvh">
          {children}
        </main>
      </body>
      <GoogleAnalytics gaId={gaId} />
      <GoogleTagManager gtmId={gtagId} />
    </html>
  )
}
