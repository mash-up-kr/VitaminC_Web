import { forwardRef } from 'react'

const ResultPlacePopupSkeleton = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div
      className="z-10 h-[165px] w-full rounded-[10px] bg-neutral-700 p-5"
      ref={ref}
    >
      <div className="flex animate-pulse flex-col gap-3">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-3">
            <div className="h-[24px] w-[90px] rounded-md bg-[#353538]" />

            <div className="h-[20px] w-[180px] rounded-md bg-[#353538]" />

            <div className="h-[20px] w-[160px] rounded-md bg-[#353538]" />
          </div>

          <div className="h-20 w-20 rounded-md bg-[#353538]" />
        </div>

        <div className="h-[20px] w-full rounded-md bg-[#353538]" />
      </div>
    </div>
  )
})

ResultPlacePopupSkeleton.displayName = 'ResultPlacePopupSkeleton'

export default ResultPlacePopupSkeleton
