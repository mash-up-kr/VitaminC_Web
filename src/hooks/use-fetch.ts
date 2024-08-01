import { useState, useEffect } from 'react'

import { APIError } from '@/models/interface'
import type { ResponseWithMessage } from '@/types/api'

const useFetch = <T>(
  queryFn: () => Promise<ResponseWithMessage<T>>,
  options?: { onLoadEnd?: (data: T) => void; initialData?: T },
) => {
  const [data, setData] = useState<T | null>(options?.initialData || null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await queryFn()

        setData(response.data)

        if (options?.onLoadEnd) {
          options.onLoadEnd(response.data)
        }
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

  return { data, loading, error }
}

export default useFetch
