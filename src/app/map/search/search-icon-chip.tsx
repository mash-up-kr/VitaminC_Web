import type { IconKey } from '@/components/common/icon'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import cn from '@/utils/cn'

const SearchIconChip = ({
  label,
  iconType,
  className,
}: {
  label: string
  iconType?: IconKey
  className?: string
}) => {
  return (
    <span
      className={cn(
        'flex w-fit items-center justify-center gap-1 rounded-full bg-neutral-500 px-[10px] py-[5.5px]',
        className,
      )}
    >
      {iconType && <Icon type={iconType} size="md" />}
      <Typography size="body3" className="text-[#dcdcdc]">
        {label}
      </Typography>
    </span>
  )
}

export default SearchIconChip
