import type { MutableRefObject, ReactNode } from 'react'
import { forwardRef, useId, useRef, useState } from 'react'

import { BOTTOM_SHEET_STATE, BOTTOM_SHEET_STATE_MAP } from './constants'
import type { BottomSheetState, BottomSheetStateNum } from './types'
import { motion, useDragControls } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

import { useClickOutside } from '@/hooks/use-click-outside'
import useWindowSize from '@/hooks/use-window-size'
import { toBottomSheetState } from '@/utils/bottom-sheet'
import { mergeRefs } from '@/utils/merge-refs'
import { clamp } from '@/utils/number'

interface BottomSheetProps {
  body: (ref: MutableRefObject<HTMLElement[]>) => ReactNode
  state?: BottomSheetState
}
const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  ({ body, state = BOTTOM_SHEET_STATE.Default }, ref) => {
    const bottomSheetId = useId()
    const bottomSheetRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLElement[]>([])

    const [prevState, setPrevState] = useState(state)
    const [bottomSheetState, setBottomSheetState] =
      useState<BottomSheetState>(state)

    if (prevState !== state) {
      setPrevState(bottomSheetState)
      setBottomSheetState(state)
    }

    const dragControls = useDragControls()

    const { height: windowHeight } = useWindowSize()

    const HEADER_HEIGHT = 46
    const DEFAULT_HEIGHT = windowHeight / 2
    const EXPANDED_HEIGHT = (windowHeight * 3) / 4

    const contentHeight =
      contentRef?.current.reduce((acc, cur) => acc + cur?.scrollHeight, 0) ||
      windowHeight

    const defaultHeight = Math.min(
      contentHeight + HEADER_HEIGHT,
      DEFAULT_HEIGHT,
    )

    const expandedHeight = Math.min(
      contentHeight + HEADER_HEIGHT,
      EXPANDED_HEIGHT,
    )

    const bodyHeight = () => {
      switch (bottomSheetState) {
        case BOTTOM_SHEET_STATE.Expanded:
          return expandedHeight - HEADER_HEIGHT
        case BOTTOM_SHEET_STATE.Collapsed:
          return 0
        default:
          return defaultHeight - HEADER_HEIGHT
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
      const offsetY = info.offset.y < 0 ? -1 : 1
      const nextBottomSheetState =
        offsetY + BOTTOM_SHEET_STATE_MAP[bottomSheetState]

      const isExpandable = contentHeight > DEFAULT_HEIGHT
      const maxBottomSheetState = isExpandable
        ? BOTTOM_SHEET_STATE_MAP[BOTTOM_SHEET_STATE.Expanded]
        : BOTTOM_SHEET_STATE_MAP[BOTTOM_SHEET_STATE.Default]
      const minBottomSheetState =
        BOTTOM_SHEET_STATE_MAP[BOTTOM_SHEET_STATE.Collapsed]

      const result = clamp<BottomSheetStateNum>(
        nextBottomSheetState,
        maxBottomSheetState,
        minBottomSheetState,
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
          className="fixed z-10 w-full max-w-[420px] rounded-t-[14px] bg-neutral-700 pb-[24px] text-white will-change-transform"
          initial="default"
          animate={bottomSheetState}
          variants={{
            expanded: { top: `calc(100dvh - ${expandedHeight}px)` },
            default: { top: `calc(100dvh - ${defaultHeight}px)` },
            collapsed: { top: `calc(100dvh - ${HEADER_HEIGHT}px)` },
          }}
          transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
          aria-expanded={bottomSheetState !== BOTTOM_SHEET_STATE.Collapsed}
        >
          {/* header */}
          <motion.div
            className="cursor-grab pb-[24px] pt-[16px]"
            onPointerDown={(e) => dragControls.start(e)}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0}
            onDragEnd={(_, info) => handleDragEnd(info)}
          >
            {/* bar */}
            <div className="mx-auto my-0 h-[6px] w-[53px] rounded-full bg-neutral-400" />
          </motion.div>
          {/* body */}
          <div
            className="select-none transition-all duration-300"
            style={{
              height: bodyHeight(),
            }}
            aria-hidden={bottomSheetState === BOTTOM_SHEET_STATE.Collapsed}
          >
            {/* content */}
            {body(contentRef)}
          </div>
        </motion.div>
      </>
    )
  },
)

BottomSheet.displayName = 'BottomSheet'

export default BottomSheet
