import { forwardRef } from 'react'

const ResultPlacePopupSkeleton = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div
      className="w-full h-[165px] rounded-[10px] bg-neutral-700 p-5 z-10"
      ref={ref}
    >
      <div className="flex flex-col gap-3 animate-pulse">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-3">
            <div className="w-[90px] h-[24px] bg-[#353538] rounded-md" />

            <div className="w-[180px] h-[20px] bg-[#353538] rounded-md" />

            <div className="w-[160px] h-[20px] bg-[#353538] rounded-md" />
          </div>

          <div className="w-20 h-20 bg-[#353538] rounded-md" />
        </div>

        <div className="w-full h-[20px] bg-[#353538] rounded-md" />
      </div>
    </div>
  )
})

ResultPlacePopupSkeleton.displayName = 'ResultPlacePopupSkeleton'

export default ResultPlacePopupSkeleton
