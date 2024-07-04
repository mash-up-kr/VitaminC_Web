import Link from 'next/link'
import { Icon, Typography } from '@/components/common'
import { Carousel } from '@/components'

const KakaoLogin = () => {
  return (
    <Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao`}>
      <div className="flex items-center bg-[#FEE500] p-4 rounded-xl w-full">
        <Icon type="kakaoLogo" />
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
          srcList={[
            '/image-placeholder-1.png',
            '/image-placeholder-2.png',
            '/image-placeholder-3.png',
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
