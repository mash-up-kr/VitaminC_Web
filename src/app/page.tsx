import Link from 'next/link'

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className="list-disc text-xl space-y-2">
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

export default Home
