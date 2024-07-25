'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button, Input, Typography } from '@/components/common'
import type { IntroActionDispatch } from '@/app/intro/page'
import { inviteCodeStorage } from '@/utils/storage'
import { setCookie } from '@/app/actions'
import { RECENT_MAP_ID } from '@/constants/cookie'
import { api } from '@/utils/api'
import { APIError } from '@/models/interface'
import { notify } from '@/components/common/custom-toast'

const MIN_LENGTH = 0

const Nickname = ({ goNextStep }: IntroActionDispatch) => {
  const router = useRouter()

  const [nickname, setNickname] = useState('')
  const handleChange = (value: string) => {
    setNickname(value)
  }

  const handleClick = async () => {
    try {
      await api.users.check.nickname.get(nickname)
      await api.users.me.patch(nickname)
    } catch (err) {
      if (err instanceof Error && err.message) {
        return notify.error(err.message)
      }
    }

    const inviteCode = inviteCodeStorage.getValueOrNull()
    if (inviteCode) {
      try {
        const res = await api.maps.inviteLinks.get(inviteCode)
        const data = res.data
        const mapId = data.map.id
        setCookie(RECENT_MAP_ID, mapId)
        router.push(`/map/${mapId}`)
      } catch (err) {
        if (err instanceof APIError && err.message) {
          return notify.error(err.message)
        }
      }
    } else {
      goNextStep()
    }
  }

  return (
    <>
      <div className="flex-1 relative mt-5">
        <img src="/images/intro-polygon-top.png" width="100%" />
        <img
          className="relative top-[53px]"
          src="/images/intro-polygon-bottom.png"
          width="100%"
        />

        <div className="px-5 space-y-3 absolute top-[120px]">
          <Typography size="h1" color="neutral-000">
            저는 닉네임
          </Typography>
          <div className="flex items-center gap-3">
            <Input value={nickname} onChange={handleChange} />
            <Typography size="h1" color="neutral-000">
              로
            </Typography>
          </div>
          <Typography size="h1" color="orange-400">
            불러주세요
          </Typography>
        </div>
      </div>

      <div className="p-5 w-full">
        <Button
          colorScheme="orange"
          disabled={nickname.length < MIN_LENGTH}
          onClick={handleClick}
        >
          가입완료
        </Button>
      </div>
    </>
  )
}

export default Nickname
