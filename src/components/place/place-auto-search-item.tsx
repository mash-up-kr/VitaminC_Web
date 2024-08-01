import Link from 'next/link'
import { forwardRef } from 'react'

import cn from '@/utils/cn'
import { Icon, Typography } from '@/components'
import type { ClassName } from '@/models/interface'
import { recentSearchStorage } from '@/utils/storage'
import type { SearchPlace } from '@/types/api/place'

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
          className="w-full bg-neutral-700 h-fit flex pt-5 gap-2.5"
          onClick={addRecentKeyword}
        >
          <Icon type="subtract" size="xl" />
          <div className="w-full flex gap-3.5">
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-col gap-[3px] ">
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
                <Typography size="body3" color="neutral-300">
                  {place.address}
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Typography
                as="span"
                size="body4"
                color="neutral-400"
                className="text-right"
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
