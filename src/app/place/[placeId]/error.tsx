'use client'

import { useEffect } from 'react'

import { notify } from '@/components/common/custom-toast'
import { APIError } from '@/models/api'
import useSafeRouter from '@/hooks/use-safe-router'

const PlaceError = ({ error }: { error: Error & { digest?: string } }) => {
  const router = useSafeRouter()

  useEffect(() => {
    if (error instanceof APIError) {
      notify.error(error.message)
    } else {
      notify.error('예상치 못한 오류가 발생했습니다.')
    }
    router.safeBack()
  }, [error, router])

  return null
}

export default PlaceError
