import Typography from '@/components/common/typography'

const EmptyResultBox = () => {
  return (
    <Typography
      size="body2"
      color="neutral-200"
      className="mt-[112px] flex justify-center"
    >
      검색 결과가 없습니다.
    </Typography>
  )
}

export default EmptyResultBox
