'use client'

import { type ReactNode, useCallback, useEffect, useRef } from 'react'

import { type PanInfo, animate, motion, useMotionValue } from 'framer-motion'

import useEventListener from '@/hooks/use-event-listener'

interface SlideProps {
  items: ReactNode[]
  activeIndex: number
  handleChangeActiveIndex: (index: number) => void
}

const transition = { duration: 0.5 }

const Slide = ({ items, activeIndex, handleChangeActiveIndex }: SlideProps) => {
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
      className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto"
    >
      {items.map((item, index) => (
        <motion.div
          style={{
            x,
            left: `${activeIndex * 100}%`,
            right: `${activeIndex * 100}%`,
          }}
          key={`slide-${index}`}
          className="flex h-full w-full shrink-0 snap-center snap-always flex-col items-center justify-center"
          draggable="false"
          drag="x"
          dragElastic={1}
          onDragEnd={handleDragEnd}
          aria-hidden={activeIndex !== index}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Slide
