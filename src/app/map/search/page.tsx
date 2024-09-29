'use client'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import SearchInput from '@/components/common/search-input'
import Tab from '@/components/common/tab/tab'
import TabLabels from '@/components/common/tab/tab-labels'
import TabPanel from '@/components/common/tab/tab-panel'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import type { FormEvent } from 'react'
import { useCallback, useEffect, useState } from 'react'
import SearchMapCard from './search-map-card'
import Link from 'next/link'
import SearchMenuList from './search-menu-list'
import SearchCityList from './search-location-list'
import { useSearchParams } from 'next/navigation'
import { recentMapSearchStorage } from '@/utils/storage'
import ChipButton from '@/components/common/chip-button'

const MapSearch = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(search)
  const [recentKeywords, setRecentKeywords] = useState(
    recentMapSearchStorage.getValueOrNull() ?? [],
  )
  const [searchInput, setSearchInput] = useState('')
  const [activeTab, setActiveTab] = useState<'인기 많은순' | '가까운 순'>(
    '인기 많은순',
  )
  const router = useSafeRouter()

  const createQueryString = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(key, value)

      return params.toString()
    },
    [searchParams],
  )

  const addUniqueKeyword = useCallback(
    (keyword: string) => {
      const existRecentKeywords = [...(recentKeywords || [])]

      const keywordIndex = existRecentKeywords.indexOf(keyword)
      if (keywordIndex !== -1) {
        existRecentKeywords.splice(keywordIndex, 1)
      }
      recentMapSearchStorage.set([keyword, ...existRecentKeywords])
      setRecentKeywords([keyword, ...existRecentKeywords])
    },
    [recentKeywords],
  )

  const handleSearchLogic = useCallback(
    (keyword: string) => {
      const param = createQueryString('q', keyword)
      addUniqueKeyword(keyword)
      setQuery(keyword)
      setSearchInput(keyword)
      router.push(`/map/search?${param}`)
    },
    [addUniqueKeyword, createQueryString, router],
  )

  const handleSubmitInput = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchInput === '') return

    handleSearchLogic(searchInput)
  }

  const deleteRecentKeyword = (targetIndex: number) => {
    const existRecentKeywords = [...(recentKeywords || [])]

    if (targetIndex !== -1) {
      existRecentKeywords.splice(targetIndex, 1)
      recentMapSearchStorage.set(existRecentKeywords)
      setRecentKeywords(existRecentKeywords)
    }
  }

  useEffect(() => {
    // search와 query 동기화 (삭제, 브라우저 뒤로가기/앞으로가기 등 대응)
    setQuery(search)
  }, [search])

  return (
    <>
      <div className="min-h-dvh bg-neutral-700">
        <header className="relative flex items-center pt-4">
          <AccessibleIconButton
            icon={{ type: 'caretLeft', size: 'xl' }}
            label="이전 페이지"
            className="p-[10px]"
            onClick={() => router.safeBack()}
          />
          <Typography
            className="absolute left-1/2 translate-x-[-50%]"
            as="h1"
            size="body0"
          >
            지도 둘러보기
          </Typography>
        </header>

        <div className="flex flex-col gap-6">
          <form
            className="mt-2 flex w-full items-end px-5"
            onSubmit={handleSubmitInput}
          >
            <SearchInput
              value={searchInput}
              placeholder="메뉴나 지역으로 지도를 검색해 주세요"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>

          {recentKeywords.length > 0 && (
            <div className="no-scrollbar flex max-w-full flex-nowrap gap-3 overflow-x-scroll px-5">
              {recentKeywords.map((keyword, index) => (
                <button
                  key={keyword}
                  onClick={() => handleSearchLogic(keyword)}
                >
                  <ChipButton
                    isActive
                    rightIcon={{
                      type: 'close',
                      onClick: (e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        deleteRecentKeyword(index)
                      },
                    }}
                    className="flex-row-reverse whitespace-nowrap"
                  >
                    {keyword}
                  </ChipButton>
                </button>
              ))}
            </div>
          )}

          {query === '' ? (
            <div className="flex flex-col gap-3">
              <SearchMenuList
                className="px-5"
                onClickMenu={(menu) => handleSearchLogic(menu)}
              />
              <SearchCityList
                className="px-5"
                onClickLocation={(location) => handleSearchLogic(location)}
              />
            </div>
          ) : (
            <Tab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className="px-5"
            >
              <TabLabels labels={['인기 많은순', '가까운 순']} />
              <TabPanel tabId="인기 많은순">
                <ul className="flex flex-col gap-4">
                  <Link href={`/map/search/123`}>
                    <SearchMapCard
                      map={{
                        name: '비타민C',
                        numOfCrews: 123,
                        numOfPins: 200,
                        id: '123',
                        description: 'Mash-Up 최고먹짱들의 지도',
                        categories: ['돈까스', '강남'],
                      }}
                    />
                  </Link>
                  <Link href={`/map/search/123`}>
                    <SearchMapCard
                      map={{
                        name: '비타민C',
                        numOfCrews: 123,
                        numOfPins: 200,
                        id: '123',
                        description: 'Mash-Up 최고먹짱들의 지도',
                        categories: ['돈까스', '강남'],
                      }}
                    />
                  </Link>
                </ul>
              </TabPanel>

              <TabPanel tabId="가까운 순">
                <ul className="flex flex-col gap-4">
                  <Link href={`/map/search/123`}>
                    <SearchMapCard
                      map={{
                        name: '비타민C',
                        numOfCrews: 123,
                        numOfPins: 200,
                        id: '123',
                        description: 'Mash-Up 최고먹짱들의 지도',
                        categories: ['돈까스', '강남'],
                      }}
                    />
                  </Link>
                </ul>
              </TabPanel>
            </Tab>
          )}
        </div>
      </div>
    </>
  )
}

export default MapSearch
