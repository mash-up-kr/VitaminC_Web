import { useCallback, useEffect, useState } from 'react'

import { APIError } from '@/models/interface'
import { handleSignout } from '@/services/user'
import type { ResponseWithMessage } from '@/types/api'
import { getTimeDiff } from '@/utils/date'

const cache: Record<string, { data: any; timestamp: Date }> = {}
const fetching: Record<string, boolean> = {}

const CACHE_TIME = 5 * 60 * 1000 // 5분

const useFetch = <T>(
  queryFn?: () => Promise<ResponseWithMessage<T>>,
  options?: {
    onLoadEnd?: (data: T) => void
    initialData?: T
    key?: string[]
    enabled?: boolean
  },
) => {
  const [data, setData] = useState<T | null>(options?.initialData || null)
  const [error, setError] = useState<APIError | null>(null)

  const cacheKey = options?.key?.join('')
  const apiKey = options?.key?.join('') ?? queryFn?.toString() ?? ''

  const disabled = typeof options?.enabled === 'boolean' && !options.enabled

  const revalidate = useCallback((key: string[] | string) => {
    const targetKey = typeof key === 'string' ? key : key.join('')
    if (Reflect.get(cache, targetKey)) {
      Reflect.deleteProperty(cache, targetKey)
    }
  }, [])

  const handleLoadEnd = (payload: T) => {
    if (options?.onLoadEnd) {
      options.onLoadEnd(payload)
    }
  }

  const fetchData = async () => {
    if (!queryFn) return

    try {
      fetching[apiKey] = true

      const response = await queryFn()

      setData(response.data)
      handleLoadEnd(response.data)

      if (cacheKey) {
        cache[cacheKey] = { data: response.data, timestamp: new Date() }
      }
    } catch (err) {
      if (err instanceof APIError) {
        if (err.status === 401) {
          await handleSignout()
        }
        setError({
          name: 'API Error',
          message: err.message,
          status: err.status,
        })
      } else {
        setError({
          name: 'Unexpected Error',
          message: '예상치 못한 오류가 발생했습니다.',
          status: 418,
        })
      }
    } finally {
      fetching[apiKey] = false
    }
  }

  const clear = useCallback(() => {
    Object.keys(cache).forEach((key: keyof typeof cache) => {
      delete cache[key]
    })
  }, [])

  useEffect(() => {
    const getData = async () => {
      if (disabled) return

      if (cacheKey && cache[cacheKey]?.data) {
        const timeDiff = getTimeDiff(cache[cacheKey].timestamp, new Date())
        const isExpired = timeDiff >= CACHE_TIME
        if (!isExpired) {
          setData(cache[cacheKey].data)
          handleLoadEnd(cache[cacheKey].data)
          return
        }
        revalidate(cacheKey)
      }

      fetchData()
    }

    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, cacheKey, disabled])

  return {
    data,
    isFetching: fetching[apiKey] ?? false,
    error,
    status: data ? 'success' : error ? 'error' : disabled ? 'idle' : 'pending',
    revalidate,
    clear,
    refetch: fetchData,
  }
}

export default useFetch
