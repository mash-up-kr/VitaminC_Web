import { forwardRef } from 'react'

const ResultPlacePopupSkeleton = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div
      className="w-full h-[175px] rounded-[10px] bg-neutral-700 p-5 flex flex-col gap-4 z-10 animate-pulse"
      ref={ref}
    >
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="w-[90px] h-[36px] bg-[#353538] rounded-3xl" />

          <div className="w-[160px] h-[26px] bg-[#353538] rounded-3xl" />

          <div className="mt-2 w-[240px] h-[20px] bg-[#353538] rounded-3xl" />

          <div className="mt-2 w-[180px] h-[20px] bg-[#353538] rounded-3xl" />
        </div>
      </div>

      <div className="w-20 h-20" />
    </div>
  )
})

ResultPlacePopupSkeleton.displayName = 'ResultPlacePopupSkeleton'

export default ResultPlacePopupSkeleton
