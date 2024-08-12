import { useState, useEffect, useCallback } from 'react'

import { APIError } from '@/models/interface'
import type { ResponseWithMessage } from '@/types/api'
import { deleteCookie } from '@/app/actions'
import { revalidate as revalidateRoute } from '@/utils/api/route'
import { getTimeDiff } from '@/utils/date'

const cache: Record<string, { data: any; timestamp: Date }> = {}
const loadingMap: Record<string, boolean> = {}

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
  const [error, setError] = useState<string | null>(null)

  const cacheKey = options?.key?.join('')
  const apiKey = options?.key?.join('') ?? queryFn?.toString() ?? ''

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
    const handleLoadEnd = (payload: T) => {
      if (options?.onLoadEnd) {
        options.onLoadEnd(payload)
      }
    }

    const fetchData = async () => {
      if (typeof options?.enabled === 'boolean' && !options.enabled) return
      if (cacheKey && cache[cacheKey]?.data) {
        const ms = getTimeDiff(cache[cacheKey].timestamp, new Date())
        const isExpired = ms >= CACHE_TIME
        if (!isExpired) {
          setData(cache[cacheKey].data)
          handleLoadEnd(cache[cacheKey].data)
          return
        }
        revalidate(cacheKey)
      }

      if (!queryFn) return

      try {
        loadingMap[apiKey] = true
        const response = await queryFn()

        setData(response.data)
        handleLoadEnd(response.data)
        if (cacheKey) {
          cache[cacheKey] = { data: response.data, timestamp: new Date() }
        }
      } catch (err) {
        if (err instanceof APIError) {
          if (err.status === 401) {
            revalidateRoute('token')
            deleteCookie('Authorization')
          }
          setError(err.message)
        } else {
          setError('예상치 못한 오류가 발생했습니다.')
        }
      } finally {
        loadingMap[apiKey] = false
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, cacheKey, options?.enabled])

  return { data, loading: loadingMap[apiKey], error, revalidate, clear }
}

export default useFetch
