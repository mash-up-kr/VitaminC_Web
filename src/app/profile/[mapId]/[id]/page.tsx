'use client'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Avatar from '@/components/common/avatar'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import type { User } from '@/models/user'
import { api } from '@/utils/api'
import TasteRate from './taste-rate'
import { useState } from 'react'
import LikedPlacePanel from './liked-place-panel'
import RegisterededPlacePanel from './registered-place-panel'
import type { MapInfo } from '@/models/map'

type PlaceFilter = 'register' | 'liked'

const Profile = ({
  params: { id, mapId },
}: {
  params: { id: User['id']; mapId: MapInfo['id'] }
}) => {
  const router = useSafeRouter()
  const { data: userData } = useFetch(() => api.users.id.get(id))
  const [type, setType] = useState<PlaceFilter>('register')

  const getIsSelected = (currentType: PlaceFilter) => type === currentType

  return (
    <div className="flex flex-col gap-6">
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
          그룹원 프로필
        </Typography>
      </header>

      <div className="flex flex-col items-center gap-[18px]">
        <div className="flex flex-col items-center gap-6">
          <Avatar
            value={userData?.nickname}
            imageUrl={userData?.profileImage}
            className={`h-20 w-20 text-[40px] ${!userData?.profileImage && 'border-2 border-[#17171A] border-opacity-20'}`}
          />
          <Typography size="h3">{userData?.nickname}</Typography>
        </div>
        <TasteRate userId={id} />
        <div className="h-[18px] w-full bg-neutral-600"></div>
      </div>
      <section className="flex flex-col px-5">
        <div role="tablist" className="flex items-center gap-4">
          <button
            role="tab"
            className={`border-b-[1px] pb-1 ${getIsSelected('register') ? 'border-neutral-000' : 'border-transparent'}`}
            id="tap-register"
            aria-controls="tappanel-register"
            aria-selected={getIsSelected('register')}
            onClick={() => setType('register')}
          >
            <Typography size="body1">맛집 등록</Typography>
          </button>
          <button
            role="tab"
            className={`border-b-[1px] pb-1 ${getIsSelected('liked') ? 'border-neutral-000' : 'border-transparent'}`}
            id="tap-liked"
            aria-controls="tappanel-liked"
            aria-selected={getIsSelected('liked')}
            onClick={() => setType('liked')}
          >
            <Typography size="body1">좋아요</Typography>
          </button>
        </div>
        {type === 'liked' ? (
          <LikedPlacePanel userId={id} mapId={mapId} />
        ) : (
          <RegisterededPlacePanel userId={id} mapId={mapId} />
        )}
      </section>
    </div>
  )
}

export default Profile
