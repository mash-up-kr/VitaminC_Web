import { ReactNode } from 'react'

export interface Item {
  src: string | unknown
  title?: string | ReactNode
  caption?: string | ReactNode
}
