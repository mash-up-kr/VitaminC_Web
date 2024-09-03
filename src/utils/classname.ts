import type { CSSProperties } from 'react'

export const getObjectFitClass = (
  objectFit: CSSProperties['objectFit'],
): string => {
  switch (objectFit) {
    case 'fill':
      return 'object-fill'
    case 'contain':
      return 'object-contain'
    case 'cover':
      return 'object-cover'
    case 'none':
      return 'object-none'
    case 'scale-down':
      return 'object-scale-down'
    default:
      return ''
  }
}
