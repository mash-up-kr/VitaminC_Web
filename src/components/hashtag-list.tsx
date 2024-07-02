import { Chip } from '@/components'
import cn from '@/utils/cn'

interface HashtagListProps {
  hashtags: string[]
  className?: string
}

const HashtagList = ({ hashtags, className }: HashtagListProps) => {
  return (
    <div className={cn('flex items-center gap-2 overflow-x-scroll', className)}>
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
