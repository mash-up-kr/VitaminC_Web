import type { ClassName } from '@/models/interface'
import type { PlacePreview } from '@/models/map.interface'
import { MapMemberData } from '@/types/api/maps'

interface BoardingMembers {
  owner: MapMemberData
  members: MapMemberData[]
  numOfCrews: number
}

export interface BoardingMembersProps
  extends Omit<BoardingMembers, 'numOfCrews'> {}

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
