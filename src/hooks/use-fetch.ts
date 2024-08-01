import { useState, useEffect, useCallback } from 'react'

import { APIError } from '@/models/interface'
import type { ResponseWithMessage } from '@/types/api'

const cache: Record<string, any> = {}

const useFetch = <T>(
  queryFn: () => Promise<ResponseWithMessage<T>>,
  options?: { onLoadEnd?: (data: T) => void; initialData?: T; key?: string[] },
) => {
  const [data, setData] = useState<T | null>(options?.initialData || null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const cacheKey = options?.key?.join('') ?? queryFn.toString()

  const revalidate = useCallback((key: string[] | string) => {
    const targetKey = typeof key === 'string' ? key : key.join('')
    if (Reflect.get(cache, targetKey)) {
      Reflect.deleteProperty(cache, targetKey)
    }
  }, [])

  const clear = useCallback(() => {
    Object.assign(cache, {})
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (cache[cacheKey]) {
        setData(cache[cacheKey])
        return
      }

      setLoading(true)
      try {
        const response = await queryFn()

        setData(response.data)

        if (options?.onLoadEnd) {
          options.onLoadEnd(response.data)
        }
        cache[cacheKey] = response.data
      } catch (err) {
        if (err instanceof APIError) setError(err.message)
        else setError('예상치 못한 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, loading, error, revalidate, clear }
}

export default useFetch
