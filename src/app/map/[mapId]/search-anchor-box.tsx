import { Icon, Typography } from '@/components'
import Link from 'next/link'

const SearchAnchorBox = () => {
  return (
    <Link
      className="py-3.5 px-4 flex items-center justify-between bg-neutral-800 rounded-md border border-solid border-neutral-400"
      href="/search"
    >
      <Typography size="body1" color="neutral-400">
        원하는 장소를 검색해보세요
      </Typography>
      <Icon type="search" size="lg" stroke="neutral-400" />
    </Link>
  )
}

export default SearchAnchorBox
