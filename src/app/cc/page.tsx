'use client'

import React, { Suspense, use } from 'react'

import { fetchData } from '@/app/data'
import { Button } from '@/components/Button'
import LoadingIndicator from '@/components/loading-indicator'
import { ResponseOk } from '@/models/interface'

const Message = () => {
  const data: ResponseOk = use(fetchData('/api/delay'))

  return <div>{data?.message}</div>
}

const Page = () => {
  return (
    <>
      <h1 className="text-lg font-semibold">Data received during SSR</h1>
      <Suspense fallback={<LoadingIndicator />}>
        <Message />
      </Suspense>
      <Button
        label="클릭"
        className="bg-sky-400"
        onClick={() => alert('ok!')}
      />
    </>
  )
}

export default Page
