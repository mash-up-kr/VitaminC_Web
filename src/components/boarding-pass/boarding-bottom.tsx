import cn from '@/utils/cn'

interface BoardingBottomProps {
  className?: string
}

const BoardingBottom = ({ className }: BoardingBottomProps) => {
  return (
    <img
      src="/boarding-pass-bottom.png"
      className={cn('w-full max-h-[7px]', className)}
      aria-hidden
    />
  )
}

export default BoardingBottom
