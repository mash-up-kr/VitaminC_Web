import { apiClientFactory } from './apiClientFactory'

const client = {
  public: apiClientFactory({ secure: false }),
  secure: apiClientFactory({ secure: true }),
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
} as const
