'use client'

import { useState } from 'react'

import type { IntroActionDispatch } from '@/app/intro/page'
import Button from '@/components/common/button'
import { notify } from '@/components/common/custom-toast'
import Input from '@/components/common/input'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import { api } from '@/utils/api'
import { onboardingStorage } from '@/utils/storage'
import { countCharacters } from '@/utils/string'

const MIN_LENGTH = 2
const MAX_LENGTH = 6

const Nickname = ({ goNextStep }: IntroActionDispatch) => {
  const { revalidate } = useFetch()

  const [nickname, setNickname] = useState('')
  const handleChange = (value: string) => {
    setNickname(value)
  }

  onboardingStorage.set('true')

  const handleClick = async () => {
    try {
      await api.users.check.nickname.get(nickname)
      await api.users.me.patch(nickname)

      revalidate('user')

      goNextStep()
    } catch (err) {
      if (err instanceof Error && err.message) {
        notify.error(err.message)
      }
    }
  }

  return (
    <>
      <div className="relative mt-5 flex-1">
        <img src="/images/intro-polygon-top.png" width="100%" />
        <img
          className="relative top-[53px]"
          src="/images/intro-polygon-bottom.png"
          width="100%"
        />

        <div className="absolute top-[120px] space-y-3 px-5">
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

      <div className="w-full p-5">
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
