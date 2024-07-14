import { useEffect } from 'react'

import { formatDate } from '@/utils/date'

const useKakaoShare = () => {
  const shareInvite = (inviteLinkToken: string, expiredDate: Date) => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '맛집 보물을 찾는 여정에 함께 할래?',
        description: `${formatDate(expiredDate, 'ko')}까지 참여할 수 있어요`,
        imageUrl:
          'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnyKJe%2FbtsIAcoW2Ti%2FgGGexNKpoJnd4BM4CYu1uk%2Fimg.png',
        link: {
          webUrl: `${window.location.host}/invitation?link=${inviteLinkToken}`,
        },
      },
      buttons: [
        {
          link: {
            webUrl: `${window.location.host}/invitation?link=${inviteLinkToken}`,
          },
          title: '맛집지도 사용하기',
        },
      ],
    })
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY) return

    window.Kakao.cleanup()
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)
  }, [])

  return shareInvite
}

export default useKakaoShare
