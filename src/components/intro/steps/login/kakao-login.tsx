import Link from 'next/link'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'

export const KakaoLogin = () => {
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
