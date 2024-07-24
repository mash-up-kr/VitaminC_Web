import Link from 'next/link'

import { Icon, Typography } from '@/components/common'
import { Carousel } from '@/components'

const KakaoLogin = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/kakao`}>
      <div className="bg-[#FEE500] w-full py-4 px-5 rounded-full flex items-center justify-center">
        <div className="flex items-center w-fit space-x-[3px]">
          <Icon type="kakaoLogo" size="lg" />
          <Typography size="h4" className="text-black text-center w-full">
            카카오 로그인
          </Typography>
        </div>
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
          items={[
            {
              src: '/intro-lost-map.png',
              title: (
                <Title
                  key="title1"
                  body="보물섬으로 가는 지도를"
                  heading="잃어버렸어..."
                />
              ),
            },
            {
              src: '/intro-find-treasure.png',
              title: (
                <Title
                  key="title2"
                  body="맛집으로 지도를 채우면"
                  heading={`보물섬으로 가는 길이\n나온다던데!`}
                />
              ),
            },
            {
              src: '/intro-lets-go.png',
              title: (
                <Title
                  key="title3"
                  body="혼자서는 못할것 같아"
                  heading="함께 채워볼래?"
                />
              ),
            },
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
