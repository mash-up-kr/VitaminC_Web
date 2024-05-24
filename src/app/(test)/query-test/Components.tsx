'use client'

import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { APIError } from '@/app/api/error'

export function useDelayQuery({ delay }: { delay: number }) {
  return useSuspenseQuery({
    queryKey: ['delay', delay],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/api/delay?delay=${delay}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const data = await res.json()
      if (Reflect.has(data, 'ok') && Reflect.has(data, 'message')) return data

      throw new APIError({ name: 'delay-api', message: 'API Error' })
    },
  })
}

const DelayedComponent = ({ delay }: { delay: number }) => {
  const query = useDelayQuery({ delay })

  return <div>result: {query.data.message}</div>
}

export const SingleSuspenseDelays = () => {
  return [100, 200, 300, 400, 500].map((delay) => (
    <Suspense key={delay} fallback={<div>{delay} wait...</div>}>
      <DelayedComponent delay={delay} />
    </Suspense>
  ))
}

export const CombineSuspenseDelays = () => {
  return (
    <Suspense fallback={<div>Combine wait...</div>}>
      {[800, 900, 1000].map((delay) => (
        <DelayedComponent key={delay} delay={delay} />
      ))}
    </Suspense>
  )
}
