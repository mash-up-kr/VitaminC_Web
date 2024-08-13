import IconChip from '@/components/icon-chip'
import type { PlaceProps } from '@/components/place/types'
import { Typography, PickChip, LikeButton, TagList, Icon } from '@/components'
import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import { categoryIcons } from '@/models/map.interface'
import { roundOnePoint } from '@/utils/number'

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
  return (
    <section
      className={cn(
        'bg-neutral-700 w-full py-4 flex flex-col gap-3.5',
        className,
      )}
    >
      {category && categoryIconCode && (
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

        <div className="flex items-center gap-[7px]">
          {rating > 0 && (
            <div className="flex gap-0.5 items-center">
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
  )
}

export default PlaceTopInformation
