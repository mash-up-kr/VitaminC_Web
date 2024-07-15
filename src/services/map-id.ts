import { setCookie } from '@/app/actions'
import { RECENT_MAP_ID } from '@/constants/cookie'
import { api } from '@/utils/api'
import getCookie from '@/utils/storage/cookie'

const getStoredMapId = (): string | undefined => {
  const storedMapId = getCookie(RECENT_MAP_ID)
  // mapId가 유효한지 검사하는 로직이 필요하다면 추가
  return storedMapId
}

const storeMapId = (mapId: string): void => {
  setCookie(RECENT_MAP_ID, mapId)
}

const fetchAndStoreMapId = async (): Promise<string | undefined> => {
  try {
    const { data: maps } = await api.maps.get()
    const mapId = maps[0]?.id

    storeMapId(mapId)

    return mapId
  } catch {
    return undefined
  }
}

export const getMapId = async (): Promise<string | undefined> => {
  return getStoredMapId() || (await fetchAndStoreMapId())
}
