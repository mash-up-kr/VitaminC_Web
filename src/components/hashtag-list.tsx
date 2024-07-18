import { useRef, useState } from 'react'

import { Chip } from '@/components'
import cn from '@/utils/cn'
import { ClassName } from '@/models/interface'
import {
  changeSpaceToHyphen,
  getFitContainerWidthHashtag,
} from '@/utils/hashtag'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import { PlaceType } from '@/types/api/place'

interface HashtagListProps extends ClassName {
  placeId: PlaceType['place']['id']
  hashtags: string[]
}

const HashtagList = ({ placeId, hashtags, className }: HashtagListProps) => {
  const [visibleHashtags, setVisibleHashtags] = useState(hashtags)
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const editHashtag = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth

      setVisibleHashtags(
        getFitContainerWidthHashtag(placeId, hashtags, containerWidth),
      )
    }
    editHashtag()
  }, [hashtags])

  return (
    <div
      ref={containerRef}
      className={cn('w-full max-w-full flex items-center gap-2', className)}
    >
      {visibleHashtags.map((hashtag) => (
        <Chip
          id={`hashtag-${placeId}-${changeSpaceToHyphen(hashtag)}`}
          className="whitespace-nowrap"
          colorScheme="neutral-600"
          key={`${placeId}-${hashtag}`}
        >{`#${hashtag}`}</Chip>
      ))}
    </div>
  )
}

HashtagList.displayName = 'HashtagList'

export default HashtagList
