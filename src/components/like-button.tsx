'use client'

import { forwardRef } from 'react'
import type { MouseEventHandler } from 'react'

import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import cn from '@/utils/cn'

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

const LikeButton = forwardRef<HTMLButtonElement, LikeButtonProps>(
  ({ isLiked, numOfLikes, onClick }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex items-center gap-0.5 px-2.5 py-1 rounded-full w-fit relative',
          isLiked
            ? 'shadow-orange-400 shadow-[inset_0_0_0_1px]'
            : 'bg-neutral-500',
        )}
        onClick={onClick}
        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
      >
        <Icon
          type="heartStraightOutlined"
          stroke={isLiked ? 'orange-400' : 'neutral-100'}
          fill={isLiked ? 'orange-400' : 'neutral-100'}
          aria-hidden
          size="md"
        />
        <Typography
          size="h7"
          color="neutral-200"
          className="min-w-[10px] text-center font-medium"
        >
          {formatLike(numOfLikes)}
        </Typography>
      </button>
    )
  },
)

LikeButton.displayName = 'LikeButton'

export default LikeButton
