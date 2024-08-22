import HTTPClient from './http-client'
import { fetchData } from './route'
import type { Interceptors, RequestConfig } from './types'

import type { Token } from '@/models/user'

const injectAuthTokenToConfig = async (config: RequestConfig) => {
  config.headers = config.headers || {}

  try {
    const response = await fetchData<Token>('/api/token', {
      key: ['token'],
    })

    const token = response.data.token
    if (token) {
      config.headers.Authorization = token
    }
  } catch {}

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
