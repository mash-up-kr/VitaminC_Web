import { Avatar, Chip, Typography } from '../common'
import { BoardingMembersProps } from './types'

const memberColors = [
  'coral',
  'dark-blue',
  'sky-blue',
  'violet',
  'green',
] as const

const BoardingMembers = ({ owner, members }: BoardingMembersProps) => {
  return (
    <ul className="w-full bg-neutral-600 max-h-[268px] overflow-y-scroll no-scrollbar">
      {members.map((member, index) => (
        <li key={member} className="flex items-center px-4 h-[52px]">
          <Avatar
            // TODO: 로직 수정
            me={member === owner}
            value={member}
            colorScheme={memberColors[index % memberColors.length]}
          />
          <Typography
            as="span"
            size="body1"
            color="neutral-100"
            className="ml-2"
          >
            {member}
          </Typography>
          {owner === member && (
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
