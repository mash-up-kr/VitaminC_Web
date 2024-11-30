'use client'

import type { ReactNode } from 'react'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import useSafeRouter from '@/hooks/use-safe-router'

const PlaceMapLayout = ({ children }: { children: ReactNode }) => {
  const router = useSafeRouter()

  return (
    <div className="relative flex min-h-dvh flex-col bg-neutral-700">
      <header className="absolute left-0 top-0 z-[100] h-[60px] w-full bg-gradient-to-t from-[rgba(33,33,36,0)] to-[rgba(33,33,36,0.6)]">
        <AccessibleIconButton
          icon={{ type: 'caretLeft', size: 'xl' }}
          label="뒤로 가기"
          className="absolute left-[10px] top-[26px]"
          onClick={() => router.back()}
        />
      </header>
      {children}
    </div>
  )
}

export default PlaceMapLayout
