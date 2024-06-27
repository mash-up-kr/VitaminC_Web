export type IntroStep = 'nickname' | 'complete' | 'map' | 'invite'

const Intro = ({
  searchParams,
}: {
  searchParams?: {
    step?: IntroStep
  }
}) => {
  const step = searchParams?.step ?? 'nickname'

  switch (step) {
    case 'nickname':
      return <>닉네임 입력</>
    case 'complete':
      return <>회원가입 완료 및 지도 생성 안내</>
    case 'map':
      return <>지도 생성</>
    case 'invite':
      return <>초대장 생성</>
    default:
      return <>잘못된 접근</>
  }
}

export default Intro
