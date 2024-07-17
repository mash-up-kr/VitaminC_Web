'use client'

import { AccessibleIconButton, Avatar, Icon, Typography } from '@/components'
import BottomModal from '@/components/BottomModal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteCookie } from '../actions'
import { AUTHORIZATION } from '@/utils/storage'

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
  }

  return (
    <>
      <div className="px-5">
        <header className="relative flex items-center pt-[18px] pb-2.5">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', className: 'w-6 h-6' }}
            label="이전 페이지"
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
        <main className="flex flex-col gap-6">
          <div className="flex gap-1 items-center pt-2">
            <div className="p-2">
              <Avatar value={USER_DATA.nickName} />
            </div>
            <Typography as="span" size="body1">
              {USER_DATA.nickName}
            </Typography>
          </div>
          <section className="flex flex-col gap-4">
            <Typography as="h2" size="body1">
              일반
            </Typography>
            <button
              className="flex gap-2 items-center"
              onClick={() => setIsOpenSignupModal(true)}
            >
              <Icon type="signOut" size="lg" />
              <Typography size="body1">로그아웃</Typography>
            </button>
          </section>
        </main>
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
