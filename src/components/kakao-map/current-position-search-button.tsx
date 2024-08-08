import type { ClassName } from '@/models/interface'
import { Icon, Typography } from '../common'
import cn from '@/utils/cn'
import { useKakaoMap } from './context'

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
        'w-fit py-[10px] px-5 rounded-[20px] bg-neutral-800',
        className,
      )}
      onClick={() => {
        if (kakaoMap.map) {
          onClick(kakaoMap.map)
        }
      }}
    >
      <div className="flex gap-1 items-center justify-center">
        <Icon type="arrowClockwise" size="sm" />
        <Typography size="body3" color="orange-300">
          현 지역에서 찾기
        </Typography>
      </div>
    </button>
  )
}

export default CurrentPositionSearchButton
