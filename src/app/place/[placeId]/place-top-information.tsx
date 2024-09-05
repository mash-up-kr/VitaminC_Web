import { useState } from 'react'

import Icon from '@/components/common/icon'
import IconChip from '@/components/common/icon-chip'
import Typography from '@/components/common/typography'
import LikeButton from '@/components/like-button'
import PickChip from '@/components/pick-chip'
import type { PlaceProps } from '@/components/place/types'
import TagList from '@/components/tag-list'
import type { ClassName } from '@/models/common'
import { categoryIcons } from '@/models/map'
import cn from '@/utils/cn'
import { roundOnePoint } from '@/utils/number'
import LikeToolTip from './like-tooltip'

interface PlaceTopInformationProps extends PlaceProps, ClassName {
  rating: number
  images?: string[]
}

const PlaceTopInformation = ({
  placeId,
  category,
  categoryIconCode,
  name,
  address,
  rating,
  pick,
  tags,
  distance,
  className,
}: PlaceTopInformationProps) => {
  // TODO: API 연동
  const [, setIsOpenLikeMembers] = useState(false)

  return (
    <>
      <section
        className={cn(
          'flex w-full flex-col gap-3.5 bg-neutral-700 py-4',
          className,
        )}
      >
        {category && categoryIconCode && (
          <IconChip
            icon={{ type: categoryIcons[categoryIconCode] }}
            label={category}
          />
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Typography as="h2" size="h4" className="w-[194px]">
              {name}
            </Typography>
            {pick && (
              <div className="flex items-center gap-3 relative">
                <PickChip isMyPick={pick.isMyPick} />
                <LikeButton
                  numOfLikes={pick.numOfLikes}
                  isLiked={pick.isLiked}
                  onClick={pick.onClickLike}
                />

                <LikeToolTip
                  // TODO: 연동
                  likeMembers={[]}
                  className="absolute top-[34px] right-0"
                  onClick={() => setIsOpenLikeMembers(true)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-[7px]">
            {rating > 0 && (
              <div className="flex items-center gap-0.5">
                <Icon type="starFilled" size="sm" fill="yellow-100" />
                <Typography as="span" size="h6" color="neutral-100">
                  {roundOnePoint(rating)}
                </Typography>
              </div>
            )}

            {distance && (
              <Typography as="span" size="h6" color="neutral-300">
                {distance}
              </Typography>
            )}
            <Typography as="span" size="body3" color="neutral-300">
              {address}
            </Typography>
          </div>
        </div>

        {tags && <TagList placeId={placeId} tags={tags} />}
      </section>
      {/* TODO: bottom modal */}
    </>
  )
}

export default PlaceTopInformation
