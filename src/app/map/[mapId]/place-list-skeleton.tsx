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
      <Skeleton className="rounded-full h-[26px] w-[60px]" />
      <div className="space-y-3.5 py-4">
        <ul className="max-x-[335px] no-scrollbar box-border flex flex-nowrap items-center gap-2 overflow-x-scroll">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-square w-[calc(33.4%-8px)] rounded-md object-cover"
            />
          ))}
        </ul>
        <div className="space-y-2">
          <Skeleton className="rounded-full w-[194px] h-[20px]" />
          <div className="flex gap-[7px]">
            <Skeleton className="rounded-full w-[37px] h-[14px]" />
            <Skeleton className="rounded-full w-[244px] h-[14px]" />
          </div>
        </div>
        <ul className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="rounded-full w-[60px] h-[26px]" />
          ))}
        </ul>
      </div>
    </div>
  )
})

PlaceListSkeleton.displayName = 'PlaceListSkeleton'

export default PlaceListSkeleton
