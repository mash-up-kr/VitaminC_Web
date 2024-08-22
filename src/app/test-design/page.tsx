'use client'

import { useState } from 'react'

import { Input } from '@/components'
import InvitingBoardingPass from '@/components/boarding-pass/inviting-boarding-pass'
import Modal from '@/components/common/Modal/Modal'

const TestDesign = () => {
  const [input, setInput] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <>
      <div className="flex h-dvh w-dvw flex-col gap-[40px]">
        <Input value={input} onChange={(value) => setInput(value)} />

        <button type="button" onClick={() => setIsOpenModal(true)}>
          초대장 디자인
        </button>

        <a href="/test-design/map" className="text-3xl">
          MAP
        </a>
      </div>

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        dimClassName="z-[9998]"
        className="z-[9999] w-full max-w-[420px] px-5"
      >
        <InvitingBoardingPass
          inviteCode={'test'}
          expirationTime={new Date()}
          mapName={'TEST'}
          numOfCrews={3000}
          creator={{
            id: 1,
            nickname: '상민이',
          }}
        />
      </Modal>
    </>
  )
}

export default TestDesign
