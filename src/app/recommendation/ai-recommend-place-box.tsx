import Link from 'next/link'
import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import type { AISuggestionPlace } from './type'
import ProxyImage from '@/components/common/proxy-image'
import Icon from '@/components/common/icon'
import { roundToNthDecimal } from '@/utils/number'

interface AIRecommendPlaceBoxProps extends ClassName {
  place: AISuggestionPlace
}

const AIRecommendPlaceBox = ({
  className,
  place,
}: AIRecommendPlaceBoxProps) => {
  const openingHours = place.openTimeList?.find(
    (openTime) => openTime.timeName === '영업시간',
  )

  return (
    <section className={cn('rounded-[20px] bg-neutral-600 py-5', className)}>
      <Typography size="h5" color="neutral-000" className="px-5">
        {place.name}
      </Typography>

      <ul className="flex min-h-[84px] w-full gap-2 px-4 pt-3.5">
        {place.photoList.slice(0, 3).map((src, index) => (
          <li key={index}>
            <ProxyImage
              src={src}
              className="aspect-square h-[70px] w-[70px] rounded-md object-cover"
            />
          </li>
        ))}
      </ul>

      <div className="my-2.5 h-[1px] w-full bg-neutral-500" />

      <div className="space-y-3.5 px-5">
        <Typography size="h6" color="neutral-300">
          식당정보
        </Typography>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon type="starFilled" size="md" fill="neutral-200" />
            <Typography size="body3" color="neutral-000">
              {place.score
                ? roundToNthDecimal(place.score, 2)
                : '별점 정보 없음'}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon type="locationPin" size="md" fill="neutral-200" />
            <Typography size="body3" color="neutral-000">
              {place.address || '주소 정보 없음'}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Icon type="clock" size="md" stroke="neutral-200" />
            <Typography size="body3" color="neutral-000">
              {openingHours
                ? `${openingHours.dayOfWeek} ${openingHours.timeSE}`
                : '영업시간 정보 없음'}
            </Typography>
          </div>
        </div>
      </div>
      <div className="px-5 pt-4">
        <Link
          href={`/place/${place.id}`}
          className="flex w-full items-center justify-center rounded-full bg-neutral-500 py-3"
        >
          <Typography size="body1" color="neutral-000">
            맛집 상세 보기
          </Typography>
        </Link>
      </div>
    </section>
  )
}

export default AIRecommendPlaceBox
