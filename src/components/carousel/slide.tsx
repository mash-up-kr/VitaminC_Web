'use client'

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { PanInfo, animate, motion, useMotionValue } from 'framer-motion'
import cn from '@/utils/cn'

interface SlideProps {
  activeIndex: number
  srcList: string[]
  objectFit: CSSProperties['objectFit']
  title?: ReactNode[]
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
  activeIndex,
  srcList,
  objectFit = 'contain',
  title,
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
    const isLast = activeIndex === srcList.length - 1

    if (offset.x > clientWidth / 4) {
      handleChangeActiveIndex(isFirst ? srcList.length - 1 : activeIndex - 1)
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
      {srcList.map((src, index) => (
        <motion.div
          style={{
            x,
            left: `${activeIndex * 100}%`,
            right: `${activeIndex * 100}%`,
          }}
          key={src}
          className="shrink-0 w-full h-full flex flex-col justify-center items-center snap-always snap-center"
          draggable
          drag="x"
          dragElastic={1}
          onDragEnd={handleDragEnd}
          aria-hidden={activeIndex !== index}
        >
          {title?.[index]}
          <img
            draggable={false}
            alt={`슬라이드 ${index + 1}`}
            className={cn(
              'w-full h-full snap-always',
              getObjectFitClass(objectFit),
            )}
            src={src}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Slide
