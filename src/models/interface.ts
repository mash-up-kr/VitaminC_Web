/* API */
export interface APIErrorType {}

export class APIError extends Error {
  constructor({ name, message }: { name: string; message: string }) {
    super(message)
    this.name = name
    this.message = message
  }
}

export interface ResponseOk {
  ok: boolean
  message: string
}

/* Bottom Sheet */
export const STATE = {
  Default: 'default',
  Expanded: 'expanded',
  Collapsed: 'collapsed',
} as const
export type State = (typeof STATE)[keyof typeof STATE]
