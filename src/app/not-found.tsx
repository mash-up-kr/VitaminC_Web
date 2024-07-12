'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/spinner'
import { getMapId } from '@/services/map-id'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const mapId = await getMapId()
      if (mapId) {
        router.replace(`/map/${mapId}`)
      } else {
        router.replace('/intro')
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
