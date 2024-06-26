/* API */
export interface APIErrorType {}

class ErrorNameMessage extends Error {
  constructor({ name, message }: { name: string; message: string }) {
    super(message)
    this.name = name
    this.message = message
  }
}
export class APIError extends ErrorNameMessage {}
export class ParseJSONError extends ErrorNameMessage {}

export interface ResponseOk {
  ok: boolean
  message: string
}

/* Bottom Sheet */
export const BOTTOM_SHEET_STATE = {
  Default: 'default',
  Expanded: 'expanded',
  Collapsed: 'collapsed',
} as const
export type BottomSheetState =
  (typeof BOTTOM_SHEET_STATE)[keyof typeof BOTTOM_SHEET_STATE]

export type IntroStep = 'nickname' | 'complete' | 'map' | 'invite'
