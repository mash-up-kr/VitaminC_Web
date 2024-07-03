'use client'

import { useCallback, useState } from 'react'

import { recentSearchStorage } from '@/utils/storage'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import RecentKeywords from './recent-keywords'
import SearchForm from './search-form'

const Search = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const [recentKeywords, setRecentKeywords] = useState(
    recentSearchStorage.getValueOrNull() ?? [],
  )
  const [query, setQuery] = useState(search)
  const isShowRecentKeywords =
    query === '' && !!recentKeywords.length && !!search

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)

      return params.toString()
    },
    [searchParams],
  )

  const addUniqueKeyword = (keyword: string) => {
    const existRecentKeywords = [...(recentKeywords || [])]
    if (!existRecentKeywords.includes(keyword)) {
      recentSearchStorage.set([...existRecentKeywords, keyword])
      setRecentKeywords([...existRecentKeywords, keyword])
    }
  }

  const searchByKeyword = (formData: FormData) => {
    const searchKeyword = formData.get('query') as string | null
    if (searchKeyword) {
      createQueryString('search', searchKeyword)
      addUniqueKeyword(searchKeyword)
      setQuery('')
      // TODO: API 연동 및 결과 컴포넌트 로드
      router.push(`${pathname}?${createQueryString('search', searchKeyword)}`)
    }
  }

  const deleteRecentKeyword = (targetIndex: number) => {
    const existRecentKeywords = [...(recentKeywords || [])]

    if (targetIndex !== -1) {
      existRecentKeywords.splice(targetIndex, 1)
      recentSearchStorage.set(existRecentKeywords)
      setRecentKeywords(existRecentKeywords)
    }
  }

  return (
    <div className="w-full min-h-dvh bg-neutral-700 px-5 pt-2">
      <SearchForm
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onResetValue={() => setQuery('')}
        onSubmit={searchByKeyword}
      />

      {isShowRecentKeywords && (
        <RecentKeywords
          recentKeywords={recentKeywords}
          onDeleteKeyword={deleteRecentKeyword}
        />
      )}
    </div>
  )
}

export default Search
