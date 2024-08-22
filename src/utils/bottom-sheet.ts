import {
  BOTTOM_SHEET_STATE,
  BOTTOM_SHEET_STATE_MAP,
} from '@/components/common/bottom-sheet/constants'
import type {
  BottomSheetState,
  BottomSheetStateNum,
} from '@/components/common/bottom-sheet/types'

export const toBottomSheetState = (
  value: BottomSheetStateNum,
  defaultState: BottomSheetState = BOTTOM_SHEET_STATE.Default,
): BottomSheetState => {
  const targetState = (
    Object.keys(BOTTOM_SHEET_STATE_MAP) as BottomSheetState[]
  ).find((key) => BOTTOM_SHEET_STATE_MAP[key] === value)

  return targetState ?? defaultState
}
