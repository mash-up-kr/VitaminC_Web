import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'

const Skeleton = ({ className }: ClassName) => {
  return (
    <div
      className={cn(
        'animate-wave bg-neutral-600 bg-gradient-to-r from-neutral-600 via-white/[0.04] to-neutral-600 bg-[length:48px_100%] bg-no-repeat',
        className,
      )}
    />
  )
}

export default Skeleton
