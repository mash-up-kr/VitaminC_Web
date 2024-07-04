'use client'

import { Suspense, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { api } from '@/utils/api'
import SearchForm from './search-form'
import { debounce } from '@/utils/debounce'
import RecentKeywords from './recent-keywords'
import { recentSearchStorage } from '@/utils/storage'
import { useIsServer } from '@/hooks/use-is-server'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

const SearchBox = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const [recentKeywords, setRecentKeywords] = useState(
    recentSearchStorage.getValueOrNull() ?? [],
  )
  const [query, setQuery] = useState(search)
  const isShowRecentKeywords =
    query === '' && !!recentKeywords.length && search === ''

  const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)

    return params.toString()
  }

  const addUniqueKeyword = (keyword: string) => {
    const existRecentKeywords = [...(recentKeywords || [])]
    if (!existRecentKeywords.includes(keyword)) {
      recentSearchStorage.set([...existRecentKeywords, keyword])
      setRecentKeywords([keyword, ...existRecentKeywords])
    }
  }

  const searchByKeyword = (formDataOrKeyword: FormData | string) => {
    const searchKeyword =
      typeof formDataOrKeyword === 'string'
        ? formDataOrKeyword
        : (formDataOrKeyword.get('query') as string | null)
    if (searchKeyword) {
      createQueryString('search', searchKeyword)
      addUniqueKeyword(searchKeyword)
      // TODO: API 연동 및 결과 컴포넌트 로드
      setQuery(searchKeyword)
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

  const handleResetQuery = () => {
    setQuery('')
    createQueryString('search', '')
    router.push(`${pathname}?${createQueryString('search', '')}`)
  }

  useIsomorphicLayoutEffect(() => {
    // search와 query 동기화 (삭제, 브라우저 뒤로가기/앞으로가기 등 대응)
    setQuery(search)
  }, [search])

  useIsomorphicLayoutEffect(() => {
    const getSuggestPlaces = async () => {
      try {
        if (query) {
          const res = await api.search.searchPlaces({
            q: query,
            rect: '37.566826, 126.9786567,37.566826, 126.9786567',
          })
          console.log(res)
        }
      } catch (err) {
        // TODO: Error 처리
      }
    }

    const debounceGetSuggestPlaces = debounce(1000, getSuggestPlaces)
    debounceGetSuggestPlaces()
  }, [query])

  return (
    <div className="w-full min-h-dvh bg-neutral-700 px-5 pt-2">
      <SearchForm
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onResetValue={handleResetQuery}
        onSubmit={searchByKeyword}
      />

      {isShowRecentKeywords && (
        <RecentKeywords
          recentKeywords={recentKeywords}
          onSearchKeyword={searchByKeyword}
          onDeleteKeyword={deleteRecentKeyword}
        />
      )}
    </div>
  )
}

const Search = () => {
  const isServer = useIsServer()

  if (isServer) return <div>검색 페이지 로딩 중...</div>

  return (
    <Suspense>
      <SearchBox />
    </Suspense>
  )
}

export default Search
