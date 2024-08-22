import { useKakaoMap } from './context'

import { Icon, Typography } from '@/components/common'
import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'

interface CurrentPositionSearchButtonProps extends ClassName {
  onClick: (map: kakao.maps.Map) => void
}

const CurrentPositionSearchButton = ({
  className,
  onClick,
}: CurrentPositionSearchButtonProps) => {
  const kakaoMap = useKakaoMap()

  return (
    <button
      type="button"
      className={cn(
        'w-fit rounded-[20px] bg-neutral-800 px-5 py-[10px]',
        className,
      )}
      onClick={() => {
        if (kakaoMap.map) {
          onClick(kakaoMap.map)
        }
      }}
    >
      <div className="flex items-center justify-center gap-1">
        <Icon type="arrowClockwise" size="sm" />
        <Typography size="body3" color="orange-300">
          현 지역에서 찾기
        </Typography>
      </div>
    </button>
  )
}

export default CurrentPositionSearchButton
