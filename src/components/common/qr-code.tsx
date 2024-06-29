'use client'

import { forwardRef } from 'react'
import { QRCode } from 'react-qrcode-logo'

interface QRCodeBoxProps {
  url: string
}

const QRColor = '#EAEBEE'
const BGColor = '#2B2E33'

const QRCodeBox = forwardRef<QRCode, QRCodeBoxProps>(({ url }, ref) => {
  return (
    <QRCode
      ref={ref}
      value={url}
      size={160}
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
