'use client'

import { type ReactNode, useEffect, useState } from 'react'

import Indicator from './indicator'
import Slide from './slide'

import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

interface CarouselProps extends ClassName {
  items: ReactNode[]
  delay?: number
  autoPlay?: boolean
  indicatorPosition?: 'bottom' | 'inside'
}

const AUTO_PLAY_SPEED = 5000

const Carousel = ({
  className,
  delay,
  autoPlay = false,
  items,
  indicatorPosition = 'bottom',
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChangeActiveIndex = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        setActiveIndex((index) => (index + 1) % items.length)
      }, delay ?? AUTO_PLAY_SPEED)
      return () => clearInterval(intervalId)
    }
  })

  return (
    <div className={cn('relative', className)}>
      <Slide
        items={items}
        activeIndex={activeIndex}
        handleChangeActiveIndex={handleChangeActiveIndex}
      />
      <Indicator
        activeIndex={activeIndex}
        numOfSlides={items.length}
        position={indicatorPosition}
        onClick={handleChangeActiveIndex}
      />
    </div>
  )
}

export default Carousel
