import type { QueryParams } from '@/types/api/search'
import { apiClientFactory } from './api-client-factory'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import type { ResponseWithMessage } from '@/types/api'
import { MapItemForUser } from '@/models/interface'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
}

const users = {}

const maps = {
  get: (): Promise<ResponseWithMessage<MapItemForUser[]>> =>
    client.secure.get(`/maps`),
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

export const api = {
  users,
  maps,
  search,
} as const
