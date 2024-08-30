import type { BOTTOM_SHEET_STATE, BOTTOM_SHEET_STATE_MAP } from './constants'

export type BottomSheetState =
  (typeof BOTTOM_SHEET_STATE)[keyof typeof BOTTOM_SHEET_STATE]

export type BottomSheetStateNum =
  (typeof BOTTOM_SHEET_STATE_MAP)[keyof typeof BOTTOM_SHEET_STATE_MAP]
