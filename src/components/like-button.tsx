'use client'

import { MouseEventHandler, forwardRef } from 'react'
import { AccessibleIconButton, Typography } from '@/components'

interface LikeButtonProps {
  numOfLikes: number
  isLiked: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

const formatLike = (number: number) => {
  const K = 1000
  const M = 10000
  if (number < K) {
    return number.toString()
  } else if (number < M) {
    return (number / K).toFixed(1).replace(/\.0$/, '') + 'k'
  }

  return (number / M).toFixed(1).replace(/\.0$/, '') + 'm'
}

const LikeButton = forwardRef<HTMLDivElement, LikeButtonProps>(
  ({ isLiked, numOfLikes, onClick }, ref) => {
    return (
      <div ref={ref} className="flex items-center gap-0.5">
        <AccessibleIconButton
          label={isLiked ? '좋아요 취소' : '좋아요'}
          onClick={onClick}
          icon={{
            type: 'heartStraightOutlined',
            stroke: isLiked ? 'orange-400' : 'neutral-200',
            fill: isLiked ? 'orange-400' : undefined,
            'aria-hidden': true,
            className: 'w-4 h-4',
          }}
        />
        <Typography size="body1" color="neutral-200" className="font-medium">
          {formatLike(numOfLikes)}
        </Typography>
      </div>
    )
  },
)

LikeButton.displayName = 'LikeButton'

export default LikeButton
