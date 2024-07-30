import { Typography } from '@/components'

const EmptyResultBox = () => {
  return (
    <Typography
      size="body2"
      color="neutral-200"
      className="flex justify-center mt-[112px]"
    >
      검색 결과가 없습니다.
    </Typography>
  )
}

export default EmptyResultBox
