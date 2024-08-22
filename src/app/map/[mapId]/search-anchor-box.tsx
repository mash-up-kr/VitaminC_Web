import Link from 'next/link'

import { Icon, Typography } from '@/components'

const SearchAnchorBox = () => {
  return (
    <Link
      className="flex items-center justify-between rounded-md border border-solid border-neutral-400 bg-neutral-800 px-4 py-3.5"
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
