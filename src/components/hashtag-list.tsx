import { useEffect, useRef, useState } from 'react'

import { Chip } from '@/components'
import cn from '@/utils/cn'

interface HashtagListProps {
  placeId: string
  hashtags: string[]
  className?: string
}

const HashtagList = ({ placeId, hashtags, className }: HashtagListProps) => {
  const [visibleHashtags, setVisibleHashtags] = useState(hashtags)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editHashtag = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      let totalWidth = 0
      const newVisibleHashtags = hashtags.filter((tag, idx) => {
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
      setVisibleHashtags(newVisibleHashtags)
    }
    editHashtag()
  }, [hashtags])

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full max-w-[380px] flex items-center gap-2 overflow-x-scroll no-scrollbar',
        className,
      )}
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
