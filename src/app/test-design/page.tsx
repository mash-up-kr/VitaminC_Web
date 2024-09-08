'use client'

import { useState } from 'react'

import Input from '@/components/common/input'
import LikeButton from '@/components/like-button'

const TestDesign = () => {
  const [input, setInput] = useState('')

  return (
    <>
      <div className="flex h-dvh w-dvw flex-col gap-[40px]">
        <Input value={input} onChange={(value) => setInput(value)} />

        <LikeButton
          numOfLikes={0}
          isLiked={false}
          onClick={() => console.log('click!')}
        />
        <LikeButton
          numOfLikes={3}
          isLiked={true}
          onClick={() => console.log('click!')}
        />


        <a href="/test-design/map" className="text-3xl">
          MAP
        </a>
      </div>
    </>
  )
}

export default TestDesign
