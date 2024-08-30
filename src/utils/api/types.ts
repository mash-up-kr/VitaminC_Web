export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type Interceptor<T> = (data: T) => Promise<T> | T

export interface RequestOptions {
  headers?: Record<string, string>
  body?: any
  retries?: number
  cache?: RequestInit['cache']
  revalidate?: NextFetchRequestConfig['revalidate']
  tags?: NextFetchRequestConfig['tags']
  timeout?: number
  beforeRequestHeader?: Interceptor<RequestInit>[]
  afterResponse?: Interceptor<Response>[]
}

export interface Interceptors {
  beforeRequestHeader: Interceptor<RequestInit>[]
  afterResponse: Interceptor<Response>[]
}

export type RequestConfig = Omit<RequestInit, 'headers'> & {
  headers: Record<string, string>
}
