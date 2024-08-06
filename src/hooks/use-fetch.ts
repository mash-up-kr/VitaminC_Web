import { useState, useEffect, useCallback } from 'react'

import { APIError } from '@/models/interface'
import type { ResponseWithMessage } from '@/types/api'
import { deleteCookie } from '@/app/actions'
import { revalidate as revalidateRoute } from '@/utils/api/route'

const cache: Record<string, any> = {}
const loadingMap: Record<string, boolean> = {}

const useFetch = <T>(
  queryFn: () => Promise<ResponseWithMessage<T>>,
  options?: {
    onLoadEnd?: (data: T) => void
    initialData?: T
    key?: string[]
    enabled?: boolean
  },
) => {
  const [data, setData] = useState<T | null>(options?.initialData || null)
  const [error, setError] = useState<string | null>(null)

  const apiKey = options?.key?.join('') ?? queryFn.toString()

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
      if (options && 'enabled' in options && !options.enabled) return
      if (cache[apiKey]) {
        setData(cache[apiKey])
        handleLoadEnd(cache[apiKey])
        return
      }
      if (loadingMap[apiKey]) return

      try {
        loadingMap[apiKey] = true
        const response = await queryFn()

        setData(response.data)
        handleLoadEnd(response.data)
        cache[apiKey] = response.data
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
  }, [apiKey, options, options?.enabled, queryFn])

  return { data, loading: loadingMap[apiKey], error, revalidate, clear }
}

export default useFetch
