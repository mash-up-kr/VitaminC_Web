import Login from '@/components/intro/steps/login'
import Nickname from '@/components/intro/steps/nickname'
import SuccessJoin from '@/components/intro/steps/success-join'
import Mapname from '@/components/intro/steps/mapname'
import Invite from '@/components/intro/steps/invite'
import Header from '@/components/intro/header'

const INTRO_STEP = {
  Login: 'login',
  Nickname: 'nickname',
  Complete: 'complete',
  Mapname: 'mapname',
  Invite: 'invite',
} as const
type IntroStep = (typeof INTRO_STEP)[keyof typeof INTRO_STEP]

const Step = ({ step }: { step: IntroStep }) => {
  switch (step) {
    case INTRO_STEP.Login:
      return <Login />
    case INTRO_STEP.Nickname:
      return <Nickname />
    case INTRO_STEP.Complete:
      return <SuccessJoin />
    case INTRO_STEP.Mapname:
      return <Mapname />
    case INTRO_STEP.Invite:
      return <Invite />
    default:
      return <>잘못된 접근</>
  }
}

const Intro = () => {
  // TODO: state management
  const step = 'login'

  return (
    <div className="bg-neutral-700 h-dvh w-full flex flex-col justify-between">
      <Header />
      <Step step={step} />
    </div>
  )
}

export default Intro
