import type { ClassName } from '@/models/interface'
import type { MapMemberData, PlacePreview } from '@/models/map.interface'
import type { Creator, User } from '@/models/user.interface'

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
  mapId: string
  name: string
  day: number
  numOfPins: number
}

export interface InviteBoardingPass
  extends Omit<BoardingMembers, 'members'>,
    ClassName {
  mapName: string
  expirationTime: Date
}

export interface InvitingBoardingPassProps extends InviteBoardingPass {
  inviteCode: string
}

export interface InvitedBoardingPassProps extends InvitingBoardingPassProps {
  mapId: string
  images?: PlacePreview[]
}
