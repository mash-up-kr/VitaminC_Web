import { AccessibleIconButton, Chip, Icon } from '@/components'
import ChipButton from '@/components/common/chip-button'

import { api } from '@/utils/api'
import Link from 'next/link'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    ;(async function testAPI() {
      const res = await api.test.testGETPublicAPI()
      console.log(res)
    })()
  }, [])

  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <p className="text-black">인트로 화면</p>
      <ul className="list-disc text-xl space-y-4 text-black">
        <button
          type="button"
          className="text-black"
          onClick={async () => {
            const res = await api.test.testPOSTSecureAPI()
            console.log(res)
          }}
        >
          CLICK
        </button>
        <li>
          <Link href="/cc" className="underline hover:text-sky-400">
            Client Components Example
          </Link>
        </li>
        <li>
          <Link href="/rsc" className="underline hover:text-sky-400">
            React Server Components Example
          </Link>
        </li>
        <ChipButton rightIcon={{ type: 'heartStraight', size: 'md' }}>
          한우갈비
        </ChipButton>
        <ChipButton
          isActive
          rightIcon={{ type: 'heartStraight', size: 'md', fill: 'neutral-000' }}
        >
          한우갈비
        </ChipButton>
        <AccessibleIconButton
          icon={{ type: 'heartStraight', fill: 'green' }}
          label="어떤걸 클릭"
        />
        <Chip>Chip</Chip>
        <Icon type="heartStraight" size="md" fill="green" stroke="orange" />
      </ul>
    </main>
  )
}

export default Home
