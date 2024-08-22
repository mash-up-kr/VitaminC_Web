import type { BoardingMembersProps } from './types'

import Avatar from '@/components/common/avatar'
import Chip from '@/components/common/chip'
import Typography from '@/components/common/typography'

const memberColors = [
  'coral',
  'dark-blue',
  'sky-blue',
  'violet',
  'green',
] as const

const BoardingMembers = ({
  creator,
  members,
  userId,
}: BoardingMembersProps) => {
  return (
    <ul className="no-scrollbar max-h-[268px] w-full overflow-y-scroll bg-neutral-600">
      {members.map((member, index) => (
        <li key={member.id} className="flex h-[52px] items-center px-4">
          <Avatar
            me={member.id === userId}
            value={member.nickname}
            colorScheme={memberColors[index % memberColors.length]}
          />
          <Typography
            as="span"
            size="body1"
            color="neutral-100"
            className="ml-2"
          >
            {member.nickname}
          </Typography>
          {creator.id === member.id && (
            <Chip size="sm" colorScheme="neutral-800" className="ml-[6px]">
              주인장
            </Chip>
          )}
        </li>
      ))}
    </ul>
  )
}

export default BoardingMembers
