import React from 'react'

import type { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'
import { CustomToaster } from '@/components/common/custom-toast'
import { pretendard } from '@/styles/fonts'

export const metadata: Metadata = {
  title: '꼬르륵',
  description: '전설의 보물섬으로 가는 맛집 지도',
}

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
        <Script
          async
          strategy="beforeInteractive"
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
          crossOrigin="anonymous"
        />
        <main className="relative w-full max-w-[420px] min-h-dvh">
          {children}
          <CustomToaster />
        </main>
      </body>
    </html>
  )
}
