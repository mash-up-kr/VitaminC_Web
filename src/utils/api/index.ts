import { apiClientFactory } from './api-client-factory'
import type { QueryParams } from '@/types/api/search'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import type { ResponseWithMessage } from '@/types/api'
import type {
  MapInviteInfoResponseType,
  UserByMap,
} from '@/models/map.interface'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
}

const users = {}

const maps = {
  get: (): Promise<ResponseWithMessage<UserByMap[]>> =>
    client.secure.get(`/maps`),
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
