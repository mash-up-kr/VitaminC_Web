import { apiClientFactory } from './api-client-factory'
import type { QueryParams } from '@/types/api/search'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import type { ResponseWithMessage } from '@/types/api'
import type {
  InviteLink,
  MapInfo,
  MapInviteInfoResponseType,
  UserByMap,
} from '@/models/map.interface'
import type { User } from '@/models/user.interface'
import type { PlaceType } from '@/types/api/place'
import type { MapDataType, TagItem } from '@/types/api/maps'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
}

const users = {
  me: {
    get: (): Promise<ResponseWithMessage<User>> =>
      client.secure.get(`/users/me`),
    patch: (nickname: string): Promise<ResponseWithMessage<User>> =>
      client.secure.patch(`/users/me`, { nickname }),
  },
  check: {
    nickname: {
      get: (nickname: string): Promise<ResponseWithMessage<User>> =>
        client.public.get(`/users/check/nickname?nickname=${nickname}`),
    },
  },
}

const maps = {
  get: (): Promise<ResponseWithMessage<UserByMap[]>> =>
    client.secure.get(`/maps`),
  post: (name: string): Promise<ResponseWithMessage<UserByMap>> =>
    client.secure.post(`/maps`, { name }),
  id: {
    get: (id: MapInfo['id']): Promise<ResponseWithMessage<MapDataType>> =>
      client.secure.get(`/maps/${id}`, { tags: ['map', id] }),
    tag: {
      get: (id: MapInfo['id']): Promise<ResponseWithMessage<TagItem[]>> =>
        client.secure.get(`/maps/${id}/tag`, { tags: ['tag', id] }),
      post: ({
        id,
        content,
      }: {
        id: MapInfo['id']
        content: string
      }): Promise<ResponseWithMessage<TagItem>> =>
        client.secure.post(`/maps/${id}/tag`, { content }),
    },
    inviteLinks: {
      post: (id: MapInfo['id']): Promise<ResponseWithMessage<InviteLink>> =>
        client.secure.post(`/maps/${id}/invite-links`),
    },
  },
  inviteLinks: {
    get: (
      token: string,
    ): Promise<ResponseWithMessage<MapInviteInfoResponseType>> =>
      client.public.get(`/maps/invite-links/${token}`),
    post: (token: string): Promise<ResponseWithMessage<{}>> =>
      client.secure.post(`/maps/invite-links/${token}`),
  },
}

const search = {
  suggest: {
    get: (q: string): Promise<ResponseWithMessage<string[]>> =>
      client.public.get(`/search/suggest?q=${q}`),
  },
  places: {
    get: ({
      q,
      rect,
    }: QueryParams): Promise<ResponseWithMessage<KakaoPlaceItem[]>> =>
      client.public.get(`/search/places?q=${q}&rect=${rect}`),
  },
}

const place = {
  mapId: {
    get: (mapId: MapInfo['id']): Promise<ResponseWithMessage<PlaceType[]>> =>
      client.secure.get(`/place/${mapId}`),

    kakao: {
      kakaoPlaceId: {
        put: ({
          mapId,
          kakaoPlaceId,
          tagIds,
        }: {
          mapId: MapInfo['id']
          kakaoPlaceId: PlaceType['place']['kakaoPlace']['id']
          tagIds: TagItem['id'][]
        }): Promise<ResponseWithMessage<PlaceType>> =>
          client.secure.put(`/place/${mapId}/kakao/${kakaoPlaceId}`, {
            tagIds,
          }),
      },
    },
  },
  placeId: {
    get: (placeId: string): Promise<ResponseWithMessage<PlaceType>> =>
      client.secure.get(`place/${placeId}`),
  },
}

export const api = {
  users,
  maps,
  search,
  place,
} as const
