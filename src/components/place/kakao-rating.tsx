import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
import { ExternalLink, Icon, Typography } from '../common'
import { roundToNthDecimal } from '@/utils/number'

interface KakaoRatingProps extends ClassName {
  rating: number
  url: string
}

const KakaoRating = ({ className, rating, url }: KakaoRatingProps) => {
  const roundedRating = roundToNthDecimal(rating, 3)

  const fullIcons = Math.floor(roundedRating)
  const halfIcon = roundedRating % 1 >= 0.5 ? 1 : 0
  const emptyIcons = 5 - fullIcons - halfIcon

  return (
    <div
      className={cn(
        'w-full h-[124px] py-5 flex flex-col gap-[10px]',
        className,
      )}
    >
      <Typography size="h5" className="text-[#D5D5D5]">
        후기
      </Typography>
      <ExternalLink url={url}>
        <div className="w-full flex-1 rounded-[6px] bg-neutral-600 px-5 py-[14px] flex items-center">
          <div className="flex w-full">
            <img
              src="/kakao-map-logo.png"
              alt="카카오 지도 로고"
              className="w-6 h-6 rounded-[2px]"
            />

            <div className="flex flex-1 items-center ml-[14px] gap-3">
              <Typography size="h4" color="neutral-100">
                {roundedRating.toFixed(1)}
              </Typography>
              <div className="w-full flex flex-1 gap-[2px]">
                {Array(Math.floor(roundedRating)).fill(
                  <Icon type="starFilled" />,
                )}
                {halfIcon === 1 && <Icon type="starHalfFilled" />}
                {Array(emptyIcons).fill(<Icon type="starGrey" />)}
              </div>
            </div>
          </div>

          <Icon
            type="caretLeft"
            size="xl"
            stroke="neutral-000"
            className="rotate-180"
            aria-hidden
          />
        </div>
      </ExternalLink>
    </div>
  )
}

export default KakaoRating
