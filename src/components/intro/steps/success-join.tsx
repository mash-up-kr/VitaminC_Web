import { Button, Typography } from '@/components/common'

const SuccessJoin = () => {
  return (
    <>
      <div className="flex-1">
        <div className="pt-12 px-5 mb-12">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line mb-4"
          >
            {`새 지도 만들고\n항해를 시작할까요?`}
          </Typography>
        </div>

        <div className="w-full flex justify-center items-center">
          <img
            className="h-[220px] object-contain"
            src="/chunsik.png"
            alt="미정"
          />
        </div>
      </div>

      <div className="p-5 w-full">
        <Button colorScheme="orange">지도 만들기</Button>
      </div>
    </>
  )
}

export default SuccessJoin
