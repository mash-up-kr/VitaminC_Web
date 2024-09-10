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
import { APIError } from '@/models/api'
import EditNicknameBottomModal from './edit-nickname-bottom-modal'

const Setting = () => {
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false)
  const [isOpenEditNickname, setIsOpenEditNickname] = useState(false)
  // const { data: user } = useFetch(api.users.me.get, { key: ['user'] })
  const router = useSafeRouter()
  const [nickname, setNickname] = useState('')
  const [profileImage, setProfileImage] = useState('')

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
      } catch (error) {
        if (error instanceof APIError) {
          notify.error(error.message)
        }
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await api.users.me.get()
        setNickname(res.data.nickname ?? '')
        setProfileImage(res.data.profileImage ?? '')
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

        <div className="flex flex-col">
          <div className="pt-6 pb-5 flex flex-col items-center gap-6">
            <label className="cursor-pointer relative">
              <Avatar
                value={nickname}
                imageUrl={profileImage}
                className={`w-20 h-20 text-[40px] ${!profileImage && 'border-2 border-[#17171A] border-opacity-20'}`}
              />
              <input
                className="h-[1px] w-[1px] m-[-1px] absolute"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 flex justify-center items-center bg-neutral-700 rounded-full">
                <AccessibleIconButton
                  className="bg-neutral-500 rounded-full p-[1px]"
                  icon={{ type: 'plusBold' }}
                  label="이미지 변경"
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
          <div className="w-full h-[18px] bg-neutral-600"></div>
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
      <EditNicknameBottomModal
        isOpen={isOpenEditNickname}
        onClose={() => setIsOpenEditNickname(false)}
        onUpdateNickname={(name: string) => setNickname(name)}
      />
    </>
  )
}

export default Setting
