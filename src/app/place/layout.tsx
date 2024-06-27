'use client'

import { useSearchParams } from 'next/navigation'

const PlaceLayout = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams()

  const [userId, mapName] = [
    searchParams.get('userId'),
    searchParams.get('mapName'),
  ]

  if (!userId || !mapName) {
    return <>지도가 지정되지 않았습니다.</>
  }

  return <>{children}</>
}

export default PlaceLayout
