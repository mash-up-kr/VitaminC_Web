import Link from 'next/link'

import { Icon, Typography } from '@/components/common'
import { Carousel } from '@/components'

import IntroImage1 from '/public/intro_lost-map.png'
import IntroImage2 from '/public/intro_find-treasure.png'
import IntroImage3 from '/public/intro_lets-go.png'

const KakaoLogin = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/kakao`}>
      <div className="flex items-center bg-[#FEE500] py-4 px-5 rounded-xl w-full">
        <Icon type="kakaoLogo" size="lg" />
        <Typography size="h5" className="text-black/[.85] text-center w-full">
          카카오 로그인
        </Typography>
      </div>
    </Link>
  )
}

const Login = () => {
  return (
    <>
      <div className="flex-1">
        <div className="pt-12 px-5 text-center">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line mb-4"
          >
            {`전설의 보물섬으로 가는\n맛집지도`}
          </Typography>
          <Typography size="body1" color="neutral-200">
            나와 함께 만들어볼래?
          </Typography>
        </div>
        <Carousel
          className="h-[220px] min-h-[220px]"
          objectFit="fill"
          srcList={[IntroImage1.src, IntroImage2.src, IntroImage3.src]}
        />
      </div>
      <div className="p-5 w-full">
        <KakaoLogin />
      </div>
    </>
  )
}

export default Login
