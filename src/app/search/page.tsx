const Search = ({
  searchParams,
}: {
  searchParams?: {
    userId?: string
    mapName?: string
    search?: string
  }
}) => {
  if (!searchParams?.userId || !searchParams?.mapName) {
    return <>지도 미선택</>
  }

  return <>검색 결과 화면 {searchParams?.search}</>
}

export default Search
