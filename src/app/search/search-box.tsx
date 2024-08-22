'use client'

import debounce from 'lodash.debounce'
import { useCallback, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { api } from '@/utils/api'
import SearchForm from './search-form'
import RecentKeywords from './recent-keywords'
import SuggestPlaceList from './suggest-place-list'
import { formatBoundToRect } from '@/utils/location'
import { mapBoundSessionStorage, recentSearchStorage } from '@/utils/storage'
import useSafeRouter from '@/hooks/use-safe-router'
import type { SearchPlace } from '@/types/api/place'
import { getMapId } from '@/services/map-id'
import { notify } from '@/components/common/custom-toast'
import EmptyResultBox from './empty-result-box'
import LoadingIndicator from '@/components/loading-indicator'

const SearchBox = () => {
  const router = useSafeRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') ?? ''

  const mapBounds = mapBoundSessionStorage.getValueOrNull()
  const [recentKeywords, setRecentKeywords] = useState(
    recentSearchStorage.getValueOrNull() ?? [],
  )
  const [mapId, setMapId] = useState<string>('')
  const [query, setQuery] = useState(search)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestedPlaces, setSuggestedPlaces] = useState<SearchPlace[]>([])
  const isShowRecentKeywords =
    query === '' && !!recentKeywords.length && search === '' && !isLoading
  const isShowSuggestionPlaces = !isShowRecentKeywords && !isLoading

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
    recentSearchStorage.set([keyword, ...existRecentKeywords])
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
      router.push(`search/${encodeURI(searchKeyword)}`)
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
    router.push(`${pathname}?${createQueryString('search', '')}`)
  }

  useEffect(() => {
    // search와 query 동기화 (삭제, 브라우저 뒤로가기/앞으로가기 등 대응)
    setQuery(search)
  }, [search])

  useEffect(() => {
    const fetchMapId = async () => {
      if (!mapId) {
        const validMapId = (await getMapId()) || ''
        if (!validMapId) {
          throw new Error('잘못된 접근입니다.')
        }
        setMapId(validMapId)
      }
    }
    fetchMapId()
  }, [mapId])

  const getSuggestPlaces = useCallback(async () => {
    if (!query || !mapId) return

    try {
      setIsLoading(true)

      const { data } = await api.search.places.get({
        q: query,
        rect: formatBoundToRect(mapBounds),
        mapId,
      })
      setSuggestedPlaces(data)
    } catch (err) {
      notify.error('잘못된 접근입니다.')
    } finally {
      setIsLoading(false)
    }
  }, [mapBounds, mapId, query])

  useEffect(() => {
    const debounceGetSuggestPlaces = debounce(getSuggestPlaces, 500)

    debounceGetSuggestPlaces()

    return () => {
      debounceGetSuggestPlaces.cancel()
    }
  }, [getSuggestPlaces, query])

  return (
    <div className="min-h-dvh w-full bg-neutral-700 px-5 py-2">
      <SearchForm
        value={query}
        mapId={mapId}
        onChange={(e) => setQuery(e.target.value)}
        onResetValue={handleResetQuery}
        onSubmit={searchByKeyword}
      />

      {isLoading && <LoadingIndicator />}

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
          <EmptyResultBox />
        ))}
    </div>
  )
}

export default SearchBox
