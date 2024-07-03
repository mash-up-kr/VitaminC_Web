'use client'

import { forwardRef } from 'react'
import { QRCode } from 'react-qrcode-logo'

interface QRCodeBoxProps {
  url: string
  size: number
}

const QRColor = '#EAEBEE'
const BGColor = '#2B2E33'

const SIZE_PADDING = 20 // 실제로 20px 줄여야 원하는 사이즈가 됨

const QRCodeBox = forwardRef<QRCode, QRCodeBoxProps>(({ url, size }, ref) => {
  return (
    <QRCode
      ref={ref}
      value={url}
      size={size - SIZE_PADDING}
      removeQrCodeBehindLogo
      eyeRadius={6}
      logoImage="/chunsik.png"
      logoWidth={44}
      logoHeight={44}
      fgColor={QRColor}
      eyeColor={QRColor}
      bgColor={BGColor}
    />
  )
})

QRCodeBox.displayName = 'qr-code'

export default QRCodeBox
