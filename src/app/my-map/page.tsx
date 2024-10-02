'use client'

import { useState } from 'react'
import Link from 'next/link'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import MyMapCard from './my-map-card'
import useFetch from '@/hooks/use-fetch'
import { api } from '@/utils/api'
import Icon from '@/components/common/icon'
import Modal from '@/components/common/modal'
import Button from '@/components/common/button'

const MyMap = () => {
  const router = useSafeRouter()
  const { data: myMapList } = useFetch(api.maps.get, {
    initialData: [],
    key: ['map-list'],
  })
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
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
            내 지도
          </Typography>
        </header>

        <div className="flex flex-col gap-4 px-5 pt-5">
          {myMapList?.map((map) => <MyMapCard key={map.id} mapId={map.id} />)}
        </div>

        <div className="flex items-center justify-center gap-[10px] px-[11.5px] pb-5">
          <Link
            href="/map/create"
            className="mt-5 flex w-fit items-center justify-center gap-2 rounded-full border border-neutral-500 px-[24px] py-[12px]"
          >
            <Icon type="plus" size="md" />
            <Typography size="body1" color="neutral-000">
              새로운 지도
            </Typography>
          </Link>

          <button
            type="button"
            onClick={handleOpenModal}
            className="mt-5 flex w-fit items-center justify-center gap-2 rounded-full border border-neutral-500 px-[24px] py-[12px]"
          >
            <Icon type="search" size="md" fill="neutral-000" />
            <Typography size="body1" color="neutral-000">
              지도 둘러보기
            </Typography>
          </button>
        </div>
      </div>

      <Modal
        className="flex w-[330px] flex-col items-center rounded-4xl bg-neutral-600"
        isOpen={isOpenModal}
        onClose={handleOpenModal}
      >
        <Typography size="h2" className="py-[30px]">
          준비중이에요
        </Typography>

        <div className="flex flex-col items-center gap-7 pb-[10px] pt-6">
          <img src="/images/ship-3d.png" width="48px" height="52px" />
          <Typography size="body1" className="whitespace-pre-line text-center">
            {`맛집검색 기능은 현재 준비중이에요\n곧 업데이트 될 예정이니\n다음 업데이트를 기대해주세요!\n`}
          </Typography>
        </div>

        <div className="w-full p-5">
          <Button fullWidth colorScheme="orange" onClick={handleOpenModal}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default MyMap
