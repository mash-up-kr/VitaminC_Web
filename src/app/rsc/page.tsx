import { fetchData } from '@/app/actions'
import { Button } from '@/components/Button'

const Page = async () => {
  const message: string = fetchData('/api/delay')

  return (
    <>
      <h1 className="text-lg font-semibold">Data received during RSC render</h1>
      <div>{message}</div>
      <Button variant="secondary" label="아무 일도 일어나지 않는 버튼" />
    </>
  )
}

export default Page
