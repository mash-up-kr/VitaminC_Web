import cn from '@/utils/cn'

interface BoardingDividerProps {
  className?: string
}

const BoardingDivider = ({ className }: BoardingDividerProps) => {
  return (
    <img
      src="/images/boarding-pass-divider.png"
      className={cn('my-[-0.5px] max-h-[32px] w-full', className)}
      aria-hidden
    />
  )
}

export default BoardingDivider
