import { APIError } from '@/models/interface'
import { ResponseWithMessage } from '@/types/api'
import { parseJSON } from './parse-json'

const cache: Record<string, any> = {}

export const fetchData = async <T>(
  url: string,
  options?: { key?: string[] },
): Promise<T> => {
  const cacheKey = options?.key?.join('') ?? url

  if (cache[cacheKey]) {
    return cache[cacheKey]
  }

  try {
    const response = await fetch(url)
    const { data } = await parseJSON<ResponseWithMessage<T>>(response)

    if (data) {
      cache[cacheKey] = data
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
