'use client'

import { useCallback, useEffect, useRef } from 'react'
import { PanInfo, animate, motion, useMotionValue } from 'framer-motion'

interface SlideProps {
  activeIndex: number
  srcList: string[]
  handleChangeActiveIndex: (index: number) => void
}

const transition = { duration: 0.5 }

const Slide = ({
  activeIndex,
  srcList,
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
      className="relative w-full flex overflow-x-auto no-scrollbar"
    >
      {srcList.map((src, i) => (
        <motion.div
          style={{
            x,
            left: `${activeIndex * 100}%`,
            right: `${activeIndex * 100}%`,
          }}
          key={src}
          className="shrink-0 w-full flex justify-center items-center"
          draggable
          drag="x"
          dragElastic={1}
          onDragEnd={handleDragEnd}
        >
          <img
            draggable={false}
            alt={`슬라이드 ${i + 1}`}
            className="h-[220px] object-contain"
            src={src}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Slide
