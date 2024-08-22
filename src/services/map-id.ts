import { APIError } from '../models/interface'

import { setCookie } from '@/app/actions'
import { RECENT_MAP_ID } from '@/constants/cookie'
import { api } from '@/utils/api'
import getCookie from '@/utils/storage/cookie'

export const getMapIdFromCookie = (): string | undefined => {
  const mapId = getCookie(RECENT_MAP_ID)

  return mapId
}

const setMapIdToCookie = (mapId: string): void => {
  setCookie(RECENT_MAP_ID, mapId)
}

const fetchMapIds = async (): Promise<string[] | undefined> => {
  try {
    const { data: maps } = await api.maps.get()
    const mapIds = maps.map((mapItem) => mapItem.id)

    return mapIds
  } catch (error) {
    if (error instanceof APIError || error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

const validateMapId = (mapId: string, mapIds: string[]) => {
  return mapIds.includes(mapId)
}

export const updateMapIdCookie = async (mapId?: string) => {
  try {
    const mapIds = await fetchMapIds()

    const noMap = !mapIds || mapIds.length === 0
    if (noMap) return

    if (mapId && validateMapId(mapId, mapIds)) {
      setMapIdToCookie(mapId)

      return mapId
    }

    const mapIdFromCookie = getMapIdFromCookie() || ''

    if (!validateMapId(mapIdFromCookie, mapIds)) {
      const firstMapId = mapIds[0]

      setMapIdToCookie(firstMapId)

      return firstMapId
    }

    return mapIdFromCookie
  } catch (error) {
    if (error instanceof APIError || error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export const getMapId = async (): Promise<string | undefined> => {
  try {
    const mapId = await updateMapIdCookie()
    return mapId
  } catch (error) {
    if (error instanceof APIError || error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
