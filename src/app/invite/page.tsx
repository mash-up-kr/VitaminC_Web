const Invite = ({
  searchParams,
}: {
  searchParams?: {
    code?: string
  }
}) => {
  const inviteCode = searchParams?.code

  if (!inviteCode) return <>초대장이 존재하지 않습니다.</>

  return <>초대장 페이지</>
}

export default Invite
