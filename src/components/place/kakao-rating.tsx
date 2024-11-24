import ExternalLink from '@/components/common/external-link'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import type { KorrkPlace } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import { roundToNthDecimal } from '@/utils/number'

interface KakaoRatingProps extends ClassName {
  rating: number
  placeId: KorrkPlace['place']['kakaoPlace']['id']
}

const MAX_STAR = 5

const getNumberOfStarIcons = (rating: number) => {
  if (rating > MAX_STAR) {
    return {
      roundedRating: MAX_STAR,
      fullIcons: MAX_STAR,
      halfIcon: 0,
      emptyIcons: 0,
    }
  }

  const roundedRating = roundToNthDecimal(rating, 3)
  const fullIcons =
    Math.floor(roundedRating) + (roundedRating % 1 >= 0.95 ? 1 : 0)
  const halfIcon = roundedRating % 1 >= 0.45 && roundedRating % 1 < 0.95 ? 1 : 0
  const emptyIcons = 5 - fullIcons - halfIcon
  return { roundedRating, fullIcons, halfIcon, emptyIcons }
}

const toKakaoMapURL = (placeId: KorrkPlace['place']['kakaoPlace']['id']) =>
  `https://place.map.kakao.com/${placeId}`

const KakaoRating = ({ className, rating, placeId }: KakaoRatingProps) => {
  const { roundedRating, fullIcons, halfIcon, emptyIcons } =
    getNumberOfStarIcons(rating)

  return (
    <div className={cn('flex w-full flex-col gap-[10px]', className)}>
      <Typography size="h5" className="text-[#D5D5D5]">
        후기
      </Typography>
      <ExternalLink url={toKakaoMapURL(placeId)}>
        <div className="flex w-full flex-1 items-center rounded-[6px] bg-neutral-600 px-5 py-[14px]">
          <div className="flex w-full">
            <img
              src="/images/kakao-map-logo.png"
              alt="카카오 지도 로고"
              className="h-6 w-6 rounded-[2px]"
            />

            <div className="ml-[14px] flex flex-1 items-center gap-3">
              <Typography size="h4" color="neutral-100">
                {roundedRating.toFixed(1)}
              </Typography>
              <div className="flex w-full flex-1 gap-[2px]">
                {[...Array(Math.floor(fullIcons))].map((_, index) => (
                  <Icon key={index} type="starFilled" />
                ))}
                {halfIcon === 1 && <Icon type="starHalfFilled" />}
                {[...Array(Math.floor(emptyIcons))].map((_, index) => (
                  <Icon key={index} type="starGrey" />
                ))}
              </div>
            </div>
          </div>

          <Icon type="hyperlink" size="xl" aria-hidden />
        </div>
      </ExternalLink>
    </div>
  )
}

export default KakaoRating
