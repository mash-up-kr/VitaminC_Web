import { forwardRef, ReactNode, useId, useRef, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

import useMeasure from '@/hooks/use-measure'
import useWindowSize from '@/hooks/use-window-size'
import type { BottomSheetState, BottomSheetStateNum } from './types'
import { BOTTOM_SHEET_STATE, BOTTOM_SHEET_STATE_MAP } from './constants'
import { clamp } from '@/utils/number'
import { toBottomSheetState } from '@/utils/bottom-sheet'
import { useClickOutside } from '@/hooks/use-click-outside'
import { mergeRefs } from '@/utils/merge-refs'

interface BottomSheetProps {
  body: ReactNode
  state?: BottomSheetState
}

const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ body, state = BOTTOM_SHEET_STATE.Collapsed }, ref) => {
    const bottomSheetId = useId()
    const bottomSheetRef = useRef<HTMLDivElement>(null)

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

    useClickOutside(bottomSheetRef, (event) => {
      if (event.target instanceof HTMLElement) {
        if (event.target.id !== bottomSheetId) {
          return
        }
      }
      setBottomSheetState(BOTTOM_SHEET_STATE.Collapsed)
    })

    const isOverThreshold = (info: PanInfo) => {
      const OFFSET_THRESHOLD = 50
      const DELTA_THRESHOLD = 5

      const isOverOffsetThreshold = Math.abs(info.offset.y) > OFFSET_THRESHOLD
      const isOverDeltaThreshold = Math.abs(info.delta.y) > DELTA_THRESHOLD

      return isOverOffsetThreshold || isOverDeltaThreshold
    }

    const getNextBottomSheetState = (info: PanInfo) => {
      let bottomSheetStateNum = BOTTOM_SHEET_STATE_MAP[bottomSheetState]

      const offsetY = info.offset.y

      const LARGE_ENOUGH_VALUE = 200
      const step = Math.abs(offsetY) > LARGE_ENOUGH_VALUE ? 2 : 1
      const sign = offsetY < 0 ? -1 : 1

      bottomSheetStateNum += step * sign

      const result = clamp<BottomSheetStateNum>(
        bottomSheetStateNum,
        BOTTOM_SHEET_STATE_MAP[BOTTOM_SHEET_STATE.Expanded],
        BOTTOM_SHEET_STATE_MAP[BOTTOM_SHEET_STATE.Collapsed],
      )
      return result
    }

    const handleDragEnd = (info: PanInfo) => {
      if (!isOverThreshold(info)) return

      const nextBottomSheetState = getNextBottomSheetState(info)
      setBottomSheetState(toBottomSheetState(nextBottomSheetState))
    }

    return (
      <>
        {/* container */}
        <motion.div
          id={bottomSheetId}
          ref={mergeRefs([bottomSheetRef, ref])}
          className="fixed bottom-0 max-w-[420px] w-full z-10 bg-[#212124] rounded-t-[14px] will-change-transform text-white"
          onPointerDown={(e) => dragControls.start(e)}
          initial="default"
          animate={bottomSheetState}
          variants={{
            expanded: {
              top: `calc(100vh - ${Math.min(expandedHeight, windowHeight * 0.7)}px)`,
            },
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
            style={{
              height: bodyHeight(),
            }}
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
