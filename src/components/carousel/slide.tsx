'use client'

import { type CSSProperties, useCallback, useEffect, useRef } from 'react'
import { type PanInfo, animate, motion, useMotionValue } from 'framer-motion'

import cn from '@/utils/cn'
import type { Item } from './types'
import { Typography } from '@/components/common'
import { Lottie } from '@/components/common/lottie'
import useEventListener from '@/hooks/use-event-listener'
import { ProxyImage } from '@/components'

interface SlideProps {
  items: Item[]
  activeIndex: number
  objectFit: CSSProperties['objectFit']
  handleChangeActiveIndex: (index: number) => void
}

const transition = { duration: 0.5 }

const getObjectFitClass = (objectFit: CSSProperties['objectFit']): string => {
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

const Slide = ({
  items,
  activeIndex,
  objectFit = 'cover',
  handleChangeActiveIndex,
}: SlideProps) => {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateNewX = useCallback(
    () => -activeIndex * (containerRef.current?.clientWidth || 0),
    [activeIndex],
  )

  const handleDragEnd = (e: Event, info: PanInfo) => {
    const THRESHOLD = 5

    const { offset, velocity } = info

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition)
      return
    }

    const isFirst = activeIndex === 0
    const isLast = activeIndex === items.length - 1

    if (offset.x > THRESHOLD && !isFirst) {
      handleChangeActiveIndex(activeIndex - 1)
    } else if (offset.x < -THRESHOLD && !isLast) {
      handleChangeActiveIndex(activeIndex + 1)
    } else {
      animate(x, calculateNewX(), transition)
    }
  }

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition)
    return controls.stop
  }, [activeIndex, calculateNewX, x])

  // 마우스휠(트랙패드 제스처 포함)로 수평 스크롤하지 못하도록 방지
  // ∵ framer motion에서 해당 이벤트를 감지하는 제스처가 없어서, activeIndex 업데이트를 하지 못합니다.
  useEventListener({
    type: 'wheel',
    listener: (event) => {
      if (event.deltaX) {
        event.preventDefault()
      }
    },
    options: { passive: false },
  })

  return (
    <motion.div
      ref={containerRef}
      className="flex h-full overflow-x-auto no-scrollbar snap-mandatory snap-x"
    >
      {items.map((item, index) => (
        <motion.div
          style={{
            x,
            left: `${activeIndex * 100}%`,
            right: `${activeIndex * 100}%`,
          }}
          key={`${index}${item.src}`}
          className="shrink-0 w-full h-full flex flex-col justify-center items-center snap-always snap-center"
          draggable
          drag="x"
          dragElastic={1}
          onDragEnd={handleDragEnd}
          aria-hidden={activeIndex !== index}
        >
          {typeof item.title === 'string' ? (
            <Typography
              size="h1"
              color="neutral-200"
              className="mb-2 whitespace-pre-line"
            >
              {item.title}
            </Typography>
          ) : (
            item.title
          )}

          {typeof item.src === 'string' ? (
            <ProxyImage
              draggable={false}
              alt={
                item.title && typeof item.title === 'string'
                  ? item.title
                  : `슬라이드 ${index + 1}`
              }
              className={cn(
                'w-full h-full snap-always',
                getObjectFitClass(objectFit),
              )}
              src={item.src}
            />
          ) : (
            <Lottie
              animationData={item.src}
              className={cn(
                'w-full h-full snap-always',
                getObjectFitClass(objectFit),
              )}
            />
          )}

          {typeof item.caption === 'string' ? (
            <Typography
              size="body2"
              color="neutral-200"
              className="my-1 whitespace-pre-line"
            >
              {item.caption}
            </Typography>
          ) : (
            item.caption
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Slide
