'use client'

import { type CSSProperties, useCallback, useEffect, useRef } from 'react'
import { type PanInfo, animate, motion, useMotionValue } from 'framer-motion'
import cn from '@/utils/cn'
import type { Item } from './types'
import { Typography } from '../common'

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
  objectFit = 'contain',
  handleChangeActiveIndex,
}: SlideProps) => {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const calculateNewX = useCallback(
    () => -activeIndex * (containerRef.current?.clientWidth || 0),
    [activeIndex],
  )

  const handleDragEnd = (e: Event, info: PanInfo) => {
    const clientWidth = containerRef.current?.clientWidth || 0

    const { offset, velocity } = info

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition)
      return
    }

    const isFirst = activeIndex === 0
    const isLast = activeIndex === items.length - 1

    if (offset.x > clientWidth / 4) {
      handleChangeActiveIndex(isFirst ? items.length - 1 : activeIndex - 1)
    } else if (offset.x < -clientWidth / 4) {
      handleChangeActiveIndex(isLast ? 0 : activeIndex + 1)
    } else {
      animate(x, calculateNewX(), transition)
    }
  }

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition)
    return controls.stop
  }, [activeIndex, calculateNewX, x])

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

          <img
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
