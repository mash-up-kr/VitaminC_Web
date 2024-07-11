import HTTPClient from './http-client'
import type { Interceptors, RequestConfig } from './types'
import { AUTHORIZATION } from '../storage/index'
import getCookie from '../storage/cookie'

const injectAuthTokenToConfig = (config: RequestConfig) => {
  const token = getCookie(AUTHORIZATION)?.slice(9) // remove prefix 'Bearer%20'
  config.headers = config.headers || {}

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

export function apiClientFactory({
  baseUrl,
  secure,
  interceptors,
}: {
  baseUrl?: string
  secure?: boolean
  interceptors?: {
    beforeRequestHeader?: Interceptors['beforeRequestHeader']
    afterResponse?: Interceptors['afterResponse']
  }
}): HTTPClient {
  const BASE_URL = baseUrl || process.env.NEXT_PUBLIC_API_ORIGIN || ''
  const client = new HTTPClient(BASE_URL, interceptors)

  if (secure) {
    client.addInterceptor<RequestConfig>(
      'beforeRequestHeader',
      injectAuthTokenToConfig,
    )
  }

  return client
}
