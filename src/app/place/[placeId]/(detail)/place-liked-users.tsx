import Avatar from '@/components/common/avatar'
import Typography from '@/components/common/typography'
import type { LikeUser } from '@/components/place/types'
import type { ClassName } from '@/models/common'
import type { User } from '@/models/user'
import { getMapId } from '@/services/map-id'
import { getColorForName } from '@/utils/avatar-color'
import cn from '@/utils/cn'
import { useRouter } from 'next/navigation'

interface PlaceLikedUserProps extends ClassName {
  me: User | null
  likedUser: LikeUser[]
}

const PlaceLikedUser = ({ likedUser, className, me }: PlaceLikedUserProps) => {
  const router = useRouter()

  const handleMoveProfile = async (userId: User['id']) => {
    const mapId = await getMapId()
    if (!mapId) return
    router.push(`/profile/${mapId}/${userId}`)
  }

  return (
    <ul className={cn('flex flex-col pb-6', className)}>
      {likedUser.map((user) => (
        <li
          key={user.id}
          className="flex items-center gap-2 pt-2"
          onClick={() => handleMoveProfile(user.id)}
        >
          <Avatar
            value={user.nickname}
            imageUrl={user.profileImage}
            colorScheme={getColorForName(user.nickname)}
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
