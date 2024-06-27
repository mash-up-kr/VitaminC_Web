import React from 'react'

import type { Metadata } from 'next'

import './globals.css'
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
      <body className={`${pretendard.className} ${pretendard.variable}`}>
        {children}
      </body>
    </html>
  )
}
