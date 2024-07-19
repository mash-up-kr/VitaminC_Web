import { api } from '@/utils/api'

export const getUser = async () => {
  try {
    const res = await api.users.me.get()
    const user = res.data
    return user
  } catch {
    return undefined
  }
}
