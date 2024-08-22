'use client'

import { Suspense } from 'react'

import SearchBox from './search-box'

import LoadingIndicator from '@/components/common/loading-indicator'
import { useIsServer } from '@/hooks/use-is-server'

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
