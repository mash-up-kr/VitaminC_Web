'use client'

import AccessibleIconButton from '@/components/common/accessible-icon-button'
import SearchInput from '@/components/common/search-input'
import Tab from '@/components/common/tab/tab'
import TabLabels from '@/components/common/tab/tab-labels'
import TabPanel from '@/components/common/tab/tab-panel'
import Typography from '@/components/common/typography'
import useSafeRouter from '@/hooks/use-safe-router'
import { useState } from 'react'
import SearchMapCard from './search-map-card'
import Link from 'next/link'
import SearchMenuList from './search-menu-list'
import SearchCityList from './search-location-list'

const MapSearch = () => {
  const [activeTab, setActiveTab] = useState<'인기 많은순' | '가까운 순'>(
    '인기 많은순',
  )
  const router = useSafeRouter()

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
          <div className="mt-2 flex items-end px-5">
            <SearchInput
              value=""
              placeholder="메뉴나 지역으로 지도를 검색해 주세요"
              onChange={() => {}}
            />
          </div>

          <SearchMenuList className="px-5" onClickMenu={() => {}} />
          <SearchCityList className="px-5" onClickLocation={() => {}} />

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
        </div>
      </div>
    </>
  )
}

export default MapSearch
