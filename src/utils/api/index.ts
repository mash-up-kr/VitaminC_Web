import { apiClientFactory } from './api-client-factory'
import type { QueryParams } from '@/types/api/search'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import type { ResponseWithMessage } from '@/types/api'
import type {
  InviteLink,
  MapInviteInfoResponseType,
  UserByMap,
} from '@/models/map.interface'
import { PlaceType } from '@/types/api/place'
import { MapDataType, TagItem } from '@/types/api/maps'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
}

const users = {
  id: {
    maps: {
      mapId: {
        delete: ({ id, mapId }: { id: number; mapId: string }) =>
          client.secure.delete(`/users/${id}/maps/${mapId}`),
      },
    },
  },
}

const maps = {
  get: (): Promise<ResponseWithMessage<UserByMap[]>> =>
    client.secure.get(`/maps`),
  id: {
    get: (id: string): Promise<ResponseWithMessage<MapDataType>> =>
      client.secure.get(`/maps/${id}`),
    tag: {
      get: (id: string): Promise<ResponseWithMessage<TagItem[]>> =>
        client.secure.get(`/maps/${id}/tag`),
    },
    inviteLinks: {
      post: (id: string): Promise<ResponseWithMessage<InviteLink>> =>
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
    get: (mapId: string): Promise<ResponseWithMessage<PlaceType[]>> =>
      client.secure.get(`/place/${mapId}`),
  },
}

export const api = {
  users,
  maps,
  search,
  place,
} as const
