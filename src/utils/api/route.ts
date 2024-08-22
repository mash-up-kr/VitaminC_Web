import { parseJSON } from './parse-json'

import type { ResponseWithMessage } from '@/models/api'
import { APIError } from '@/models/api/index'

const cache: Record<string, any> = {}

interface Options extends RequestInit {
  key?: string[]
}

export const fetchData = async <T>(
  url: string,
  options?: Options,
): Promise<ResponseWithMessage<T>> => {
  const cacheKey = options?.key?.join('') ?? url
  if (options?.key) {
    delete options.key
  }

  if (cache[cacheKey]) {
    return {
      message: 'success',
      data: cache[cacheKey],
    }
  }

  try {
    const response = await fetch(url, options)
    const data = await parseJSON<ResponseWithMessage<T>>(response)

    if (data.data) {
      cache[cacheKey] = data.data
    }

    return data
  } catch (error) {
    if (error instanceof APIError || error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error('예상치 못한 오류가 발생했습니다.')
  }
}

export const revalidate = (key: string[] | string) => {
  const targetKey = typeof key === 'string' ? key : key.join('')
  if (Reflect.get(cache, targetKey)) {
    Reflect.deleteProperty(cache, targetKey)
  }
}
