'use client'

import { useRef } from 'react'

import { useRouter } from 'next/navigation'

import { useIsServer } from './use-is-server'

const useSafeRouter = () => {
  const isServer = useIsServer()
  const router = useRouter()
  const isBackRef = useRef(false)

  const safeBack = async (options?: { defaultHref?: string }) => {
    if (isServer) return

    if (!isBackRef.current) {
      isBackRef.current = true

      router.replace((document.referrer || options?.defaultHref) ?? '/intro')
      router.back()
      return
    }
  }

  const push = (href: string) => {
    isBackRef.current = false
    router.push(href)
  }

  return {
    ...router,
    push,
    safeBack,
  }
}

export default useSafeRouter
