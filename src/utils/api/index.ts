import type { QueryParams } from '@/types/api/search'
import { apiClientFactory } from './api-client-factory'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import type { ResponseWithMessage } from '@/types/api/api'

const client = {
  public: apiClientFactory({}),
  secure: apiClientFactory({ secure: true }),
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

const test = {
  testGETPublicAPI: () =>
    client.public.get<{ ok: boolean; message: string }>(
      '/api/delay/?delay=3000',
      {
        cache: 'no-store',
        retries: 1000,
        tags: ['user', 'public', 'delay'],
      },
    ),
  testPOSTSecureAPI: () =>
    client.secure.post<{ ok: boolean; message: string }>(
      '/api/delay?delay=3000',
      { key: 'key' },
      {
        beforeRequestHeader: [
          (request) => {
            console.log('request-header', request)
            return request
          },
        ],
        afterResponse: [
          (response) => {
            console.log('response', response)
            return response
          },
        ],
      },
    ),
}

const user = {
  //
}

export const api = {
  test,
  user,
  search,
} as const
