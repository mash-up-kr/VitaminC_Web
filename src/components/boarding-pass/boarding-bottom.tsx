import cn from '@/utils/cn'

interface BoardingBottomProps {
  className?: string
}

const BoardingBottom = ({ className }: BoardingBottomProps) => {
  return (
    <img
      src="/images/boarding-pass-bottom.png"
      className={cn('max-h-[7px] w-full', className)}
      aria-hidden
    />
  )
}

export default BoardingBottom
