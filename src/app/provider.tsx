'use client'

import type { ReactNode } from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import { APIError } from './api/error'

interface ProvidersProps {
  children: ReactNode
}

function queryClientFactory() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        // TODO. error 에 따른 처리
        if (error instanceof APIError) {
          // console.error('API Error', error.message)
        } else {
          // console.error('UnExpected Error', error.message)
        }
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    return queryClientFactory()
  }
  if (!browserQueryClient) browserQueryClient = queryClientFactory()
  return browserQueryClient
}

const Providers = ({ children }: ProvidersProps) => {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}

export default Providers
