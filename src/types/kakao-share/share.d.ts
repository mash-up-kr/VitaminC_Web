/// <reference path="index.d.ts" />

interface KakaoShareLinkType {
  // 웹 URL
  webUrl?: string
  // 모바일 웹 URL
  mobileWebUrl?: string
  // Android 앱 실행 시 전달할 파라미터
  androidExecutionParams?: string
  // iOS 앱 실행 시 전달할 파라미터
  iosExecutionParams?: string
}

interface DefaultFeedSettingProps {
  objectType: 'feed'
  content: {
    title: string
    imageUrl: string
    link: KakaoShareLinkType
    imageWidth?: number
    imageHeight?: number
    description?: string
  }
  itemContent?: {
    profileText?: string
    profileImageUrl?: string
    titleImageText?: string
    titleImageUrl?: string
    titleImageCategory?: string
    items?: { item: string; itemOp: string }[]
    sum?: string
    sumOp?: string
  }
  social?: {
    likeCount?: number
    commentCount?: number
    sharedCount?: number
    viewCount?: number
    subscriberCount?: number
  }
  buttonTitle?: string
  buttons?: { title: string; link: KakaoShareLinkType }[]
  installTalk?: boolean
}

declare namespace Kakao.Share {
  export function sendDefault(defaultFeedSetting: DefaultFeedSettingProps): void
}
