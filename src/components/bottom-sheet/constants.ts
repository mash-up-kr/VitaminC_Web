export const BOTTOM_SHEET_STATE = {
  Expanded: 'expanded',
  Default: 'default',
  Collapsed: 'collapsed',
} as const

export const BOTTOM_SHEET_STATE_MAP = {
  [BOTTOM_SHEET_STATE.Expanded]: 0,
  [BOTTOM_SHEET_STATE.Default]: 1,
  [BOTTOM_SHEET_STATE.Collapsed]: 2,
  0: BOTTOM_SHEET_STATE.Expanded,
  1: BOTTOM_SHEET_STATE.Default,
  2: BOTTOM_SHEET_STATE.Collapsed,
} as const
