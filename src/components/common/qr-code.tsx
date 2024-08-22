'use client'

import { forwardRef } from 'react'
import { QRCode as QRCodeLogo } from 'react-qrcode-logo'

interface QRCodeBoxProps {
  url: string
  size: number
}

const QRColor = '#EAEBEE'
const BGColor = '#2B2E33'

const SIZE_PADDING = 20 // 실제로 20px 줄여야 원하는 사이즈가 됨

const QRCode = forwardRef<QRCodeLogo, QRCodeBoxProps>(({ url, size }, ref) => {
  return (
    <QRCodeLogo
      ref={ref}
      value={url}
      size={size - SIZE_PADDING}
      removeQrCodeBehindLogo
      eyeRadius={6}
      logoImage="/images/QRLogo.png"
      logoWidth={40}
      logoHeight={40}
      fgColor={QRColor}
      eyeColor={QRColor}
      bgColor={BGColor}
    />
  )
})

QRCode.displayName = 'qr-code'

export default QRCode
