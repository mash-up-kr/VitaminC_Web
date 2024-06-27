export const STATE = {
  Default: 'default',
  Expanded: 'expanded',
  Collapsed: 'collapsed',
} as const
export type State = (typeof STATE)[keyof typeof STATE]
