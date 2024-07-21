import type { ClassName } from '@/models/interface'
import type {
  InviteLink,
  PlacePreview,
  UserByMap,
} from '@/models/map.interface'

interface BoardingMembers {
  owner: UserByMap
  members: UserByMap[]
  numOfCrews: number
}

export interface BoardingMembersProps
  extends Omit<BoardingMembers, 'numOfCrews'> {}

export interface BoardingInfoPassProps extends BoardingMembers, ClassName {
  mapId: string
  name: string
  day: number
  numOfPins: number
  onChangeInviteLink: (inviteLink: InviteLink) => void
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
