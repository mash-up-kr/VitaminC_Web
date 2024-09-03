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

const ItemGenerator = ({ src, title }: { src: string; title: string }) => {
  const alt = src.split('.')[0].split('intro-')[1]

  const Title = ({ content }: { content: string }) => {
    return (
      <div className="whitespace-pre-line px-5 py-12 text-center">
        <Typography size="body0-2" color="neutral-000">
          {content}
        </Typography>
      </div>
    )
  }

  return (
    <>
      <Title content={title} />
      <img src={src} alt={alt} className="object-cover" />
    </>
  )
}

const Login = () => {
  return (
    <>
      <div className="flex-1">
        <Carousel
          items={[
            <ItemGenerator
              src="/images/intro-lost-map.gif"
              title={`보물섬으로 가는 지도를\n잃어버렸어...`}
            />,
            <ItemGenerator
              src="/images/intro-find-treasure.gif"
              title={`맛집으로 지도를 채우면\n보물섬이 나온다던데!`}
            />,
            <ItemGenerator
              src="/images/intro-lets-go.gif"
              title={`혼자서는 못할것 같아\n함께 채워볼래?`}
            />,
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
