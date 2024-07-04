import { Typography } from '@/components/common'
import ConfirmCancelButton from '@/components/confirm-cancel-button'

const Invite = () => {
  const goHome = () => {
    // TODO: api 호출 후 mapId 받아서 router 이동
  }
  const sendInvitation = () => {
    // TODO: 초대장 모달로 띄워주기
  }

  return (
    <>
      <div className="flex-1">
        <div className="pt-12 px-5 mb-12">
          <Typography
            size="h1"
            color="neutral-000"
            className="whitespace-pre-line mb-4"
          >
            {`항해를 같이할\n동료를 초대해보세요`}
          </Typography>
          <Typography
            size="body1"
            color="neutral-200"
            className="whitespace-pre-line"
          >
            {`맛집지도를 함께 만들 친구에게\n초대장을 보내보세요`}
          </Typography>
        </div>

        <div className="w-full flex justify-center items-center">
          <img
            className="h-[220px] object-contain"
            src="/image-placeholder.png"
            alt="미정"
          />
        </div>
      </div>

      <div className="p-5 w-full">
        <ConfirmCancelButton
          cancelLabel="홈으로"
          confirmLabel="초대장 보내기"
          onCancel={goHome}
          onConfirm={sendInvitation}
        />
      </div>
    </>
  )
}

export default Invite
