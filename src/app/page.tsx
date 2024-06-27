import Link from 'next/link'

const Intro = () => {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center">
      <p className="text-black">인트로 화면</p>
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
    </main>
  )
}

export default Intro
