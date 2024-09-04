import Typography from '@/components/common/typography'
import { ClassName } from '@/models/common'
import type { MapMemberData } from '@/models/map'
import { User } from '@/models/user'
import cn from '@/utils/cn'
import CrewInfoReadOnlyItem from './crew-info-read-only-item'
import CrewInfoEditableItem from './crew-info-editable-item'

interface CrewInfoListProps extends ClassName {
  user: User
  isMyMap: boolean
  members: MapMemberData[]
}

const memberColors = [
  'coral',
  'dark-blue',
  'sky-blue',
  'violet',
  'green',
] as const
type AvatarColor = (typeof memberColors)[number]

const getRandomColor = (prevColor?: AvatarColor): AvatarColor => {
  const availableColors = memberColors.filter((color) => color !== prevColor)
  const randomIndex = Math.floor(Math.random() * availableColors.length)
  return availableColors[randomIndex]
}

const generateRandomColorList = (length: number): AvatarColor[] => {
  let prevColor: AvatarColor | undefined
  const randomColors: AvatarColor[] = []

  for (let i = 0; i < length; i++) {
    const newColor = getRandomColor(prevColor)
    randomColors.push(newColor)
    prevColor = newColor // 이전 값을 갱신
  }

  return randomColors
}

const CrewInfoList = ({
  members,
  isMyMap,
  className,
  user,
}: CrewInfoListProps) => {
  const avatarColors = generateRandomColorList(members.length)

  return (
    <section className={cn('', className)}>
      <div className="flex gap-1">
        <Typography size="h6" color="neutral-300">
          Crew
        </Typography>
        <Typography size="h6" color="neutral-300">
          {members.length.toLocaleString()}
        </Typography>
      </div>

      <ul className="pt-2">
        {members.map((member, index) =>
          isMyMap ? (
            <CrewInfoEditableItem
              key={member.id}
              member={member}
              avatarColor={avatarColors[index]}
              isMe={member.id === user.id}
            />
          ) : (
            <CrewInfoReadOnlyItem
              key={member.id}
              member={member}
              avatarColor={avatarColors[index]}
              isMe={member.id === user.id}
            />
          ),
        )}
      </ul>
    </section>
  )
}

export default CrewInfoList
