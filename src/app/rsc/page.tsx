import { Suspense } from 'react'

import { fetchData } from '@/app/data'
import LoadingIndicator from '@/components/loading-indicator'
import { ResponseOk } from '@/models/interface'

const Page = async () => {
  const data: ResponseOk = await fetchData('/api/delay')
  const message: string = data.message

  return (
    <>
      <h1 className="text-lg font-semibold">Data received during RSC render</h1>
      <Suspense fallback={<LoadingIndicator />}>
        <div>{message}</div>
      </Suspense>
    </>
  )
}

export default Page
