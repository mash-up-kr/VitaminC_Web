import { forwardRef } from 'react'
import Skeleton from '@/components/common/skeleton'

const PlaceListSkeleton = forwardRef<HTMLElement[]>(({}, ref) => {
  return (
    <div
      ref={(element) => {
        if (typeof ref !== 'function' && ref?.current) {
          ref.current[0] = element as HTMLDivElement
        }
      }}
      className="px-5"
    >
      <Skeleton className="h-[26px] w-[60px] rounded-full" />

      <div className="space-y-3.5 py-4">
        <ul className="max-x-[335px] no-scrollbar box-border flex flex-nowrap items-center gap-2 overflow-x-scroll">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-square w-[calc(33.4%-8px)] rounded-md object-cover"
            />
          ))}
        </ul>

        <div>
          <Skeleton className="my-[3px] h-[20px] w-[194px] rounded-full" />

          <div className="flex gap-[7px] py-1.5">
            <Skeleton className="h-[14px] w-[37px] rounded-full" />
            <Skeleton className="h-[14px] w-[244px] rounded-full" />
          </div>
        </div>

        <ul className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-[26px] w-[60px] rounded-full" />
          ))}
        </ul>
      </div>
    </div>
  )
})

PlaceListSkeleton.displayName = 'PlaceListSkeleton'

export default PlaceListSkeleton
