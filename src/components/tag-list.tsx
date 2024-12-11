'use client'

import Chip from '@/components/common/chip'
import type { TagItem } from '@/models/api/maps'
import type { KorrkPlace } from '@/models/api/place'
import type { ClassName } from '@/models/common'
import cn from '@/utils/cn'
import { changeSpaceToHyphen } from '@/utils/tags'

interface TagListProps extends ClassName {
  placeId: KorrkPlace['place']['id']
  tags: TagItem[] | string[]
  tagColorScheme?:
    | 'neutral-400'
    | 'neutral-500'
    | 'neutral-600'
    | 'neutral-800'
    | 'orange'
    | 'purple'
}

const TagList = ({
  placeId,
  tags,
  className,
  tagColorScheme,
}: TagListProps) => {
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
          className={
            tagColorScheme
              ? 'whitespace-nowrap text-neutral-100'
              : 'whitespace-nowrap'
          }
          colorScheme={tagColorScheme ? tagColorScheme : 'neutral-600'}
          key={`${placeId}-${tag}`}
        >{`#${tag}`}</Chip>
      ))}
    </div>
  )
}

TagList.displayName = 'TagList'

export default TagList
