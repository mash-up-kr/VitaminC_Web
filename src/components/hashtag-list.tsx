import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Chip } from '@/components'
import cn from '@/utils/cn'
import { ClassName } from '@/models/interface'

interface HashtagListProps extends ClassName {
  placeId: string
  hashtags: string[]
}

const HashtagList = ({ placeId, hashtags, className }: HashtagListProps) => {
  const [visibleHashtags, setVisibleHashtags] = useState(hashtags)
  const containerRef = useRef<HTMLDivElement>(null)

  const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' ? useLayoutEffect : useEffect

  const getFitContainerWidthHashtag = (
    hashtags: string[],
    containerWidth: number,
  ) => {
    let totalWidth = 0
    const filteredVisibleHashtags = hashtags.filter((tag) => {
      const chip = document.querySelector<HTMLElement>(
        `#${placeId}-hashtag-${tag}`,
      )

      if (chip === null) return false

      const chipWidth = chip.offsetWidth + 4
      totalWidth += chipWidth

      if (totalWidth < containerWidth) {
        return true
      }
      return false
    })

    return filteredVisibleHashtags
  }

  useIsomorphicLayoutEffect(() => {
    const editHashtag = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth

      setVisibleHashtags(getFitContainerWidthHashtag(hashtags, containerWidth))
    }
    editHashtag()
  }, [hashtags])

  return (
    <div
      ref={containerRef}
      className={cn('w-full max-w-[380px] flex items-center gap-2', className)}
    >
      {visibleHashtags.map((hashtag) => (
        <Chip
          id={`${placeId}-hashtag-${hashtag}`}
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
