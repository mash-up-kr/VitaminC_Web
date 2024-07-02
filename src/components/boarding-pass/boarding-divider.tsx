import cn from '@/utils/cn'

interface BoardingDividerProps {
  className?: string
}

const BoardingDivider = ({ className }: BoardingDividerProps) => {
  return (
    <img
      src="/boarding-pass-divider.png"
      className={cn('w-full max-h-[32px]', className)}
      aria-hidden
    />
  )
}

export default BoardingDivider
