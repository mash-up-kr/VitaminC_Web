import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

const Skeleton = ({ className }: ClassName) => {
  return (
    <div
      className={cn(
        'bg-no-repeat bg-[length:48px_100%] bg-neutral-600 bg-gradient-to-r from-neutral-600 to-neutral-600 via-white/[0.04] animate-wave',
        className,
      )}
    />
  )
}

export default Skeleton
