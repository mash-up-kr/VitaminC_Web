import type { ClassName } from '@/models/interface'
import { MapDataType, MapMemberData } from '@/types/api/maps'

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

export interface InviteBoardingPass extends Omit<BoardingMembers, 'members'> {
  mapName: string
}

export interface InviteBoardingPassProps extends InviteBoardingPass, ClassName {
  time: Date
}

export interface InvitedBoardingPassProps extends InviteBoardingPassProps {
  isExpired: boolean
  images?: string[]
  onClick: VoidFunction
}

export interface InvitingBoardingPassProps extends InviteBoardingPassProps {
  url: string
}
