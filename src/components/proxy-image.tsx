'use client'

import { useEffect, useState, type ImgHTMLAttributes } from 'react'
import { api } from '@/utils/api'
import { useLazyImage } from '@/hooks/use-lazy-image'
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
            'bg-[#353538] w-full h-full dark:bg-neutral-800',
            props.className,
          )}
        />
      </div>
    )
  }

  return <img {...props} ref={ref} src={url || src} />
}

export default ProxyImage
