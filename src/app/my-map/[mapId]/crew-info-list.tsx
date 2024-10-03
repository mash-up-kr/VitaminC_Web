import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import cn from '@/utils/cn'
import CrewInfoReadOnlyItem from './crew-info-read-only-item'
import CrewInfoEditableItem from './crew-info-editable-item'
interface CrewInfoListProps extends ClassName {
  user: User
  mapInfo: MapInfo
  refetchMapInfo: VoidFunction
}

const memberColors = [
  'coral',
  'dark-blue',
  'sky-blue',
  'violet',
  'green',
] as const
type AvatarColor = (typeof memberColors)[number]

const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

const getColorForName = (name: string): AvatarColor => {
  const hash = hashString(name)

  const colorIndex = hash % memberColors.length
  return memberColors[colorIndex]
}

const CrewInfoList = ({
  mapInfo,
  className,
  user,
  refetchMapInfo,
}: CrewInfoListProps) => {
  const isMyMap = mapInfo.createBy.id === user.id
  const members = mapInfo.users

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
        {members.map((member) =>
          isMyMap ? (
            <CrewInfoEditableItem
              key={member.id}
              member={member}
              mapId={mapInfo.id}
              avatarColor={getColorForName(member.nickname)}
              isMe={member.id === user.id}
              refetchMapInfo={refetchMapInfo}
            />
          ) : (
            <CrewInfoReadOnlyItem
              key={member.id}
              member={member}
              mapId={mapInfo.id}
              avatarColor={getColorForName(member.nickname)}
              isMe={member.id === user.id}
            />
          ),
        )}
      </ul>
    </section>
  )
}

export default CrewInfoList
