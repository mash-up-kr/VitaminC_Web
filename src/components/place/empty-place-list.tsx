import type { ClassName } from '@/models/interface'
import { Typography } from '..'
import cn from '@/utils/cn'

interface EmptyPlaceListProps extends ClassName {
  message: string
}

const EmptyPlaceList = ({ className, message }: EmptyPlaceListProps) => {
  return (
    <div
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
}

export default EmptyPlaceList
