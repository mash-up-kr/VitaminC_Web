'use client'

import { useState } from 'react'

import { Button, Input, Typography } from '@/components/common'
import type { IntroActionDispatch } from '@/app/intro/page'
import { api } from '@/utils/api'
import { notify } from '@/components/common/custom-toast'
import { countCharacters } from '@/utils/string'

const MIN_LENGTH = 2
const MAX_LENGTH = 6

const Nickname = ({ goNextStep }: IntroActionDispatch) => {
  const [nickname, setNickname] = useState('')
  const handleChange = (value: string) => {
    setNickname(value)
  }

  const handleClick = async () => {
    try {
      await api.users.check.nickname.get(nickname)
      await api.users.me.patch(nickname)

      goNextStep()
    } catch (err) {
      if (err instanceof Error && err.message) {
        notify.error(err.message)
      }
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
            <Input
              ref={(node) => node?.focus()}
              value={nickname}
              onChange={handleChange}
              minLength={MIN_LENGTH}
              maxLength={MAX_LENGTH}
            />
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
          disabled={countCharacters(nickname).num < MIN_LENGTH}
          onClick={handleClick}
        >
          가입완료
        </Button>
      </div>
    </>
  )
}

export default Nickname
