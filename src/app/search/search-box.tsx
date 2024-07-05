'use client'

import debounce from 'lodash.debounce'
import { useCallback, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { api } from '@/utils/api'
import SearchForm from './search-form'
import { Typography } from '@/components'
import RecentKeywords from './recent-keywords'
import SuggestPlaceList from './suggest-place-list'
import { formatBoundToRect } from '@/utils/location'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import { mapBoundSessionStorage, recentSearchStorage } from '@/utils/storage'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'

const SearchBox = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const mapBounds = mapBoundSessionStorage.getValueOrNull()
  const [recentKeywords, setRecentKeywords] = useState(
    recentSearchStorage.getValueOrNull() ?? [],
  )
  const [query, setQuery] = useState(search)
  const [suggestedPlaces, setSuggestedPlaces] = useState<KakaoPlaceItem[]>([])
  const isShowRecentKeywords =
    query === '' && !!recentKeywords.length && search === ''
  const isShowResultPlaces = search !== ''
  const isShowSuggestionPlaces = !isShowRecentKeywords && !isShowResultPlaces

  const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)

    return params.toString()
  }

  const addUniqueKeyword = (keyword: string) => {
    const existRecentKeywords = [...(recentKeywords || [])]

    const keywordIndex = existRecentKeywords.indexOf(keyword)
    if (keywordIndex !== -1) {
      existRecentKeywords.splice(keywordIndex, 1)
    }
    recentSearchStorage.set([...existRecentKeywords, keyword])
    setRecentKeywords([keyword, ...existRecentKeywords])
  }

  const searchByKeyword = (formDataOrKeyword: FormData | string) => {
    const searchKeyword =
      typeof formDataOrKeyword === 'string'
        ? formDataOrKeyword
        : (formDataOrKeyword.get('query') as string | null)
    if (searchKeyword) {
      createQueryString('search', searchKeyword)
      addUniqueKeyword(searchKeyword)
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

  const getSuggestPlaces = useCallback(async () => {
    if (!query) return

    try {
      const res = await api.search.searchPlaces({
        q: query,
        rect: formatBoundToRect(mapBounds),
      })
      setSuggestedPlaces(res.data)
    } catch (err) {
      // TODO: Error 처리
    }
  }, [mapBounds, query])

  useIsomorphicLayoutEffect(() => {
    const debounceGetSuggestPlaces = debounce(getSuggestPlaces, 500)

    debounceGetSuggestPlaces()

    return () => {
      debounceGetSuggestPlaces.cancel()
    }
  }, [query])

  return (
    <div className="w-full min-h-dvh bg-neutral-700 px-5 py-2">
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

      {isShowSuggestionPlaces &&
        (suggestedPlaces.length > 0 ? (
          <SuggestPlaceList places={suggestedPlaces} query={query} />
        ) : (
          <Typography
            size="body2"
            color="neutral-200"
            className="flex justify-center mt-[112px]"
          >
            검색 결과가 없습니다.
          </Typography>
        ))}

      {isShowResultPlaces && <div>Result</div>}
    </div>
  )
}

export default SearchBox
