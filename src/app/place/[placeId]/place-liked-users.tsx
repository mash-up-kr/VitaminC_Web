import Avatar from '@/components/common/avatar'
import Typography from '@/components/common/typography'
import type { LikeUser } from '@/components/place/types'
import type { ClassName } from '@/models/common'
import type { User } from '@/models/user'
import cn from '@/utils/cn'

interface PlaceLikedUserProps extends ClassName {
  me: User | null
  likedUser: LikeUser[]
}

const PlaceLikedUser = ({ likedUser, className, me }: PlaceLikedUserProps) => {
  return (
    <ul className={cn('flex flex-col pb-6', className)}>
      {likedUser.map((user) => (
        <li key={user.id} className="flex items-center gap-2 pt-2">
          <Avatar
            value={user.nickname}
            imageUrl={user.profileImage}
            me={me ? me.id === user.id : false}
          />
          <Typography size="body1" color="neutral-100">
            {user.nickname}
          </Typography>
        </li>
      ))}
    </ul>
  )
}

export default PlaceLikedUser
