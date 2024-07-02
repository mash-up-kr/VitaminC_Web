'use client'

import { useRef } from 'react'
import { Chip } from '@/components'

interface HashtagListProps {
  hashtags: string[]
}

const HashtagList = ({ hashtags }: HashtagListProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-scroll">
      {hashtags.map((hashtag) => (
        <Chip
          className="whitespace-nowrap"
          colorScheme="neutral-600"
          key={`${hashtag}`}
        >{`#${hashtag}`}</Chip>
      ))}
    </div>
  )
}

HashtagList.displayName = 'HashtagList'

export default HashtagList
