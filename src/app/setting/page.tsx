'use client'

import { useEffect, useState } from 'react'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Avatar from '@/components/common/avatar'
import BottomModal from '@/components/common/bottom-modal'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import { handleSignout } from '@/services/user'
import { api } from '@/utils/api'

const Setting = () => {
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false)
  // const { data: user } = useFetch(api.users.me.get, { key: ['user'] })
  const router = useSafeRouter()
  const [nickname, setNickname] = useState('')

  const handleCloseSignupModal = () => {
    setIsOpenSignupModal(false)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api.users.me.get()
        setNickname(res.data.nickname ?? '')
      } catch (error) {
        notify.error('데이터를 받아오는 데 문제가 생겼습니다.')
      }
    })()
  }, [])

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
            <Avatar value={nickname ?? ''} />
            <Typography as="span" size="body1">
              {nickname}
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
