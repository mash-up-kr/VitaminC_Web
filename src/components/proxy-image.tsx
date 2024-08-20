'use client'

import { useEffect, useState, type ImgHTMLAttributes } from 'react'
import { api } from '@/utils/api'
import { useLazyImage } from '@/hooks/use-lazy-image'

interface ProxyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
}

const ProxyImage = ({ src, ...props }: ProxyImageProps) => {
  const [url, setUrl] = useState('')
  const { ref, inView } = useLazyImage({ src: url, options: {} })

  useEffect(() => {
    const convertImage = async () => {
      try {
        const response = await api.proxy.get(src)
        const blob = await response.blob()
        const objectURL = URL.createObjectURL(blob)
        setUrl(objectURL)
      } catch {}
    }

    if (!url && inView && src.startsWith('http')) {
      convertImage()
    }

    if (url) {
      return () => {
        setUrl('')
        URL.revokeObjectURL(url)
      }
    }
  }, [inView, src, url])

  return <img {...props} ref={ref} src={url || src} />
}

export default ProxyImage
