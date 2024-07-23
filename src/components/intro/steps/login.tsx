import Link from 'next/link'

import { Icon, Typography } from '@/components/common'
import { Carousel } from '@/components'

import IntroImage1 from '/public/intro-lost-map.png'
import IntroImage2 from '/public/intro-find-treasure.png'
import IntroImage3 from '/public/intro-lets-go.png'

const KakaoLogin = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/kakao`}>
      <div className="flex items-center bg-[#FEE500] py-4 px-5 rounded-xl w-full">
        <Icon type="kakaoLogo" size="lg" />
        <Typography size="body2" className="text-[#191919] text-center w-full">
          카카오로 시작하기
        </Typography>
      </div>
    </Link>
  )
}

const Title = ({ body, heading }: { body: string; heading: string }) => {
  return (
    <div className="pt-12 px-5 h-[178px] text-center whitespace-pre-line">
      <Typography size="body0-2" color="neutral-000">
        {body}
      </Typography>
      <Typography size="h1" color="neutral-000">
        {heading}
      </Typography>
    </div>
  )
}

const Login = () => {
  return (
    <>
      <div className="flex-1">
        <Carousel
          objectFit="fill"
          srcList={[IntroImage1.src, IntroImage2.src, IntroImage3.src]}
          title={[
            <Title
              key="title1"
              body="보물섬으로 가는 지도를"
              heading="잃어버렸어..."
            />,
            <Title
              key="title2"
              body="맛집으로 지도를 채우면"
              heading={`보물섬으로 가는 길이\n나온다던데!`}
            />,
            <Title
              key="title3"
              body="혼자서는 못할것 같아"
              heading="함께 채워볼래?"
            />,
          ]}
        />
      </div>
      <div className="p-5 w-full">
        <KakaoLogin />
      </div>
    </>
  )
}

export default Login
