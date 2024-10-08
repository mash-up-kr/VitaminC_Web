'use client'

import { useState } from 'react'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Avatar from '@/components/common/avatar'
import BottomModal from '@/components/common/bottom-modal'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import { handleSignout } from '@/services/user'
import { api } from '@/utils/api'
import { APIError } from '@/models/api'
import EditNicknameBottomModal from './edit-nickname-bottom-modal'
import useFetch from '@/hooks/use-fetch'

const Setting = () => {
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false)
  const [isOpenEditNickname, setIsOpenEditNickname] = useState(false)
  const router = useSafeRouter()
  const [nickname, setNickname] = useState('')
  const [profileImage, setProfileImage] = useState('')

  const { revalidate } = useFetch(api.users.me.get, {
    key: ['user'],
    onLoadEnd: (data) => {
      setNickname(data.nickname ?? '')
      setProfileImage(data.profileImage ?? '')
    },
  })

  const handleCloseSignupModal = () => {
    setIsOpenSignupModal(false)
  }

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.preventDefault()

    if (e.target.files) {
      const uploadedImage = e.target.files[0]
      try {
        const res = await api.users.me.patch({ profileImage: uploadedImage })
        setProfileImage(res.data.profileImage ?? '')
        revalidate(['user'])
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
        }
      }
    }
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

        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-6 pb-5 pt-6">
            <label className="relative cursor-pointer">
              <Avatar
                value={nickname}
                imageUrl={profileImage}
                className={`h-20 w-20 text-[40px] ${!profileImage && 'border-2 border-[#17171A] border-opacity-20'}`}
              />
              <input
                className="absolute m-[-1px] hidden h-[1px] w-[1px]"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-700">
                <Icon
                  className="rounded-full bg-neutral-500 p-[1px]"
                  type="plusBold"
                />
              </div>
            </label>

            <button
              className="flex items-center gap-0.5"
              onClick={() => setIsOpenEditNickname(true)}
            >
              <Typography size="h3">{nickname}</Typography>
              <Icon type="pencil" size="lg" aria-label="이름 변경" />
            </button>
          </div>
          <div className="h-[18px] w-full bg-neutral-600"></div>
          <section className="flex flex-col px-5">
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
      {isOpenEditNickname && (
        <EditNicknameBottomModal
          isOpen={isOpenEditNickname}
          onClose={() => setIsOpenEditNickname(false)}
          onUpdateNickname={(name: string) => {
            setNickname(name)
            revalidate(['user'])
          }}
        />
      )}
    </>
  )
}

export default Setting
