'use client'

import { useState } from 'react'

import { setCookie } from '@/app/actions'
import type { IntroActionDispatch } from '@/app/intro/page'
import Button from '@/components/common/button'
import { notify } from '@/components/common/custom-toast'
import Input from '@/components/common/input'
import Typography from '@/components/common/typography'
import { RECENT_MAP_ID } from '@/constants/cookie'
import { api } from '@/utils/api'
import { countCharacters } from '@/utils/string'
import { MAX_MAP_NAME_LENGTH, MIN_MAP_NAME_LENGTH } from '@/constants/input'

const MapName = ({ goNextStep }: IntroActionDispatch) => {
  const [mapName, setMapName] = useState('')
  const handleChange = (value: string) => {
    setMapName(value)
  }

  const handleClick = async () => {
    try {
      const res = await api.maps.post(mapName)
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
              value={mapName}
              onChange={handleChange}
              minLength={MIN_MAP_NAME_LENGTH}
              maxLength={MAX_MAP_NAME_LENGTH}
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
          disabled={countCharacters(mapName).num < MIN_MAP_NAME_LENGTH}
          onClick={handleClick}
        >
          지도 만들기 완료
        </Button>
      </div>
    </>
  )
}

export default MapName
