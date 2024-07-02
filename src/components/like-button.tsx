'use client'

import { forwardRef } from 'react'
import { AccessibleIconButton, Typography } from '@/components'

interface LikeButtonProps {
  like: number
  isLiked: boolean
  onClickLike: () => void
}

const LikeButton = forwardRef<HTMLDivElement, LikeButtonProps>(
  ({ isLiked, like, onClickLike }, ref) => {
    return (
      <div ref={ref} className="flex items-center gap-0.5">
        <AccessibleIconButton
          label={isLiked ? '좋아요 취소' : '좋아요'}
          onClick={onClickLike}
          icon={{
            type: 'heartStraightOutlined',
            stroke: isLiked ? 'orange-400' : 'neutral-200',
            fill: isLiked ? 'orange-400' : undefined,
            'aria-hidden': true,
            className: 'w-4 h-4',
          }}
        />
        <Typography size="body1" color="neutral-200" className="font-medium">
          {like}
        </Typography>
      </div>
    )
  },
)

LikeButton.displayName = 'LikeButton'

export default LikeButton
