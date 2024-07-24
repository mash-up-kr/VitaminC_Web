import { Button, Typography } from '@/components/common'
import { IntroActionDispatch } from '@/app/intro/page'

const NewMap = ({ goNextStep }: IntroActionDispatch) => {
  const handleClick = () => {
    goNextStep()
  }

  return (
    <>
      <div className="flex-1">
        <div className="pt-12 px-5 mb-[54px]">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line"
          >
            {`새 지도 만들고\n항해를 시작할까요?`}
          </Typography>
        </div>

        <div className="w-full flex justify-center items-center">
          <img src="/intro-making-map.png" width="100%" alt="보물지도" />
        </div>
      </div>

      <div className="p-5 w-full">
        <Button colorScheme="orange" onClick={handleClick}>
          지도 만들기
        </Button>
      </div>
    </>
  )
}

export default NewMap
