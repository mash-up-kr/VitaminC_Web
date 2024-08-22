'use client'

import { type ImgHTMLAttributes, useEffect, useState } from 'react'

import { useLazyImage } from '@/hooks/use-lazy-image'
import { api } from '@/utils/api'
import cn from '@/utils/cn'

interface ProxyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
}

const ProxyImage = ({ src, ...props }: ProxyImageProps) => {
  const [url, setUrl] = useState('')
  const { ref, inView, isLoading } = useLazyImage({ src: url, options: {} })

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

  if (isLoading) {
    return (
      <div className={cn('animate-pulse', props.className)}>
        <div
          className={cn(
            'h-full w-full bg-[#353538] dark:bg-neutral-800',
            props.className,
          )}
        />
      </div>
    )
  }

  return <img {...props} ref={ref} src={url || src} />
}

export default ProxyImage
