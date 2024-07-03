'use client'

import BoardingInfoPass from '@/components/boarding-pass/boarding-info-pass'

const Home = () => {
  return (
    <main className="w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5">
      <BoardingInfoPass
        owner="주병호"
        numOfCrews={1330}
        day={19933}
        members={[
          '주병호',
          '손병호',
          '김병호',
          '이병호',
          '상병호',
          '고병호',
          '양병호',
        ]}
        numOfPins={19339}
      />
    </main>
  )
}

export default Home
