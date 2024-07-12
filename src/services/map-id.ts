import { setCookie } from '@/app/actions'
import { RECENT_MAP_ID } from '@/constants/cookie'
import { api } from '@/utils/api'
import getCookie from '@/utils/storage/cookie'

const getStoredMapId = (): string | undefined => {
  const storedMapId = getCookie(RECENT_MAP_ID)
  // mapId가 유효한지 검사하는 로직이 필요하다면 추가
  return storedMapId
}

const fetchLatestMapId = async (): Promise<string | undefined> => {
  try {
    const { data: maps } = await api.maps.get()
    return maps[0]?.id
  } catch (error) {
    console.error('Failed to fetch maps:', error)
    return undefined
  }
}

const storeMapId = (mapId: string): void => {
  setCookie(RECENT_MAP_ID, mapId)
}

const getLatestMapIdAndStore = async (): Promise<string | undefined> => {
  const latestMapId = await fetchLatestMapId()
  if (latestMapId) {
    storeMapId(latestMapId)
  }
  return latestMapId
}

export const getMapId = async (): Promise<string | undefined> => {
  return getStoredMapId() || (await getLatestMapIdAndStore())
}
