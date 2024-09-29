'use client'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Avatar from '@/components/common/avatar'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import { api } from '@/utils/api'

const Profile = ({ params: { id } }: { params: { id: number } }) => {
  const router = useSafeRouter()
  const { data: userData } = useFetch(() => api.users.id.get(id))

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

      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-6 pb-5 pt-6">
          <Avatar
            value={userData?.nickname}
            imageUrl={userData?.profileImage}
            className={`h-20 w-20 text-[40px] ${!userData?.profileImage && 'border-2 border-[#17171A] border-opacity-20'}`}
          />
          <Typography size="h3">{userData?.nickname}</Typography>
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
        </section>
      </div>
    </div>
  )
}

export default Profile
