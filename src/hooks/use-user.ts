import { useState, useEffect } from 'react'

import type { User } from '@/models/user.interface'
import { api } from '@/utils/api'
import { APIError } from '@/models/interface'

const useUser = (options?: { onLoad?: (user: User) => void }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const { data } = await api.users.me.get()

        setUser(data)
        if (options?.onLoad) {
          options.onLoad(data)
        }
      } catch (err) {
        if (err instanceof APIError) setError(err.message)
        else setError('예상치 못한 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading, error }
}

export default useUser
