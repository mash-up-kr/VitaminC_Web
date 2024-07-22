import type { IconKey } from '@/components/common/icon'

export interface TagItem {
  id: number
  type?: IconKey
  mapId: string
  content: string
  createdAt: string
}
