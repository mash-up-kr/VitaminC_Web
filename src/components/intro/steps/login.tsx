import Link from 'next/link'

import Carousel from '@/components/common/carousel'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'

const KakaoLogin = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_ORIGIN}/auth/kakao`}>
      <div className="flex w-full items-center justify-center rounded-full bg-[#FEE500] px-5 py-4">
        <div className="flex w-fit items-center space-x-[3px]">
          <Icon type="kakaoLogo" size="lg" />
          <Typography size="h4" className="w-full text-center text-black">
            카카오 로그인
          </Typography>
        </div>
      </div>
    </Link>
  )
}

const Title = ({ body, heading }: { body: string; heading: string }) => {
  return (
    <div className="h-[178px] whitespace-pre-line px-5 pt-12 text-center">
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
          objectFit="cover"
          items={[
            {
              src: '/images/intro-lost-map.png',
              title: (
                <Title
                  key="title1"
                  body="보물섬으로 가는 지도를"
                  heading="잃어버렸어..."
                />
              ),
            },
            {
              src: '/images/intro-find-treasure.png',
              title: (
                <Title
                  key="title2"
                  body="맛집으로 지도를 채우면"
                  heading={`보물섬으로 가는 길이\n나온다던데!`}
                />
              ),
            },
            {
              src: '/images/intro-lets-go.png',
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
      <div className="w-full p-5">
        <KakaoLogin />
      </div>
    </>
  )
}

export default Login
