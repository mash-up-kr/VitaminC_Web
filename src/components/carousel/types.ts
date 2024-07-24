import { ReactNode } from 'react'

export interface Item {
  src: string
  title?: string | ReactNode
  caption?: string | ReactNode
}
