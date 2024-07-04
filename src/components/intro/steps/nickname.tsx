'use client'

import { useState } from 'react'
import { Button, Input, Typography } from '@/components/common'

const MIN_LENGTH = 0

const Nickname = () => {
  const [nickname, setNickname] = useState('')
  const handleChange = (value: string) => {
    setNickname(value)
  }

  return (
    <>
      <div className="flex-1 relative mt-5">
        <img src="/intro-polygon-top.png" />
        <img src="/intro-polygon-bottom.png" className="relative top-[53px]" />

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
        <Button colorScheme="orange" disabled={nickname.length < MIN_LENGTH}>
          가입완료
        </Button>
      </div>
    </>
  )
}

export default Nickname
