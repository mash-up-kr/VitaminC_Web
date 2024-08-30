import React from 'react'

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'
import { Analytics } from '@vercel/analytics/next'

import { CustomToaster } from '@/components/common/custom-toast'
import { pretendard } from '@/styles/fonts'

export const metadata: Metadata = {
  title: '꼬르륵',
  description: '전설의 보물섬으로 가는 맛집 지도',
  other: {
    'naver-site-verification': 'ae22710d3780384fb5665b6fed172612b84e5e39',
  },
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
        className={`${pretendard.className} ${pretendard.variable} flex items-start justify-center bg-neutral-800`}
      >
        {process.env.NODE_ENV === 'production' && <Analytics />}

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
        <main className="relative min-h-dvh w-full max-w-[420px]">
          {children}
          <CustomToaster />
        </main>
      </body>
      <GoogleAnalytics gaId={gaId} />
      <GoogleTagManager gtmId={gtagId} />
    </html>
  )
}
