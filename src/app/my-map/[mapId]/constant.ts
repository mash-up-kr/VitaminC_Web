import type { MapMemberData } from '@/models/map'

export const korRole: Record<MapMemberData['role'], string> = {
  ADMIN: '모든 권한',
  WRITE: '편집 가능',
  READ: '보기만 가능',
}
