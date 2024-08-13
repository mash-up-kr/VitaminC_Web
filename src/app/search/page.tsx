'use client'

import { Suspense } from 'react'

import SearchBox from './search-box'
import { useIsServer } from '@/hooks/use-is-server'
import LoadingIndicator from '@/components/loading-indicator'

const Search = () => {
  const isServer = useIsServer()

  if (isServer) return <LoadingIndicator />

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <SearchBox />
    </Suspense>
  )
}

export default Search
