import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'

interface PlaceDividerProps extends ClassName {}

const PlaceDivider = ({ className }: PlaceDividerProps) => {
  return (
    <div
      className={cn('h-[18px] w-[calc(100%+40px)] bg-neutral-600', className)}
      aria-hidden
    />
  )
}

export default PlaceDivider
