'use client'

import { useCallback, useEffect, useState } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import EmptyResultBox from './empty-result-box'
import RecentKeywords from './recent-keywords'
import SearchForm from './search-form'
import SuggestPlaceList from './suggest-place-list'
import debounce from 'lodash.debounce'

import { notify } from '@/components/common/custom-toast'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import type { SearchPlace } from '@/models/api/place'
import type { MapInfo } from '@/models/map'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'
import { formatBoundToRect } from '@/utils/location'
import { mapBoundSessionStorage, recentSearchStorage } from '@/utils/storage'

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
  // TODO: useFetch에 status 추가 및 useFetch로 데이터 관리
  const [status, setStatus] = useState('pending') // 'pending' | 'fetching' | 'success' | 'error'
  const [suggestedPlaces, setSuggestedPlaces] = useState<SearchPlace[]>([])
  const isShowRecentKeywords =
    query === '' &&
    !!recentKeywords.length &&
    search === '' &&
    status !== 'fetching'
  const isShowSuggestionPlaces = !isShowRecentKeywords

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

    const searchOnKorea = async (validMapId: MapInfo['id']) => {
      const { data } = await api.search.places.get({
        q: query,
        rect: formatBoundToRect(null),
        mapId: validMapId,
      })
      setSuggestedPlaces(data)
    }

    try {
      setStatus('fetching')

      const { data } = await api.search.places.get({
        q: query,
        rect: formatBoundToRect(mapBounds),
        mapId,
      })
      setSuggestedPlaces(data)
      if (data.length === 0) {
        await searchOnKorea(mapId)
      }
      setStatus('success')
    } catch (err) {
      notify.error('잘못된 접근입니다.')
      setStatus('error')
    }
  }, [mapBounds, mapId, query])

  useEffect(() => {
    const debounceGetSuggestPlaces = debounce(getSuggestPlaces, 200)

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
        ) : query === '' ? (
          <Typography
            size="body2"
            color="neutral-200"
            className="mt-[112px] flex justify-center"
          >
            검색어를 입력해 주세요.
          </Typography>
        ) : (
          <EmptyResultBox />
        ))}
    </div>
  )
}

export default SearchBox
