import type { ImgHTMLAttributes } from 'react'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
}

const Image = ({ src, ...props }: ImageProps) => {
  const isWebp = src.endsWith('.webp')

  if (isWebp) {
    return (
      <picture>
        <source type="image/webp" srcSet={src} />
        <img {...props} src={src.replace('.webp', '.png')} />
      </picture>
    )
  }

  return <img {...props} src={src} />
}

export default Image
