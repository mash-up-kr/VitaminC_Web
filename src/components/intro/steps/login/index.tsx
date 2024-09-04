import { IntroCarousel } from '@/components/intro/steps/login/intro-carousel'
import { KakaoLogin } from '@/components/intro/steps/login/kakao-login'

const Login = () => {
  return (
    <>
      <div className="flex-1">
        <IntroCarousel />
      </div>
      <div className="w-full p-5">
        <KakaoLogin />
      </div>
    </>
  )
}

export default Login
