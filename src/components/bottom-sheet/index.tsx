import React, { ReactNode, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'

import useMeasure from '@/hooks/use-measure'
import useWindowSize from '@/hooks/use-window-size'

interface BottomSheetProps {
  header?: ReactNode
  body: ReactNode
  expanded?: boolean
}

const BottomSheet = ({ header, body, expanded = false }: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(expanded)
  const [contentRef, contentBounds] = useMeasure()
  const dragControls = useDragControls()
  const size = useWindowSize()

  const animateState = isOpen ? 'opened' : 'closed'
  const expandedHeight = Math.min(contentBounds.height + 50, size.height)

  return (
    <>
      {/* background overlay */}
      <motion.div
        className="absolute top-0 left-0 w-screen h-[100vh]"
        initial={false}
        animate={animateState}
        variants={{
          opened: {
            pointerEvents: 'all',
          },
          closed: {
            pointerEvents: 'none',
          },
        }}
        onTap={() => setIsOpen(false)}
      />
      {/* container */}
      <motion.div
        className="fixed top-0 left-0 w-screen bg-[#212124] rounded-t-[14px] pb-[24px] will-change-transform text-white"
        initial="closed"
        animate={animateState}
        variants={{
          opened: { top: `calc(100vh - ${expandedHeight}px)` },
          closed: { top: `calc(100vh - 80px)` },
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        onDragEnd={(event, info) => {
          const offsetThreshold = 150
          const deltaThreshold = 5

          const isOverOffsetThreshold =
            Math.abs(info.offset.y) > offsetThreshold
          const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold

          const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold

          if (!isOverThreshold) return

          setIsOpen(info.offset.y < 0)
        }}
      >
        {/* header */}
        <div
          className="h-[80px] pt-[12px] cursor-grab select-none"
          onPointerDown={(e) => dragControls.start(e)}
        >
          {/* bar */}
          <div className="w-[53px] h-[6px] bg-[#6D717A] my-0 mx-auto rounded-[999px]" />
          {/* content */}
          <div className="m-[20px] text-[14px]">{header}</div>
        </div>
        {/* body */}
        <div
          className="p-[20px] transition-all"
          style={{ height: size.height / 2 }}
          ref={contentRef}
        >
          {/* content */}
          <div>{body}</div>
        </div>
      </motion.div>
    </>
  )
}

export default BottomSheet
