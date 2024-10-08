import type { ClassName } from '@/models/common'
import type { MapInfo, MapMemberData } from '@/models/map'
import type { Creator, User } from '@/models/user'

interface BoardingMembers {
  creator: Creator
  members: MapMemberData[]
  numOfCrews: number
}

export interface BoardingMembersProps
  extends Omit<BoardingMembers, 'numOfCrews'> {
  userId: User['id']
}

export interface BoardingInfoPassProps extends BoardingMembers, ClassName {
  mapId: MapInfo['id']
  mapName: MapInfo['name']
  day: number
  numOfPins: number
}

export interface InviteBoardingPass
  extends Omit<BoardingMembers, 'members'>,
    ClassName {
  mapName: MapInfo['name']
  expirationTime: Date
}

export interface InvitingBoardingPassProps extends InviteBoardingPass {
  inviteCode: string
}

export interface InvitedBoardingPassProps extends InvitingBoardingPassProps {
  mapId: MapInfo['id']
  images?: string[]
}

export interface MapInviteInfo
  extends Omit<InvitedBoardingPassProps, 'className'> {}
