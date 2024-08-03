import Link from 'next/link'

import { Typography, PickChip, LikeButton, TagList, Icon } from '@/components'
import type { PlaceProps } from './types'
import IconChip from '../icon-chip'
import { getStarByScore } from '@/utils/score'
import { categoryIcons } from '@/models/map.interface'
import { roundOnePoint } from '@/utils/number'

interface PlaceListItemProps extends PlaceProps {
  rating: number
  images?: string[]
}

const PlaceListItem = ({
  placeId,
  categoryIconCode,
  category,
  name,
  address,
  rating,
  distance,
  images,
  pick,
  tags,
}: PlaceListItemProps) => {
  return (
    <Link
      href={`/place/${placeId}`}
      className="bg-neutral-700 w-full py-4 flex flex-col gap-3.5 "
    >
      {images && (
        <div className="flex flex-nowrap box-border gap-2 max-x-[335px] items-center overflow-x-scroll no-scrollbar">
          {images.map((image, idx) => (
            <img
              key={`${placeId}-${image}-${idx}`}
              src={image || '/images/image-placeholder.png'}
              className="w-[calc(33.4%-8px)] aspect-square rounded-md object-cover"
              alt={`${name}${idx}`}
            />
          ))}
        </div>
      )}

      {category && (
        <IconChip
          icon={{ type: categoryIcons[categoryIconCode] }}
          label={category}
        />
      )}

      <div className="flex flex-col gap-2 ">
        <div className="flex items-center justify-between">
          <Typography as="h2" size="h4" className="w-[194px]">
            {name}
          </Typography>
          {pick && (
            <div className="flex items-center gap-3">
              <PickChip isMyPick={pick.isMyPick} />
              <LikeButton
                numOfLikes={pick.numOfLikes}
                isLiked={pick.isLiked}
                onClick={pick.onClickLike}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {rating && (
            <div className="flex gap-0.5 items-center">
              <Icon type={getStarByScore(rating)} size="sm" fill="yellow-100" />
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
    </Link>
  )
}

export default PlaceListItem
