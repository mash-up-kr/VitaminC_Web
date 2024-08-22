'use client'

import { useState } from 'react'

import { setCookie } from '@/app/actions'
import type { IntroActionDispatch } from '@/app/intro/page'
import { Button, Input, Typography } from '@/components/common'
import { notify } from '@/components/common/custom-toast'
import { RECENT_MAP_ID } from '@/constants/cookie'
import { api } from '@/utils/api'
import { countCharacters } from '@/utils/string'

const MIN_LENGTH = 2
const MAX_LENGTH = 8

const Mapname = ({ goNextStep }: IntroActionDispatch) => {
  const [mapname, setMapname] = useState('')
  const handleChange = (value: string) => {
    setMapname(value)
  }

  const handleClick = async () => {
    try {
      const res = await api.maps.post(mapname)
      const mapId = res.data.id
      setCookie(RECENT_MAP_ID, mapId)

      goNextStep()
    } catch (err) {
      if (err instanceof Error && err.message) {
        return notify.error(err.message)
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
            지도 이름은
          </Typography>
          <div className="flex items-center gap-3">
            <Input
              ref={(node) => node?.focus()}
              value={mapname}
              onChange={handleChange}
              minLength={MIN_LENGTH}
              maxLength={MAX_LENGTH}
            />
            <Typography size="h1" color="neutral-000">
              로
            </Typography>
          </div>
          <Typography size="h1" color="orange-400">
            시작할게요
          </Typography>
        </div>
      </div>

      <div className="w-full p-5">
        <Button
          colorScheme="orange"
          disabled={countCharacters(mapname).num < MIN_LENGTH}
          onClick={handleClick}
        >
          지도 만들기 완료
        </Button>
      </div>
    </>
  )
}

export default Mapname
