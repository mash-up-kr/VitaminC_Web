import { type FC, useEffect, useRef } from 'react'
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

const BaseIcon = ({
  IconComponent,
  size,
}: {
  IconComponent: FC<any>
  size: { width: number; height: number }
}) => {
  return <IconComponent width={size.width} height={size.height} />
}

const SavedFlagIcon = ({
  size,
}: {
  size: { width: number; height: number }
}) => {
  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        position: 'absolute',
        top: '-8px',
        right: '-5px',
      }}
    >
      <Icon type="pickFlag" className="h-full w-full" />
    </div>
  )
}

const MarkerContent = ({
  type,
  size,
  isSaved,
  className,
  onClick,
}: {
  type: IconKey
  size: { width: number; height: number }
  isSaved: boolean
  className?: string
  onClick?: VoidFunction
}) => {
  const svgContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (svgContainerRef.current) {
      const root = createRoot(svgContainerRef.current)
      const IconComponent = icons[type]
      if (IconComponent) {
        root.render(
          <button
            type="button"
            className={className ?? ''}
            style={{
              position: 'relative',
              width: `${size.width}px`,
              height: `${size.height}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={onClick}
          >
            <BaseIcon IconComponent={IconComponent} size={size} />
            {isSaved && <SavedFlagIcon size={{ width: 31, height: 21 }} />}
          </button>,
        )
      }
      return () => {
        root.unmount()
      }
    }
  }, [type, size, isSaved, className, onClick])

  return <div ref={svgContainerRef}></div>
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
    const overlay = (() => {
      const position = new kakao.maps.LatLng(latitude, longitude)
      const content = document.createElement('div')
      const root = createRoot(content)
      root.render(
        <MarkerContent
          type={type}
          isSaved={isSaved}
          className={className}
          size={iconSize}
          onClick={onClick}
        />,
      )

      const KakaoCustomOverlay = new kakao.maps.CustomOverlay({
        position,
        content,
        clickable: true,
        xAnchor: 0.5,
        yAnchor: 1.2,
      })
      return KakaoCustomOverlay
    })()

    overlay.setMap(map)

    return () => {
      overlay.setMap(null)
    }
  }, [className, isSaved, latitude, longitude, map, onClick, type])

  return null
}

export default Marker
