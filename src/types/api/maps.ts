import type { IconKey } from '@/components/common/icon'

export interface TagItem {
  id: number
  iconType?: IconKey
  mapId: string
  name: string
  createdAt: string
}
