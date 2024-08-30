import { forwardRef } from 'react'

import Link from 'next/link'

import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import type { SearchPlace } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import { recentSearchStorage } from '@/utils/storage'

interface PlaceAutoSearchItemProps extends ClassName {
  place: SearchPlace
  query: string
  distance: string | null
}

const PlaceAutoSearchItem = forwardRef<HTMLLIElement, PlaceAutoSearchItemProps>(
  ({ place, distance, className, query }, ref) => {
    const nameParts = place.placeName?.split(new RegExp(`(${query})`, 'gi'))

    const addRecentKeyword = () => {
      const existRecentKeywords = [
        ...(recentSearchStorage.getValueOrNull() || []),
      ]

      const keywordIndex = existRecentKeywords.indexOf(place.placeName)
      if (keywordIndex !== -1) {
        existRecentKeywords.splice(keywordIndex, 1)
      }
      recentSearchStorage.set([place.placeName, ...existRecentKeywords])
    }

    return (
      <li ref={ref} className={cn('w-full', className)}>
        <Link
          href={`/place/${place.kakaoId}`}
          className="flex h-fit w-full gap-2.5 bg-neutral-700 pt-5"
          onClick={addRecentKeyword}
        >
          <Icon type="subtract" size="xl" className="min-w-[22px]" />
          <div className="flex w-full gap-3.5">
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="flex flex-col gap-[3px]">
                <Typography as="h2" size="h5">
                  {nameParts?.map((text) => {
                    return text === query ? (
                      <span key={`${place.kakaoId}-${text}`}>{text}</span>
                    ) : (
                      <span
                        key={`${place.kakaoId}-${text}`}
                        className="text-neutral-300"
                      >
                        {text}
                      </span>
                    )
                  })}
                </Typography>
                <Typography
                  size="body3"
                  color="neutral-300"
                  className="max-w-[272px] truncate"
                >
                  {place.address ? place.address : '장소 정보 없음'}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Typography
                as="span"
                size="body4"
                color="neutral-400"
                className="whitespace-nowrap text-right"
              >
                {place.category}
              </Typography>
              {distance && (
                <Typography
                  as="span"
                  size="body4"
                  color="neutral-400"
                  className="text-right"
                >
                  {distance}
                </Typography>
              )}
            </div>
          </div>
        </Link>
      </li>
    )
  },
)

PlaceAutoSearchItem.displayName = 'PlaceAutoSearchItem'

export default PlaceAutoSearchItem
