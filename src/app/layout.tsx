import React from 'react'

import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'
import { CustomToaster } from '@/components/common/custom-toast'
import { pretendard } from '@/styles/fonts'

export const metadata: Metadata = {
  title: '꼬르륵',
  description: '전설의 보물섬으로 가는 맛집 지도',
  keywords: ['꼬르륵', '맛집', '함께 만드는 맛집 지도'],
  metadataBase: new URL('https://www.korrk.kr'),
  openGraph: {
    type: 'website',
    title: '꼬르륵',
    description: '보물섬으로 가는 맛집지도, 같이 채워볼래?',
    locale: 'ko_KR',
    images: 'https://www.korrk.kr/images/opengraph-image.png',
    url: 'https://www.korrk.kr',
  },
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
        <Analytics />
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
