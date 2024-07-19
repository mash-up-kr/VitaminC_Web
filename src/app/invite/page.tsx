import { Typography } from '../../components'
import InvitedBoardingPass from '../../components/boarding-pass/invited-boarding-pass'
import InvitedExpiredBoardingPass from '../../components/boarding-pass/invited-expired-boarding-pass'
import { api } from '../../utils/api'
import { MapInviteInfoResponseType } from '../../models/map.interface'

const getMapInviteInfo = async (inviteCode: string) => {
  try {
    const res = await api.maps.inviteLinks.get(inviteCode)
    return res.data
  } catch (err) {
    return undefined
  }
}

const Invite = async ({
  searchParams,
}: {
  searchParams?: {
    code?: string
  }
}) => {
  const inviteCode = searchParams?.code

  if (!inviteCode) return <>초대장이 존재하지 않습니다.</>

  const mapInviteInfo: MapInviteInfoResponseType | undefined =
    await getMapInviteInfo(inviteCode)

  const mapInfo = mapInviteInfo?.map
  const expirationTime = mapInviteInfo?.inviteLink.expiresAt
  const isExpired = !mapInfo || !expirationTime

  return (
    <div className="mx-5">
      {isExpired ? (
        <>
          <Typography size="h1" className="mt-12 mb-4 whitespace-pre-line">
            {`유효기간이 만료된\n초대입니다`}
          </Typography>
          <Typography size="body1" color="neutral-200" className="mb-12">
            초대를 다시 요청해보세요.
          </Typography>
          <InvitedExpiredBoardingPass />
        </>
      ) : (
        <>
          <Typography size="h1" className="my-12">
            맛집 지도에 초대되었어요
          </Typography>

          <InvitedBoardingPass
            inviteCode={inviteCode}
            expirationTime={new Date(expirationTime)}
            mapId={mapInfo.id}
            mapName={mapInfo.name}
            owner={mapInfo.creator}
            numOfCrews={mapInfo.users.length}
            images={mapInviteInfo.placePreviewList}
          />
        </>
      )}
    </div>
  )
}

export default Invite
