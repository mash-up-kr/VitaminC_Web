'use client'

import { useState } from 'react'

import { Button, Input, Typography } from '@/components/common'
import { IntroActionDispatch } from '@/app/intro/page'
import { api } from '@/utils/api'
import { notify } from '@/components/common/custom-toast'
import { setCookie } from '@/app/actions'
import { RECENT_MAP_ID } from '@/constants/cookie'
import { countCharacters } from '@/utils/string'

const MIN_LENGTH = 2

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
      <div className="flex-1 relative mt-5">
        <img src="/images/intro-polygon-top.png" width="100%" />
        <img
          className="relative top-[53px]"
          src="/images/intro-polygon-bottom.png"
          width="100%"
        />

        <div className="px-5 space-y-3 absolute top-[120px]">
          <Typography size="h1" color="neutral-000">
            지도 이름은
          </Typography>
          <div className="flex items-center gap-3">
            <Input value={mapname} onChange={handleChange} maxLength={8} />
            <Typography size="h1" color="neutral-000">
              로
            </Typography>
          </div>
          <Typography size="h1" color="orange-400">
            시작할게요
          </Typography>
        </div>
      </div>

      <div className="p-5 w-full">
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
