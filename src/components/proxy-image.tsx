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

    convertImage()

    return () => {
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  return <img {...props} src={url ?? src} />
}

export default ProxyImage
