import Avatar from '@/components/common/avatar'
import Typography from '@/components/common/typography'
import type { LikeUsers } from '@/components/place/types'
import type { ClassName } from '@/models/common'
import type { User } from '@/models/user'
import cn from '@/utils/cn'

interface PlaceLikedUsersProps extends ClassName {
  me: User | null
  likedUsers: LikeUsers[]
}

const PlaceLikedUsers = ({
  likedUsers,
  className,
  me,
}: PlaceLikedUsersProps) => {
  return (
    <ul className={cn('flex flex-col pt-6', className)}>
      {likedUsers.map((user) => (
        <li key={user.id} className="px-5 pt-2 flex items-center gap-2">
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

export default PlaceLikedUsers
