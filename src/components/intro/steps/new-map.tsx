import type { IntroActionDispatch } from '@/app/intro/page'
import Button from '@/components/common/button'
import Typography from '@/components/common/typography'

const NewMap = ({ goNextStep }: IntroActionDispatch) => {
  const handleClick = () => {
    goNextStep()
  }

  return (
    <>
      <div className="flex-1">
        <div className="px-5 py-12">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line"
          >
            {`새 지도 만들고\n항해를 시작할까요?`}
          </Typography>
        </div>

        <div className="flex min-h-[240px] w-full items-center justify-center">
          <img src="/images/intro-making-map.png" width="100%" alt="보물지도" />
        </div>
      </div>

      <div className="w-full p-5">
        <Button colorScheme="orange" onClick={handleClick}>
          지도 만들기
        </Button>
      </div>
    </>
  )
}

export default NewMap
