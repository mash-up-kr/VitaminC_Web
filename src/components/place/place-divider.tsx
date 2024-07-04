import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'

interface PlaceDividerProps extends ClassName {}

const PlaceDivider = ({ className }: PlaceDividerProps) => {
  return (
    <div
      className={cn('w-[calc(100%+40px)] h-[18px] bg-neutral-600', className)}
      aria-hidden
    />
  )
}

export default PlaceDivider
