import { apiClientFactory } from './api-client-factory'
import type { QueryParams } from '@/types/api/search'
import type { ResponseWithMessage } from '@/types/api'
import type {
  InviteLink,
  MapInfo,
  MapInviteInfoResponseType,
  UserByMapInfo,
} from '@/models/map.interface'
import type { User } from '@/models/user.interface'
import type { PlaceDetail, PlaceType, SearchPlace } from '@/types/api/place'
import type { TagItem } from '@/types/api/maps'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
}

const users = {
  maps: {
    mapId: {
      delete: ({ mapId }: { mapId: string }) =>
        client.secure.delete(`/users/maps/${mapId}`),
    },
  },
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
  get: (): Promise<ResponseWithMessage<UserByMapInfo[]>> =>
    client.secure.get(`/maps`),
  post: (name: string): Promise<ResponseWithMessage<UserByMapInfo>> =>
    client.secure.post(`/maps`, { name }),
  id: {
    get: (id: MapInfo['id']): Promise<ResponseWithMessage<MapInfo>> =>
      client.secure.get(`/maps/${id}`, { tags: ['map', id] }),
    tag: {
      get: (id: MapInfo['id']): Promise<ResponseWithMessage<TagItem[]>> =>
        client.secure.get(`/maps/${id}/tag`, { tags: ['tag', id] }),
      post: ({
        id,
        name,
      }: {
        id: MapInfo['id']
        name: string
      }): Promise<ResponseWithMessage<TagItem>> =>
        client.secure.post(`/maps/${id}/tag`, { name }),
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
      mapId,
    }: QueryParams & { mapId: MapInfo['id'] }): Promise<
      ResponseWithMessage<SearchPlace[]>
    > => client.public.get(`/search/places?q=${q}&rect=${rect}&mapId=${mapId}`),
  },
}

interface PlaceIdWithMapId {
  placeId: PlaceType['place']['id']
  mapId: MapInfo['id']
}

const place = {
  mapId: {
    get: (mapId: MapInfo['id']): Promise<ResponseWithMessage<PlaceType[]>> =>
      client.secure.get(`/place/${mapId}`),

    placeId: {
      delete: ({ placeId, mapId }: PlaceIdWithMapId) =>
        client.secure.delete(`/place/${mapId}/${placeId}`),

      like: {
        put: ({ placeId, mapId }: PlaceIdWithMapId) =>
          client.secure.put(`/place/${mapId}/${placeId}/like`),

        delete: ({ placeId, mapId }: PlaceIdWithMapId) =>
          client.secure.delete(`/place/${mapId}/${placeId}/like`),
      },
    },

    kakao: {
      kakaoPlaceId: {
        get: ({
          mapId,
          kakaoPlaceId,
        }: {
          mapId: MapInfo['id']
          kakaoPlaceId: PlaceType['place']['kakaoPlace']['id']
        }): Promise<ResponseWithMessage<PlaceDetail>> =>
          client.secure.get(`/place/${mapId}/kakao/${kakaoPlaceId}`),

        post: ({
          mapId,
          kakaoPlaceId,
          tagNames,
        }: {
          mapId: MapInfo['id']
          kakaoPlaceId: PlaceType['place']['kakaoPlace']['id']
          tagNames: TagItem['name'][]
        }): Promise<ResponseWithMessage<PlaceType>> =>
          client.secure.post(`/place/${mapId}/kakao/${kakaoPlaceId}`, {
            tagNames,
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
