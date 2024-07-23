import type { BOTTOM_SHEET_STATE } from './constants'

export type BottomSheetState =
  (typeof BOTTOM_SHEET_STATE)[keyof typeof BOTTOM_SHEET_STATE]

export type BottomSheetStateNum = 0 | 1 | 2
