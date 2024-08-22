'use client'

import { type CSSProperties, useEffect, useState } from 'react'

import Indicator from './indicator'
import Slide from './slide'
import type { Item } from './types'

import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'

interface CarouselProps extends ClassName {
  items: Item[]
  delay?: number
  autoPlay?: boolean
  objectFit?: CSSProperties['objectFit']
  indicatorPosition?: 'bottom' | 'inside'
}

const AUTO_PLAY_SPEED = 5000

const Carousel = ({
  items,
  className,
  delay,
  autoPlay = false,
  objectFit = 'cover',
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
    <div className={cn('relative mt-6', className)}>
      <Slide
        items={items}
        activeIndex={activeIndex}
        objectFit={objectFit}
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
