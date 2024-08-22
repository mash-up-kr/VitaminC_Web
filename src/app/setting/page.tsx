'use client'

import { useState } from 'react'

import { AccessibleIconButton, Avatar, Icon, Typography } from '@/components'
import BottomModal from '@/components/BottomModal'
import { api } from '@/utils/api'
import useSafeRouter from '@/hooks/use-safe-router'
import useFetch from '@/hooks/use-fetch'
import { handleSignout } from '@/services/user'

const Setting = () => {
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false)
  const { data: user } = useFetch(api.users.me.get, { key: ['user'] })
  const router = useSafeRouter()

  const handleCloseSignupModal = () => {
    setIsOpenSignupModal(false)
  }

  return (
    <>
      <div className="min-h-dvh bg-neutral-700">
        <header className="relative flex items-center pt-4">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', size: 'xl' }}
            label="이전 페이지"
            className="p-[10px]"
            onClick={() => router.safeBack()}
          />
          <Typography
            className="absolute left-1/2 translate-x-[-50%]"
            as="h1"
            size="body0"
          >
            설정
          </Typography>
        </header>

        <div className="flex flex-col px-5">
          <div className="flex items-center gap-2 pb-1 pt-3">
            <Avatar value={user?.nickname ?? ''} />
            <Typography as="span" size="body1">
              {user?.nickname}
            </Typography>
          </div>

          <section className="flex flex-col">
            <Typography
              as="h2"
              size="body1"
              className="flex h-[43px] items-end font-medium"
            >
              일반
            </Typography>

            <div className="flex h-[38px] items-end">
              <button
                className="flex gap-2"
                onClick={() => setIsOpenSignupModal(true)}
              >
                <Icon type="signOut" size="lg" />
                <Typography size="body1" color="neutral-100">
                  로그아웃
                </Typography>
              </button>
            </div>
          </section>
        </div>
      </div>
      <BottomModal
        isOpen={isOpenSignupModal}
        cancelMessage="아니요"
        confirmMessage="로그아웃"
        title="정말 로그아웃 하시겠어요?"
        onCancel={handleCloseSignupModal}
        onClose={handleCloseSignupModal}
        onConfirm={handleSignout}
      />
    </>
  )
}

export default Setting
