const Search = ({
  searchParams,
}: {
  searchParams?: {
    userId?: string
    mapName?: string
    search?: string
  }
}) => {
  return <>검색 결과 화면 {searchParams?.search}</>
}

export default Search
