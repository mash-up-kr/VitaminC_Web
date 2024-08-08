'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { Button, Typography } from '@/components'
import Header from '@/components/intro/header'
import LoadingIndicator from '@/components/loading-indicator'
import { getMapId } from '@/services/map-id'
import useSafeRouter from '@/hooks/use-safe-router'

const NotFound = () => {
  const router = useSafeRouter()
  const pathname = usePathname()
  const isRoot = pathname === '/'
  const [isLoading, setIsLoading] = useState(isRoot)

  useEffect(() => {
    const handleRoot = async () => {
      try {
        const mapId = await getMapId()

        if (!mapId) throw new Error('잘못된 접근입니다.')

        return router.replace(`/map/${mapId}`)
      } catch {
        return router.replace('/intro')
      }
    }
    if (isRoot) {
      handleRoot()
    } else {
      setIsLoading(false)
    }
  }, [isRoot, router])

  const handleClick = async () => {
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
  }

  return (
    <div className="bg-neutral-700 h-dvh w-full flex flex-col justify-between">
      <Header />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <div className="flex-1">
            <div className="pt-12 px-5 mb-10 space-y-4">
              <Typography size="body0-2" color="neutral-000">
                앗... 길을 잃어버렸다..!
              </Typography>
              <Typography
                size="body1"
                color="neutral-200"
                className="whitespace-pre-line"
              >
                {`페이지가 존재하지 않거나,\n일시적인 오류가 발생했어요.`}
              </Typography>
            </div>
            <img src="/images/404.png" width="100%" alt="길을 잃었어요" />
          </div>

          <div className="p-5 w-full">
            <Button colorScheme="orange" onClick={handleClick}>
              홈으로 이동
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default NotFound
