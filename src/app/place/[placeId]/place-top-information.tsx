import { useState, type MouseEvent } from 'react'

import Icon from '@/components/common/icon'
import IconChip from '@/components/common/icon-chip'
import Typography from '@/components/common/typography'
import LikeButton from '@/components/like-button'
import PickChip from '@/components/pick-chip'
import type { LikeUsers, PlaceProps } from '@/components/place/types'
import TagList from '@/components/tag-list'
import type { ClassName } from '@/models/common'
import { categoryIcons } from '@/models/map'
import cn from '@/utils/cn'
import { roundOnePoint } from '@/utils/number'
import LikeToolTip from './like-tooltip'
import BottomModal from '@/components/common/bottom-modal'
import type { User } from '@/models/user'
import PlaceLikedUsers from './place-liked-users'

interface PlaceTopInformationProps extends PlaceProps, ClassName {
  rating: number
  user: User | null
  likedUsers?: LikeUsers[]
  images?: string[]
}

const PlaceTopInformation = ({
  user,
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
  likedUsers,
}: PlaceTopInformationProps) => {
  const [likeUserList, setLikeUserList] = useState<LikeUsers[]>(
    likedUsers ?? [],
  )
  const [isOpenLikeMembers, setIsOpenLikeMembers] = useState(false)

  const handleLikeOrUnLike = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    if (!user) return

    pick?.onClickLike(event)
    if (pick?.isLiked) {
      setLikeUserList((prev) =>
        [...prev].filter((likeUser) => likeUser.id !== user.id),
      )
    } else {
      setLikeUserList((prev) => [
        ...prev,
        {
          id: user.id,
          nickname: user.nickname ?? '',
          profileImage: user.profileImage ?? '',
        },
      ])
    }
  }

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
                  onClick={handleLikeOrUnLike}
                />

                <LikeToolTip
                  likeMembers={likeUserList.map(
                    (likeUser) => likeUser.nickname,
                  )}
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

            {!pick?.numOfLikes && (
              <Typography as="span" size="body3" color="neutral-300">
                {address}
              </Typography>
            )}
          </div>
          {!!pick?.numOfLikes && (
            <Typography as="span" size="body3" color="neutral-300">
              {address}
            </Typography>
          )}
        </div>

        {tags && <TagList placeId={placeId} tags={tags} />}
      </section>

      <BottomModal
        layout="none"
        isOpen={isOpenLikeMembers}
        title={`좋아요 ${pick?.numOfLikes ?? 0}`}
        body={<PlaceLikedUsers likedUsers={likeUserList} me={user} />}
        onClose={() => setIsOpenLikeMembers(false)}
        onConfirm={() => {}}
        confirmMessage=""
      />
    </>
  )
}

export default PlaceTopInformation
