'use client'

import { type ImgHTMLAttributes, useEffect, useState } from 'react'

import { useLazyImage } from '@/hooks/use-lazy-image'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import Skeleton from '@/components/common/skeleton'

interface ProxyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
}

const ProxyImage = ({ src, ...props }: ProxyImageProps) => {
  const [url, setUrl] = useState('')
  const [isFetch, setIsFetch] = useState(false)
  const { ref, inView, isLoading } = useLazyImage({ src: url, options: {} })

  useEffect(() => {
    const convertImage = async () => {
      try {
        setIsFetch(true)
        const response = await api.proxy.get(src)
        const blob = await response.blob()
        const objectURL = URL.createObjectURL(blob)
        setUrl(objectURL)
      } finally {
        setIsFetch(false)
      }
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

  if (isLoading || isFetch) {
    return <Skeleton className={cn('h-full w-full', props.className)} />
  }

  return <img {...props} ref={ref} src={url || src} />
}

export default ProxyImage
