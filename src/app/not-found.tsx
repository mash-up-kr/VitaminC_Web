'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/spinner'
import { getMapId } from '@/services/map-id'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      try {
        const mapId = await getMapId()
        if (mapId) {
          router.replace(`/map/${mapId}`)
        } else {
          throw new Error()
        }
      } catch {
        return router.replace('/intro')
      }
    })()
  }, [router])

  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <Spinner />
    </div>
  )
}

export default NotFound
