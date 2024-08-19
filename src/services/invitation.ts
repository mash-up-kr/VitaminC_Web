import { api } from '@/utils/api'
import { inviteCodeStorage } from '@/utils/storage'
import { APIError } from '@/models/interface'
import type { MapInviteInfo } from '@/components/boarding-pass/types'

export const boardMap = async (inviteCode: string) => {
  try {
    const res = await api.maps.inviteLinks.post(inviteCode)
    if (res.message === 'success') {
      return 'success'
    }
    throw new Error()
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === 409) {
        return 'existing'
      } else {
        throw new APIError(error)
      }
    }
    throw new APIError({
      status: 520,
      name: '/maps/invite-links',
      message: '지도에 승선하지 못했습니다.',
    })
  }
}

export const enterMap = async (inviteCode: string) => {
  try {
    await boardMap(inviteCode)

    const { data } = await api.maps.inviteLinks.get(inviteCode)

    inviteCodeStorage.remove()

    return data
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error)
    }
    throw new Error('예상치 못한 오류가 발생했습니다.')
  }
}

export const getMapInviteInfo = async (
  inviteCode: string,
): Promise<MapInviteInfo> => {
  try {
    const res = await api.maps.inviteLinks.get(inviteCode)
    const data = res.data
    const info = {
      inviteCode: data.inviteLink.token,
      expirationTime: new Date(data.inviteLink.expiresAt),
      mapId: data.map.id,
      mapName: data.map.name,
      creator: data.map.createBy,
      numOfCrews: data.map.users.length,
      images: data.placePreviewList,
    }
    return info
  } catch (error) {
    if (error instanceof APIError) {
      throw new APIError(error)
    }
    throw new Error('예상치 못한 에러가 발생했습니다.')
  }
}
