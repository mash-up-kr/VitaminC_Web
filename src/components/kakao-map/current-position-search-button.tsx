import type { ClassName } from '@/models/interface'
import { Icon, Typography } from '../common'
import cn from '@/utils/cn'

interface CurrentPositionSearchButtonProps extends ClassName {
  onClick: VoidFunction
}

const CurrentPositionSearchButton = ({
  className,
  onClick,
}: CurrentPositionSearchButtonProps) => {
  return (
    <button
      type="button"
      className={cn(
        'w-fit py-[10px] px-5 rounded-[20px] bg-neutral-800',
        className,
      )}
      onClick={onClick}
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
