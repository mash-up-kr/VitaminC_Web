import React, { forwardRef, ReactNode, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

import useMeasure from '@/hooks/use-measure'
import useWindowSize from '@/hooks/use-window-size'
import { type BottomSheetState, type BottomSheetStateNum } from './types'
import { BOTTOM_SHEET_STATE, BOTTOM_SHEET_STATE_MAP } from './constants'
import { clamp } from '@/utils/number'

interface BottomSheetProps {
  body: ReactNode
  state?: BottomSheetState
}

const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ body, state = BOTTOM_SHEET_STATE.Collapsed }, ref) => {
    const [prevState, setPrevState] = useState(state)
    const [bottomSheetState, setBottomSheetState] =
      useState<BottomSheetState>(state)

    if (prevState !== state) {
      setPrevState(bottomSheetState)
      setBottomSheetState(state)
    }

    const [contentRef, contentBounds] = useMeasure()
    const dragControls = useDragControls()
    const { height: windowHeight } = useWindowSize()

    const headerHeight = 36
    const defaultHeight = Math.min(
      contentBounds.height + headerHeight,
      windowHeight / 2,
    )
    const expandedHeight = Math.min(
      contentBounds.height + headerHeight,
      (windowHeight * 3) / 4,
    )

    const bodyHeight = () => {
      switch (bottomSheetState) {
        case BOTTOM_SHEET_STATE.Expanded:
          return expandedHeight - headerHeight
        case BOTTOM_SHEET_STATE.Collapsed:
          return 0
        default:
          return defaultHeight - headerHeight
      }
    }

    const isOverThreshold = (info: PanInfo) => {
      const offsetThreshold = 50
      const deltaThreshold = 5

      const isOverOffsetThreshold = Math.abs(info.offset.y) > offsetThreshold
      const isOverDeltaThreshold = Math.abs(info.delta.y) > deltaThreshold

      return isOverOffsetThreshold || isOverDeltaThreshold
    }

    const handleDragEnd = (info: PanInfo) => {
      if (!isOverThreshold(info)) return

      let bottomSheetStateNum = BOTTOM_SHEET_STATE_MAP[bottomSheetState]

      const offsetY = info.offset.y

      const largeEnoughValue = 200
      const skipOneStep = Math.abs(offsetY) > largeEnoughValue

      const sign = offsetY < 0 ? -1 : 1

      if (skipOneStep) {
        bottomSheetStateNum += 2 * sign
      } else {
        bottomSheetStateNum += 1 * sign
      }

      const newState = clamp(
        bottomSheetStateNum,
        BOTTOM_SHEET_STATE_MAP[BOTTOM_SHEET_STATE.Expanded],
        BOTTOM_SHEET_STATE_MAP[BOTTOM_SHEET_STATE.Collapsed],
      ) as BottomSheetStateNum

      setBottomSheetState(BOTTOM_SHEET_STATE_MAP[newState])
    }

    return (
      <>
        {/* container */}
        <motion.div
          ref={ref}
          className="fixed max-w-[420px] w-full z-10 bg-[#212124] rounded-t-[14px] pb-[24px] will-change-transform text-white"
          onPointerDown={(e) => dragControls.start(e)}
          initial="default"
          animate={bottomSheetState}
          variants={{
            expanded: { top: `calc(100vh - ${expandedHeight}px)` },
            default: { top: `calc(100vh - ${defaultHeight}px)` },
            collapsed: { top: `calc(100vh - ${headerHeight}px)` },
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          drag="y"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0}
          onDragEnd={(_, info) => handleDragEnd(info)}
          aria-expanded={bottomSheetState !== BOTTOM_SHEET_STATE.Collapsed}
        >
          {/* header */}
          <div className="pt-[16px] pb-[14px] cursor-grab">
            {/* bar */}
            <div className="w-[53px] h-[6px] bg-[#6D717A] my-0 mx-auto rounded-full" />
          </div>
          {/* body */}
          <div
            className="transition-all duration-300 select-none overflow-y-scroll overscroll-contain no-scrollbar"
            style={{ height: bodyHeight() }}
            aria-hidden={bottomSheetState === BOTTOM_SHEET_STATE.Collapsed}
          >
            {/* content */}
            <div ref={contentRef}>{body}</div>
          </div>
        </motion.div>
      </>
    )
  },
)

BottomSheet.displayName = 'BottomSheet'

export default BottomSheet
