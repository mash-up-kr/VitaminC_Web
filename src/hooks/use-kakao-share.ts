import { useEffect } from 'react'

import { formatDate } from '@/utils/date'
import isServer from '@/utils/is-server'

const useKakaoShare = () => {
  const formatDate = (dateTime: Date) => {
    const date = dateTime.toLocaleDateString('ko', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    const time = dateTime.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `${date} ${time}`
  }

  const shareInvite = (inviteLinkToken: string, expiredDate: Date) => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '맛집 보물을 찾는 여정에 함께 할래?',
        description: `${formatDate(expiredDate)}까지 참여할 수 있어요`,
        imageUrl:
          'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FnyKJe%2FbtsIAcoW2Ti%2FgGGexNKpoJnd4BM4CYu1uk%2Fimg.png',
        link: {
          webUrl: `${window.location.protocol}//${window.location.host}/invitation?link=${inviteLinkToken}`,
        },
      },
      buttons: [
        {
          link: {
            webUrl: `${window.location.protocol}//${window.location.host}/invitation?link=${inviteLinkToken}`,
          },
          title: '맛집지도 사용하기',
        },
      ],
    })
  }

  useEffect(() => {
    if (
      isServer() ||
      window.Kakao.isInitialized() ||
      !process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
    )
      return

    window.Kakao.cleanup()
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY)
  }, [])

  return shareInvite
}

export default useKakaoShare
