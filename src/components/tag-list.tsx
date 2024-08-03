'use client'

import { Chip } from '@/components'
import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
import { changeSpaceToHyphen } from '@/utils/tags'
import type { PlaceType } from '@/types/api/place'
import type { TagItem } from '@/types/api/maps'

interface TagListProps extends ClassName {
  placeId: PlaceType['place']['id']
  tags: TagItem[] | string[]
}

const TagList = ({ placeId, tags, className }: TagListProps) => {
  return (
    <div
      className={cn(
        'w-full max-w-full flex items-center gap-2 overflow-x-scroll no-scrollbar',
        className,
      )}
    >
      {tags.map((tag) =>
        typeof tag === 'string' ? (
          <Chip
            id={`hashtag-${placeId}-${changeSpaceToHyphen(tag)}`}
            className="whitespace-nowrap"
            colorScheme="neutral-600"
            key={`${placeId}-${tag}`}
          >{`#${tag}`}</Chip>
        ) : (
          <Chip
            id={`hashtag-${placeId}-${changeSpaceToHyphen(tag.name)}`}
            className="whitespace-nowrap"
            colorScheme="neutral-600"
            key={`${placeId}-${tag.name}`}
          >{`#${tag.name}`}</Chip>
        ),
      )}
    </div>
  )
}

TagList.displayName = 'TagList'

export default TagList
