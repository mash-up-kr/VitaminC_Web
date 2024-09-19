import { forwardRef } from 'react'

import Skeleton from '@/components/common/skeleton'

const PlacePopupSkeleton = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div
      className="z-10 h-[165px] w-full rounded-[10px] bg-neutral-700 p-5"
      ref={ref}
    >
      <div className="flex flex-col gap-4">
        <div className="flex w-full justify-between">
          <div className="space-y-1">
            <div className="flex flex-col gap-[7px] pt-[3px] pb-[10px]">
              <Skeleton className="h-[20px] w-[140px] rounded-full" />

              <div className="flex gap-[7px]">
                <Skeleton className="h-[14px] w-[37px] rounded-full" />
                <Skeleton className="h-[14px] w-[120px] rounded-full" />
              </div>
            </div>

            <Skeleton className="h-[20px] w-[60px] rounded-full mb-[2px]" />
          </div>

          <Skeleton className="h-20 w-20 rounded-md" />
        </div>

        <ul className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-[26px] w-[60px] rounded-full " />
          ))}
        </ul>
      </div>
    </div>
  )
})

PlacePopupSkeleton.displayName = 'PlacePopupSkeleton'

export default PlacePopupSkeleton
