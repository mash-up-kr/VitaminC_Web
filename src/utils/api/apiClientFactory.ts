import HTTPClient from './HTTPClient'
import type { Interceptors, RequestConfig } from './types'
import { authTokenStorage } from '../storage'

const injectAuthTokenToConfig = (config: RequestConfig) => {
  const token = authTokenStorage.getValueOrNull()
  config.headers = config.headers || {}

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

export function apiClientFactory({
  secure,
  interceptors,
}: {
  secure: boolean
  interceptors?: {
    beforeRequestHeader?: Interceptors['beforeRequestHeader']
    afterResponse?: Interceptors['afterResponse']
  }
}): HTTPClient {
  const BASE_URL = process.env.NEXT_PUBLIC_API_HOST || ''
  const client = new HTTPClient(BASE_URL, interceptors)

  if (secure) {
    client.addInterceptor<RequestConfig>(
      'beforeRequestHeader',
      injectAuthTokenToConfig,
    )
  }

  return client
}
