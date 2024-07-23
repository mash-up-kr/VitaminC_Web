'use client'

import { AccessibleIconButton, Avatar, Icon, Typography } from '@/components'
import BottomModal from '@/components/BottomModal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteCookie } from '../actions'
import { AUTHORIZATION } from '@/constants/cookie'

const USER_DATA = {
  nickName: '홍길동',
}

const Setting = () => {
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false)
  const router = useRouter()

  const handleCloseSignupModal = () => {
    setIsOpenSignupModal(false)
  }

  const handleSignout = () => {
    deleteCookie(AUTHORIZATION)
    router.refresh()
  }

  return (
    <>
      <div className="min-h-dvh bg-neutral-700">
        <header className="relative flex items-center pt-4">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', size: 'xl' }}
            label="이전 페이지"
            className="p-[10px]"
            onClick={() => router.back()}
          />
          <Typography
            className="absolute left-1/2 translate-x-[-50%]"
            as="h1"
            size="body0"
          >
            설정
          </Typography>
        </header>

        <div className="px-5 flex flex-col">
          <div className="flex gap-2 pt-3 pb-1 items-center">
            <Avatar value={USER_DATA.nickName} />
            <Typography as="span" size="body1">
              {USER_DATA.nickName}
            </Typography>
          </div>

          <section className="flex flex-col">
            <Typography
              as="h2"
              size="body1"
              className="flex items-end h-[43px] font-medium"
            >
              일반
            </Typography>

            <div className="h-[38px] flex items-end">
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
