'use client'

import { useRef, useState } from 'react'

import { Chip } from '@/components'
import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
import { changeSpaceToHyphen, getFitContainerWidthTags } from '@/utils/tags'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import type { PlaceType } from '@/types/api/place'
import type { TagItem } from '@/types/api/maps'

interface TagListProps extends ClassName {
  placeId: PlaceType['place']['id']
  tags: TagItem[]
}

const TagList = ({ placeId, tags, className }: TagListProps) => {
  const [visibleTags, setVisibleTags] = useState(tags)
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const editTags = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth

      setVisibleTags(getFitContainerWidthTags(placeId, tags, containerWidth))
    }
    editTags()
  }, [tags])

  if (visibleTags.length === 0) return null

  return (
    <div
      ref={containerRef}
      className={cn('w-full max-w-full flex items-center gap-2', className)}
    >
      {visibleTags.map((tag) => (
        <Chip
          id={`hashtag-${placeId}-${changeSpaceToHyphen(tag.content)}`}
          className="whitespace-nowrap"
          colorScheme="neutral-600"
          key={`${placeId}-${tag.content}`}
        >{`#${tag}`}</Chip>
      ))}
    </div>
  )
}

TagList.displayName = 'TagList'

export default TagList
