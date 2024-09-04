import Link from 'next/link'

import type { PlaceProps } from './types'

import Icon from '@/components/common/icon'
import IconChip from '@/components/common/icon-chip'
import ProxyImage from '@/components/common/proxy-image'
import Typography from '@/components/common/typography'
import LikeButton from '@/components/like-button'
import PickChip from '@/components/pick-chip'
import TagList from '@/components/tag-list'
import type { TagItem } from '@/models/api/maps'
import type { ClassName } from '@/models/common'
import { categoryIcons } from '@/models/map'
import cn from '@/utils/cn'
import { roundOnePoint } from '@/utils/number'
import { getStarByScore } from '@/utils/score'

interface PlaceListItemProps extends Omit<PlaceProps, 'tags'>, ClassName {
  rating: number
  tags?: string[] | TagItem[]
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
  className,
}: PlaceListItemProps) => {
  return (
    <Link
      href={`/place/${placeId}`}
      className={cn(
        'flex w-full flex-col gap-3.5 bg-neutral-700 py-4',
        className,
      )}
      draggable="false"
    >
      {images && (
        <div className="max-x-[335px] no-scrollbar box-border flex flex-nowrap items-center gap-2 overflow-x-scroll">
          {images.map((image, index) => (
            <ProxyImage
              key={`${placeId}-${image}-${index}`}
              src={image}
              className="aspect-square w-[calc(33.4%-8px)] rounded-md object-cover"
              alt={`${name}${index}`}
            />
          ))}
        </div>
      )}

      {!pick && category && categoryIconCode && (
        <IconChip
          icon={{ type: categoryIcons[categoryIconCode] }}
          label={category}
        />
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Typography as="h2" size="h4" className="w-[194px] flex-1">
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
          {rating > 0 && (
            <div className="flex items-center gap-0.5">
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

          <Typography
            as="span"
            size="body3"
            color="neutral-300"
            className="truncate"
          >
            {address}
          </Typography>
        </div>
      </div>

      {tags && <TagList placeId={placeId} tags={tags} />}
    </Link>
  )
}

export default PlaceListItem
