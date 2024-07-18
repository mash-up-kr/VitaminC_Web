import { apiClientFactory } from './api-client-factory'
import type { QueryParams } from '@/types/api/search'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import type { ResponseWithMessage } from '@/types/api'
import type { MapItemForUser } from '@/models/interface'
import { PlaceType } from '@/types/api/place'
import { MapDataType, TagItem } from '@/types/api/maps'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
}

const users = {}

const maps = {
  get: (): Promise<ResponseWithMessage<MapItemForUser[]>> =>
    client.secure.get(`/maps`),
  id: {
    get: (id: string): Promise<ResponseWithMessage<MapDataType>> =>
      client.secure.get(`maps/${id}`),
    tag: {
      get: (id: string): Promise<ResponseWithMessage<TagItem[]>> =>
        client.secure.get(`/maps/${id}/tag`),
    },
  },
}

const search = {
  suggestKeyword: (q: string): Promise<ResponseWithMessage<string[]>> =>
    client.public.get(`/search/suggest?q=${q}`),
  searchPlaces: ({
    q,
    rect,
  }: QueryParams): Promise<ResponseWithMessage<KakaoPlaceItem[]>> =>
    client.public.get(`/search/places?q=${q}&rect=${rect}`),
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
