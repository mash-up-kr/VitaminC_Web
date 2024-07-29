'use client'

import { useRouter } from 'next/navigation'
import { useIsServer } from './use-is-server'
import { getMapId } from '@/services/map-id'

const useSafeRouter = () => {
  const isServer = useIsServer()
  const router = useRouter()

  const safeBack = async (defaultPage?: string) => {
    if (isServer) return

    if (window.history.length > 1) {
      router.back()
    } else {
      if (defaultPage) {
        router.push(defaultPage)
        return
      }

      try {
        const page = await getMapId()
        router.push(`/map/${page}`)
      } catch (err) {
        router.push('/intro')
      }
    }
  }

  return {
    ...router,
    safeBack,
  }
}

export default useSafeRouter
