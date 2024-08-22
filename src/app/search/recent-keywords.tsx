import type { MouseEvent } from 'react'

import ChipButton from '@/components/common/chip-button'
import Typography from '@/components/common/typography'

interface RecentKeywordsProps {
  recentKeywords: string[]
  onSearchKeyword: (keyword: string) => void
  onDeleteKeyword: (index: number) => void
}

const RecentKeywords = ({
  recentKeywords,
  onSearchKeyword,
  onDeleteKeyword,
}: RecentKeywordsProps) => {
  const handleClickResetIcon = (e: MouseEvent<HTMLElement>, index: number) => {
    e.stopPropagation()
    onDeleteKeyword(index)
  }

  return (
    <div className="mt-3 flex flex-col gap-3">
      <Typography size="h6" color="neutral-300">
        최근 검색어
      </Typography>

      <ul className="flex flex-wrap gap-x-[10px] gap-y-5">
        {recentKeywords.map((keyword, index) => (
          <ChipButton
            key={keyword}
            rightIcon={{
              type: 'close',
              onClick: (e) => handleClickResetIcon(e, index),
              'aria-label': `${keyword} 기록 제거`,
            }}
            onClick={() => onSearchKeyword(keyword)}
          >
            {keyword}
          </ChipButton>
        ))}
      </ul>
    </div>
  )
}

export default RecentKeywords
