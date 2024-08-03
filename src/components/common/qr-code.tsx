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
  console.log(url)
  return (
    <QRCode
      ref={ref}
      value={url}
      size={size - SIZE_PADDING}
      removeQrCodeBehindLogo
      eyeRadius={6}
      logoImage="/images/square.png"
      logoWidth={36}
      logoHeight={36}
      fgColor={QRColor}
      eyeColor={QRColor}
      bgColor={BGColor}
    />
  )
})

QRCodeBox.displayName = 'qr-code'

export default QRCodeBox
