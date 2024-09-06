'use client'

import { useState } from 'react'

import Input from '@/components/common/input'

const TestDesign = () => {
  const [input, setInput] = useState('')

  return (
    <>
      <div className="flex h-dvh w-dvw flex-col gap-[40px]">
        <Input value={input} onChange={(value) => setInput(value)} />

        <a href="/test-design/map" className="text-3xl">
          MAP
        </a>
      </div>
    </>
  )
}

export default TestDesign
