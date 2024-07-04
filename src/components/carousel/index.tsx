'use client'

import { useEffect, useState } from 'react'

import Indicator from './indicator'
import Slide from './slide'

interface CarouselProps {
  srcList: string[]
}

const Carousel = ({ srcList }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleChangeActiveIndex = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((index) => (index + 1) % srcList.length)
    }, 5000)
    return () => clearInterval(intervalId)
  })

  return (
    <div className="relative mt-6">
      <Slide
        activeIndex={activeIndex}
        srcList={srcList}
        handleChangeActiveIndex={handleChangeActiveIndex}
      />
      <Indicator
        activeIndex={activeIndex}
        numOfSlides={srcList.length}
        onClick={handleChangeActiveIndex}
      />
    </div>
  )
}

export default Carousel
