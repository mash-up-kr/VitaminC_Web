import Icon from '@/components/common/icon'
import Skeleton from '@/components/common/skeleton'
import PlaceDivider from '@/components/place/place-divider'

const PlaceBoxSkeleton = () => {
  return (
    <div className="relative flex min-h-dvh flex-col bg-neutral-700">
      <Skeleton className="h-[200px] w-full" />

      <div className="space-y-3.5 px-5 py-4">
        <Skeleton className="h-[36px] w-[90px] rounded-full" />

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

      <PlaceDivider className="w-full" />

      <div className="space-y-4 px-5 pt-6">
        <Skeleton className="h-[16px] w-[40px] rounded-full" />
        <Skeleton className="h-[148px] w-full rounded-md" />
      </div>

      <ul className="flex flex-col divide-y divide-neutral-600 px-5">
        {[...Array(4)].map((_, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-[18px]"
          >
            <div className="space-y-2">
              <Skeleton className="h-[18px] w-[100px] rounded-full" />
              <Skeleton className="h-[14px] w-[60px] rounded-full" />
            </div>

            <Skeleton className="h-[60px] w-[60px] rounded-md" />
          </li>
        ))}
      </ul>

      <PlaceDivider className="w-full" />

      <div className="space-y-[10px] p-5">
        <Skeleton className="h-[16px] w-[40px] rounded-full" />

        <div className="flex w-full items-center justify-between space-x-[14px] rounded-md bg-neutral-600 px-5 py-[14px]">
          <img
            src="/images/kakao-map-logo.png"
            alt="카카오 지도 로고"
            className="h-6 w-6 rounded-[2px]"
          />

          <div className="flex flex-1 items-center gap-3">
            <div className="h-[18px] w-[40px] rounded-[22.5px] bg-neutral-400" />
            <div className="flex w-full gap-[2px]">
              {[...Array(5)].map((_, index) => (
                <Icon key={index} type="starGrey" />
              ))}
            </div>
          </div>

          <Icon type="hyperlink" size="xl" aria-hidden />
        </div>
      </div>
    </div>
  )
}

export default PlaceBoxSkeleton
