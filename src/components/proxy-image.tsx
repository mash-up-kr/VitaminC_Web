'use client'

import { useEffect, useState, type ImgHTMLAttributes } from 'react'
import { api } from '@/utils/api'

interface ProxyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
}

const ProxyImage = ({ src, ...props }: ProxyImageProps) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const convertImage = async () => {
      try {
        const response = await api.proxy.get(src)
        const blob = await response.blob()
        const objectURL = URL.createObjectURL(blob)
        setUrl(objectURL)
      } catch {}
    }

    if (!url && src.startsWith('http')) {
      convertImage()
    }

    if (url) {
      return () => {
        URL.revokeObjectURL(url)
      }
    }
  }, [src, url])

  return <img {...props} src={url || src} />
}

export default ProxyImage
