import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import SearchIconChip from './search-icon-chip'

interface SearchLocationListProps extends ClassName {
  onClickLocation: (location: string) => void
}

const locations: string[] = [
  '종로',
  '강남',
  '여의도',
  '가산',
  '성수',
  '판교',
  '마곡',
  '구로 디지털단지',
  '문정',
  ' 상암',
  '세종',
]

const SearchLocationList = ({
  className,
  onClickLocation,
}: SearchLocationListProps) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <Typography size="body3" color="neutral-300">
        지역
      </Typography>

      <ul className="flex flex-wrap gap-[10px]">
        {locations.map((location) => (
          <button
            type="button"
            key={location}
            onClick={() => onClickLocation(location)}
          >
            <SearchIconChip label={location} className="px-[10px] py-2" />
          </button>
        ))}
      </ul>
    </div>
  )
}

export default SearchLocationList
