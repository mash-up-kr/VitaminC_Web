import Link from 'next/link'
import { forwardRef } from 'react'

import cn from '@/utils/cn'
import { Icon, Typography } from '@/components'
import type { ClassName } from '@/models/interface'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import { recentSearchStorage } from '@/utils/storage'
import { extractCategory } from '@/utils/category'

interface PlaceAutoSearchItemProps
  extends Omit<KakaoPlaceItem, 'distance'>,
    ClassName {
  query: string
  distance: string | null
}

const PlaceAutoSearchItem = forwardRef<HTMLLIElement, PlaceAutoSearchItemProps>(
  (
    {
      id,
      place_name,
      distance,
      className,
      road_address_name,
      category_name,
      query,
    },
    ref,
  ) => {
    const category = extractCategory(category_name)
    const nameParts = place_name?.split(new RegExp(`(${query})`, 'gi'))

    const addRecentKeyword = () => {
      const existRecentKeywords = [
        ...(recentSearchStorage.getValueOrNull() || []),
      ]

      const keywordIndex = existRecentKeywords.indexOf(place_name)
      if (keywordIndex !== -1) {
        existRecentKeywords.splice(keywordIndex, 1)
      }
      recentSearchStorage.set([place_name, ...existRecentKeywords])
    }

    return (
      <li ref={ref} className={cn('w-full', className)}>
        <Link
          href={`/place/${id}`}
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
                      <span key={`${id}-${text}`}>{text}</span>
                    ) : (
                      <span key={`${id}-${text}`} className="text-neutral-300">
                        {text}
                      </span>
                    )
                  })}
                </Typography>
                <Typography size="body3" color="neutral-300">
                  {road_address_name}
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
                {category}
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
