import Avatar from '@/components/common/avatar'
import Chip from '@/components/common/chip'
import Typography from '@/components/common/typography'
import type { MapMemberData } from '@/models/map'
import { korRole } from './constant'

const CrewInfoReadOnlyItem = ({
  member,
  isMe,
  avatarColor,
}: {
  member: MapMemberData
  avatarColor: Parameters<typeof Avatar>[0]['colorScheme']
  isMe: boolean
}) => {
  return (
    <li className="flex h-[52px] items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar
          value={member.nickname}
          imageUrl={member.profileImage}
          colorScheme={avatarColor}
          me={isMe}
        />
        <Typography size="body1" color="neutral-100">
          {member.nickname}
        </Typography>
        {member.role === 'ADMIN' && (
          <Chip size="sm" colorScheme="neutral-800" className="ml-[-2px]">
            모임장
          </Chip>
        )}
      </div>

      <Typography size="body3" color="neutral-200">
        {korRole[member.role]}
      </Typography>
    </li>
  )
}

export default CrewInfoReadOnlyItem
