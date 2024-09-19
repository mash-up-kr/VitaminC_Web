import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import { forwardRef, type RefObject } from 'react'

interface EmptyPlaceListProps extends ClassName {
  message: string
}

const EmptyPlaceList = forwardRef<HTMLElement, EmptyPlaceListProps>(
  ({ className, message }, ref) => {
    return (
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className={cn(
          'flex flex-col items-center justify-center gap-3 pb-32 pt-6',
          className,
        )}
      >
        <img src="/images/ship-3d.png" aria-hidden className="w-13 h-12" />
        <Typography
          size="body4"
          color="neutral-200"
          className="whitespace-break-spaces text-center"
        >
          {message}
        </Typography>
      </div>
    )
  },
)

EmptyPlaceList.displayName = 'EmptyPlaceList'

export default EmptyPlaceList
