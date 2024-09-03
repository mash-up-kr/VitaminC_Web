import type { ReactNode } from 'react'
import { forwardRef, useId, useRef, useState } from 'react'

import { BOTTOM_SHEET_STATE, BOTTOM_SHEET_STATE_MAP } from './constants'
import type { BottomSheetState, BottomSheetStateNum } from './types'
import { motion, useDragControls } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

import { useClickOutside } from '@/hooks/use-click-outside'
import useMeasure from '@/hooks/use-measure'
import useWindowSize from '@/hooks/use-window-size'
import { toBottomSheetState } from '@/utils/bottom-sheet'
import { mergeRefs } from '@/utils/merge-refs'
import { clamp } from '@/utils/number'

interface BottomSheetProps {
  body: ReactNode
  state?: BottomSheetState
}

const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ body, state = BOTTOM_SHEET_STATE.Default }, ref) => {
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

    const handleTap = () => {
      if (bottomSheetState === BOTTOM_SHEET_STATE.Collapsed) {
        setBottomSheetState(BOTTOM_SHEET_STATE.Default)
      }
    }

    return (
      <>
        {/* container */}
        <motion.div
          id={bottomSheetId}
          ref={mergeRefs([bottomSheetRef, ref])}
          className="fixed z-10 w-full max-w-[420px] rounded-t-[14px] bg-[#212124] pb-[24px] text-white will-change-transform"
          onPointerDown={(e) => dragControls.start(e)}
          initial="default"
          animate={bottomSheetState}
          variants={{
            expanded: { top: `calc(100dvh - ${expandedHeight}px)` },
            default: { top: `calc(100dvh - ${defaultHeight}px)` },
            collapsed: { top: `calc(100dvh - ${headerHeight}px)` },
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          drag="y"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0}
          onDragEnd={(_, info) => handleDragEnd(info)}
          onTap={handleTap}
          aria-expanded={bottomSheetState !== BOTTOM_SHEET_STATE.Collapsed}
        >
          {/* header */}
          <div className="cursor-grab pb-[14px] pt-[16px]">
            {/* bar */}
            <div className="mx-auto my-0 h-[6px] w-[53px] rounded-full bg-[#6D717A]" />
          </div>
          {/* body */}
          <div
            className="select-none transition-all duration-300"
            style={{
              height: bodyHeight(),
            }}
            aria-hidden={bottomSheetState === BOTTOM_SHEET_STATE.Collapsed}
          >
            {/* content */}
            <div ref={contentRef} draggable="false">
              {body}
            </div>
          </div>
        </motion.div>
      </>
    )
  },
)

BottomSheet.displayName = 'BottomSheet'

export default BottomSheet
