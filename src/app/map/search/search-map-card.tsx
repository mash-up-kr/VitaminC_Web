import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import cn from '@/utils/cn'
import SearchIconChip from './search-icon-chip'

interface SearchMapCardProps extends ClassName {
  map: Pick<MapInfo, 'id' | 'name' | 'description'> & {
    numOfCrews: number
    numOfPins: number
    categories?: string[]
  }
}

const SearchMapCard = ({ map, className }: SearchMapCardProps) => {
  return (
    <li
      className={cn(
        'flex w-full flex-col gap-2 rounded-[20px] bg-neutral-600 p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Typography size="h3">{map.name}</Typography>
        {map.categories && (
          <div className="flex items-center justify-center gap-2">
            {map.categories.map((category) => (
              <SearchIconChip key={category} label={category} />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-[2px]">
          <Icon type="person" size="md" />
          <Typography size="body3" color="neutral-300">
            Crew
          </Typography>
          <Typography size="body3" color="neutral-100">
            {map.numOfCrews.toLocaleString()}
          </Typography>
        </div>

        <div className="flex items-center gap-[2px]">
          <Icon type="pin" size="md" />
          <Typography size="body3" color="neutral-300">
            Pins
          </Typography>
          <Typography size="body3" color="neutral-100">
            {map.numOfPins.toLocaleString()}
          </Typography>
        </div>
      </div>

      <Typography size="body2" color="neutral-200">
        {map.description}
      </Typography>
    </li>
  )
}

export default SearchMapCard
