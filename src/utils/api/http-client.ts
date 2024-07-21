import { APIError } from '@/models/interface'
import { parseJSON } from './parse-json'
import type {
  HTTPMethod,
  Interceptor,
  Interceptors,
  RequestConfig,
  RequestOptions,
} from './types'

class HTTPClient {
  private baseUrl: string

  private interceptors: Interceptors

  constructor(baseUrl: string, interceptors?: Partial<Interceptors>) {
    this.baseUrl = baseUrl
    this.interceptors = {
      beforeRequestHeader: interceptors?.beforeRequestHeader || [],
      afterResponse: interceptors?.afterResponse || [],
    }
  }

  private async runInterceptors<T extends RequestInit | Response>(
    type: keyof Interceptors,
    data: T,
    methodInterceptors?: Interceptor<T>[],
  ): Promise<T> {
    let result = data
    const allInterceptors = [
      ...this.interceptors[type],
      ...(methodInterceptors || []),
    ] as Interceptor<T>[]

    for (const interceptor of allInterceptors) {
      result = await interceptor(result)
    }
    return result
  }

  public addInterceptor<T>(
    type: keyof Interceptors,
    interceptor: Interceptor<T>,
  ): void {
    this.interceptors[type].push(interceptor as Interceptor<any>)
  }

  private initializeRequestInit(
    method: HTTPMethod,
    options: RequestOptions,
  ): RequestInit {
    const { headers = {}, body, cache } = options
    const requestInit: RequestConfig = {
      method,
      headers,
      cache,
    }

    if (body) {
      requestInit.headers = {
        ...requestInit.headers,
        'Content-Type': 'application/json',
      }
      requestInit.body = JSON.stringify(body)
    }

    return requestInit
  }

  private setRequestTimeout(
    controller: AbortController,
    timeout: number,
  ): void {
    setTimeout(() => controller.abort(), timeout)
  }

  private async fetchWithRetries(
    requestUrl: string,
    requestInit: RequestInit,
    options: RequestOptions,
  ): Promise<Response> {
    const { retries = 1, timeout = 10000 } = options

    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController()
      requestInit.signal = controller.signal

      this.setRequestTimeout(controller, timeout)

      try {
        let response = await fetch(requestUrl, requestInit)

        response = await this.runInterceptors(
          'afterResponse',
          response,
          options.afterResponse,
        )

        if (!response.ok) {
          const data = await response.json()

          throw new APIError({
            status: data.statusCode,
            name: 'API Error',
            message: data.message,
          })
        }

        return response
      } catch (error) {
        if (
          attempt === retries ||
          (error instanceof DOMException && error.name === 'AbortError')
        ) {
          throw error
        }
      }
    }

    throw new APIError({
      status: 404,
      name: 'API Error',
      message: 'Unexpected Error',
    })
  }

  private async request<T>(
    url: string,
    method: HTTPMethod,
    options: RequestOptions = {},
  ): Promise<T> {
    const requestUrl = `${this.baseUrl}${url}`

    let requestInit = this.initializeRequestInit(method, options)
    requestInit = await this.runInterceptors(
      'beforeRequestHeader',
      requestInit,
      options.beforeRequestHeader,
    )

    try {
      const response = await this.fetchWithRetries(
        requestUrl,
        requestInit,
        options,
      )
      const data = await parseJSON<T>(response)
      return data
    } catch (error) {
      if (error instanceof APIError) {
        throw new APIError(error)
      } else {
        throw new APIError({
          status: 404,
          name: 'API Error',
          message: 'Unexpected Error',
        })
      }
    }
  }

  public get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, 'GET', options)
  }

  public post<T>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'body'>,
  ): Promise<T> {
    return this.request<T>(url, 'POST', { ...options, body })
  }

  public put<T>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'body'>,
  ): Promise<T> {
    return this.request<T>(url, 'PUT', { ...options, body })
  }

  public patch<T>(
    url: string,
    body?: any,
    options?: Omit<RequestOptions, 'body'>,
  ): Promise<T> {
    return this.request<T>(url, 'PATCH', { ...options, body })
  }

  public delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, 'DELETE', options)
  }
}

export default HTTPClient
