import Link from 'next/link'

import KakaoMap from '@/components/kakao-map'

const Home = () => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <ul className="list-disc text-xl space-y-4">
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
      </ul>
      <KakaoMap />
    </main>
  )
}

export default Home
