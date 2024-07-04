import { forwardRef } from 'react'
import { Icon, Typography } from '@/components'
import { PlaceProps } from './types'

interface PlaceAutoSearchItemProps extends PlaceProps {
  review: number
  query: string
}

const PlaceAutoSearchItem = forwardRef<
  HTMLDivElement,
  PlaceAutoSearchItemProps
>(({ placeId, name, address, review, query, category, distance }, ref) => {
  const nameParts = name.split(new RegExp(`(${query})`, 'gi'))

  return (
    <section
      ref={ref}
      className="bg-neutral-700 p-5 pb-3 border-b-[1px] border-b-neutral-600 flex gap-2.5"
    >
      <Icon type="subtract" size="lg" />
      <div className="flex gap-3.5">
        <div className="flex flex-col gap-1.5 w-[230px]">
          <div className="flex flex-col gap-[3px] ">
            <Typography as="h2" size="h5">
              {nameParts.map((text) => {
                return text === query ? (
                  <span key={`${placeId}-${text}`}>{text}</span>
                ) : (
                  <span key={`${placeId}-${text}`} className="text-neutral-300">
                    {text}
                  </span>
                )
              })}
            </Typography>
            <Typography size="body3" color="neutral-300">
              {address}
            </Typography>
          </div>

          <p className="flex items-center gap-1">
            <Typography as="span" size="body4" color="neutral-500">
              리뷰
            </Typography>
            <Typography as="span" size="body4" color="neutral-200">
              {review}
            </Typography>
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Typography as="span" size="body4" color="neutral-400">
            {category}
          </Typography>
          <Typography as="span" size="body4" color="neutral-400">
            {distance}
          </Typography>
        </div>
      </div>
    </section>
  )
})

PlaceAutoSearchItem.displayName = 'PlaceAutoSearchItem'

export default PlaceAutoSearchItem
