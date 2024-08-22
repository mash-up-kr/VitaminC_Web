'use client'

import Chip from '@/components/common/chip'
import type { ClassName } from '@/models/interface'
import type { TagItem } from '@/types/api/maps'
import type { PlaceType } from '@/types/api/place'
import cn from '@/utils/cn'
import { changeSpaceToHyphen } from '@/utils/tags'

interface TagListProps extends ClassName {
  placeId: PlaceType['place']['id']
  tags: TagItem[] | string[]
}

const TagList = ({ placeId, tags, className }: TagListProps) => {
  const tagNames = tags.map((tag) => (typeof tag === 'string' ? tag : tag.name))

  return (
    <div
      className={cn(
        'no-scrollbar flex w-full max-w-full items-center gap-2 overflow-x-scroll',
        className,
      )}
    >
      {tagNames.map((tag) => (
        <Chip
          id={`hashtag-${placeId}-${changeSpaceToHyphen(tag)}`}
          className="whitespace-nowrap"
          colorScheme="neutral-600"
          key={`${placeId}-${tag}`}
        >{`#${tag}`}</Chip>
      ))}
    </div>
  )
}

TagList.displayName = 'TagList'

export default TagList
