import React, { ReactNode, useMemo, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

import useMeasure from '@/hooks/use-measure'
import useWindowSize from '@/hooks/use-window-size'
import { BOTTOM_SHEET_STATE, BottomSheetState } from '@/models/interface'

interface BottomSheetProps {
  body: ReactNode
  initialState?: BottomSheetState
}

const BottomSheet = ({
  body,
  initialState = BOTTOM_SHEET_STATE.Default,
}: BottomSheetProps) => {
  const [state, setState] = useState<BottomSheetState>(initialState)
  const [contentRef, contentBounds] = useMeasure()
  const dragControls = useDragControls()
  const size = useWindowSize()

  const headerHeight = 38
  const defaultHeight = Math.min(
    contentBounds.height + headerHeight,
    size.height / 2,
  )
  const expandedHeight = Math.min(
    contentBounds.height + headerHeight,
    size.height - headerHeight,
  )

  const bodyHeight = useMemo(() => {
    switch (state) {
      case BOTTOM_SHEET_STATE.Collapsed:
        return 0
      case BOTTOM_SHEET_STATE.Expanded:
        return expandedHeight - headerHeight
      default:
        return defaultHeight - headerHeight
    }
  }, [defaultHeight, expandedHeight, state])

  const handleDragEnd = (info: PanInfo) => {
    const offsetThreshold = 50
    const deltaThreshold = 5

    const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold
    const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold

    const isOverThreshold = isOverOffsetThreshold || isOverDeltaThreshold

    if (!isOverThreshold) return

    const offsetY = info.offset.y
    const largeEnoughValue = 200
    const skipOneStep = Math.abs(offsetY) - largeEnoughValue > 0
    switch (state) {
      case BOTTOM_SHEET_STATE.Default:
        if (offsetY < 0) {
          setState(BOTTOM_SHEET_STATE.Expanded)
        } else {
          setState(BOTTOM_SHEET_STATE.Collapsed)
        }
        break
      case BOTTOM_SHEET_STATE.Expanded:
        if (offsetY <= 0) break
        if (skipOneStep) {
          setState(BOTTOM_SHEET_STATE.Collapsed)
        } else {
          setState(BOTTOM_SHEET_STATE.Default)
        }
        break
      case BOTTOM_SHEET_STATE.Collapsed:
        if (offsetY >= 0) break
        if (skipOneStep) {
          setState(BOTTOM_SHEET_STATE.Expanded)
        } else {
          setState(BOTTOM_SHEET_STATE.Default)
        }
        break
    }
  }

  return (
    <>
      {/* background overlay */}
      <motion.div
        className="absolute top-0 left-0 w-screen h-[100vh]"
        initial={false}
        animate={state}
        variants={{
          opened: {
            pointerEvents: 'all',
          },
          closed: {
            pointerEvents: 'none',
          },
        }}
        onTap={() => setState(BOTTOM_SHEET_STATE.Collapsed)}
      />
      {/* container */}
      <motion.div
        className="fixed top-0 left-0 z-10 w-screen bg-[#212124] rounded-t-[14px] pb-[24px] will-change-transform text-white"
        onPointerDown={(e) => dragControls.start(e)}
        initial="default"
        animate={state}
        variants={{
          default: { top: `calc(100vh - ${defaultHeight}px)` },
          expanded: { top: `calc(100vh - ${expandedHeight}px)` },
          collapsed: { top: `calc(100vh - ${headerHeight}px)` },
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0}
        onDragEnd={(event, info) => handleDragEnd(info)}
        aria-expanded={state !== BOTTOM_SHEET_STATE.Collapsed}
      >
        {/* header */}
        <div className="pt-[16px] px-[20px] cursor-grab">
          {/* bar */}
          <div className="w-[53px] h-[6px] bg-[#6D717A] my-0 mx-auto rounded-full" />
        </div>
        {/* body */}
        <div
          className="transition-all select-none overflow-y-scroll overscroll-contain no-scrollbar"
          style={{ height: bodyHeight }}
          aria-hidden={state === BOTTOM_SHEET_STATE.Collapsed}
        >
          {/* content */}
          <div className="px-[20px] pt-[24px]" ref={contentRef}>
            {body}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default BottomSheet
