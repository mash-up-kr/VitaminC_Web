import { type FC, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import Icon from '../common/icon'
import { icons } from '../common/icons'
import { useKakaoMap } from './context'
import type { IconKey } from '../common/icon'
import type { ClassName } from '@/models/interface'

interface MarkerProps extends ClassName {
  latitude: number
  longitude: number
  type: Extract<
    IconKey,
    | 'cafe'
    | 'restaurant'
    | 'bar'
    | 'selectedCafe'
    | 'selectedRestaurant'
    | 'selectedBar'
  >
  isSaved: boolean
  onClick?: VoidFunction
}

const iconSize = {
  width: 44,
  height: 54,
} as const

const createBaseIcon = (
  IconComponent: FC<any>,
  size: { width: number; height: number },
): HTMLElement => {
  const svgContainer = document.createElement('div')
  svgContainer.style.width = '100%'
  svgContainer.style.height = '100%'
  const root = createRoot(svgContainer)
  root.render(<IconComponent width={size.width} height={size.height} />)
  return svgContainer
}

const createSavedFlagIcon = () => {
  const svgContainer = document.createElement('div')
  svgContainer.style.width = '31px'
  svgContainer.style.height = '21px'
  svgContainer.style.position = 'absolute'
  svgContainer.style.top = '-8px'
  svgContainer.style.right = '-5px'
  const root = createRoot(svgContainer)
  root.render(<Icon type="pickFlag" className="w-full h-full" />)
  return svgContainer
}

const createMarkerContent = (
  type: MarkerProps['type'],
  size: { width: number; height: number },
  isSaved: boolean,
  className?: string,
): HTMLElement => {
  const IconComponent = icons[type]

  const container = document.createElement('button')
  container.className = className ?? ''
  container.style.position = 'relative'
  container.style.width = `${size.width}px`
  container.style.height = `${size.height}px`
  container.style.display = 'flex'
  container.style.alignItems = 'center'
  container.style.justifyContent = 'center'

  if (IconComponent) {
    const baseIcon = createBaseIcon(IconComponent, size)
    container.appendChild(baseIcon)
  }

  if (isSaved) {
    const savedIcon = createSavedFlagIcon()
    container.appendChild(savedIcon)
  }

  return container
}

const Marker = ({
  latitude,
  longitude,
  type,
  isSaved,
  className,
  onClick,
}: MarkerProps) => {
  const { map } = useKakaoMap()

  useEffect(() => {
    if (!map) return

    const position = new kakao.maps.LatLng(latitude, longitude)
    const content = createMarkerContent(type, iconSize, isSaved, className)

    const customOverlay = new kakao.maps.CustomOverlay({
      position,
      content,
      clickable: true,
      xAnchor: 0.5,
      yAnchor: 1.2,
    })

    if (onClick) content.onclick = onClick

    customOverlay.setMap(map)

    return () => {
      customOverlay.setMap(null)
    }
  }, [map, latitude, longitude, type, isSaved, onClick, className])

  return null
}

export default Marker
