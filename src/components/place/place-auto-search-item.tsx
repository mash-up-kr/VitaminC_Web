import { forwardRef } from 'react'
import { Icon, Typography } from '@/components'

interface PlaceAutoSearchItemProps {
  name: string
  address: string
  review: number
  query: string
  category?: string
  distance?: string
}

const PlaceAutoSearchItem = forwardRef<
  HTMLDivElement,
  PlaceAutoSearchItemProps
>(({ name, address, review, query, category, distance }, ref) => {
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
                  <span>{text}</span>
                ) : (
                  <span className="text-neutral-300">{text}</span>
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
