'use client'

import { Suspense } from 'react'

import SearchBox from './search-box'
import Spinner from '@/components/spinner'
import { useIsServer } from '@/hooks/use-is-server'

const Search = () => {
  const isServer = useIsServer()

  if (isServer) return <Spinner />

  return (
    <Suspense fallback={<Spinner />}>
      <SearchBox />
    </Suspense>
  )
}

export default Search
