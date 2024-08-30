'use client'

import { useCallback, useMemo, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useIsServer } from './use-is-server'

const useSafeRouter = () => {
  const isServer = useIsServer()
  const router = useRouter()
  const isBackRef = useRef(false)

  const safeBack = useCallback(
    async (options?: { defaultHref?: string }) => {
      if (isServer) return

      if (!isBackRef.current) {
        isBackRef.current = true

        router.replace((document.referrer || options?.defaultHref) ?? '/intro')
        router.back()
        return
      }
    },
    [isServer, router],
  )

  const push = useCallback(
    (href: string) => {
      isBackRef.current = false
      router.push(href)
    },
    [router],
  )

  return useMemo(() => {
    return {
      ...router,
      push,
      safeBack,
    }
  }, [push, router, safeBack])
}

export default useSafeRouter
