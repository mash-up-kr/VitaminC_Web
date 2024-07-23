'use client'

import { type CSSProperties, useEffect, useState } from 'react'

import Indicator from './indicator'
import Slide from './slide'
import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'

interface CarouselProps extends ClassName {
  srcList: string[]
  delay?: number
  autoPlay?: boolean
  objectFit?: CSSProperties['objectFit']
  indicatorPosition?: 'bottom' | 'inside'
}

const AUTO_PLAY_SPEED = 5000

const Carousel = ({
  srcList,
  className,
  delay,
  autoPlay = false,
  objectFit = 'contain',
  indicatorPosition = 'bottom',
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChangeActiveIndex = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        setActiveIndex((index) => (index + 1) % srcList.length)
      }, delay ?? AUTO_PLAY_SPEED)
      return () => clearInterval(intervalId)
    }
  })

  return (
    <div className={cn('relative mt-6', className)}>
      <Slide
        activeIndex={activeIndex}
        srcList={srcList}
        objectFit={objectFit}
        handleChangeActiveIndex={handleChangeActiveIndex}
      />
      <Indicator
        activeIndex={activeIndex}
        numOfSlides={srcList.length}
        position={indicatorPosition}
        onClick={handleChangeActiveIndex}
      />
    </div>
  )
}

export default Carousel
