import Link from 'next/link'
import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import type { AISuggestionPlace } from './type'
import ProxyImage from '@/components/common/proxy-image'

interface AIRecommendPlaceBoxProps extends ClassName {
  place: AISuggestionPlace
}

const AIRecommendPlaceBox = ({
  className,
  place,
}: AIRecommendPlaceBoxProps) => {
  return (
    <section
      className={cn(
        'flex h-full flex-col content-between rounded-[20px] bg-neutral-600 py-5',
        className,
      )}
    >
      <div className="flex-1">
        <div className="flex flex-col gap-[2px] px-5">
          <Typography size="h5" color="neutral-000">
            {place.name}
          </Typography>
          <Typography size="body3" color="neutral-200">
            {place.address}
          </Typography>
        </div>

        <ul className="flex w-full gap-2 px-4 pt-3.5">
          {place.photoList.slice(0, 3).map((src, index) => (
            <li key={index}>
              <ProxyImage
                src={src}
                className="aspect-square h-[70px] w-[70px] rounded-md object-cover"
              />
            </li>
          ))}
        </ul>

        <div className="my-3 h-[1px] w-full bg-neutral-500" />

        <div className="flex flex-col gap-1 px-5">
          <Typography
            size="h6"
            className="inline-block w-fit bg-gradient-to-r from-orange-400 to-purple-300 bg-clip-text text-transparent"
          >
            AI봇의 추천 이유
          </Typography>
          <Typography
            size="body3"
            color="neutral-000"
            className="truncate-3-lines"
          >
            {place.reason}
          </Typography>
        </div>
      </div>
      <div>
        <div className="px-5">
          <Link
            href={`/place/${place.id}`}
            className="flex w-full items-center justify-center rounded-full bg-neutral-500 py-3"
          >
            <Typography size="body1" color="neutral-000">
              맛집 상세 보기
            </Typography>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AIRecommendPlaceBox
