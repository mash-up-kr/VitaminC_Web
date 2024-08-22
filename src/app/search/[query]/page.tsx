import { redirect } from 'next/navigation'

import ResultSearchBox from './result-search-box'

const SearchResult = async ({ params }: { params?: { query?: string } }) => {
  if (!params?.query) {
    redirect('/search')
  }
  return (
    <div className="min-h-dvh w-full bg-neutral-700 px-5">
      <ResultSearchBox query={decodeURI(params.query)} />
    </div>
  )
}

export default SearchResult
