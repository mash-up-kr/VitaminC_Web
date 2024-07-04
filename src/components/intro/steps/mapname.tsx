'use client'

import { useState } from 'react'
import { Button, Input, Typography } from '@/components/common'

const MIN_LENGTH = 0

const Mapname = () => {
  const [mapname, setMapname] = useState('')
  const handleChange = (value: string) => {
    setMapname(value)
  }

  return (
    <>
      <div className="flex-1 relative mt-5">
        <img src="/intro-polygon-top.png" />
        <img src="/intro-polygon-bottom.png" className="relative top-[53px]" />

        <div className="px-5 space-y-3 absolute top-[120px]">
          <Typography size="h1" color="neutral-000">
            지도 이름은
          </Typography>
          <div className="flex items-center gap-3">
            <Input value={mapname} onChange={handleChange} />
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
        <Button colorScheme="orange" disabled={mapname.length < MIN_LENGTH}>
          지도 만들기 완료
        </Button>
      </div>
    </>
  )
}

export default Mapname
