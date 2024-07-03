import { ChipButton, Typography } from '@/components'

interface RecentKeywordsProps {
  recentKeywords: string[]
  onDeleteKeyword: (index: number) => void
}

const RecentKeywords = ({
  recentKeywords,
  onDeleteKeyword,
}: RecentKeywordsProps) => {
  return (
    <div className="mt-3 flex flex-col gap-3">
      <Typography size="h6" color="neutral-300">
        최근 검색어
      </Typography>

      <ul className="flex flex-wrap gap-x-[10px] gap-y-5">
        {recentKeywords.map((keyword, index) => (
          <ChipButton
            key={keyword}
            rightIcon={{ type: 'close' }}
            onClick={() => onDeleteKeyword(index)}
          >
            {keyword}
          </ChipButton>
        ))}
      </ul>
    </div>
  )
}

export default RecentKeywords
