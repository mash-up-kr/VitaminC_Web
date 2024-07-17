'use client'
import { useState } from 'react'

import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
import { mapBoundSessionStorage } from '@/utils/storage'
import { notify } from '@/components/common/custom-toast'
import type { KakaoPlaceItem } from '@/types/map/kakao-raw-type'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import ResultSearchListBox from './result-search-list'
import ResultSearchInput from './result-search-input'
import KakaoMap from '@/components/kakao-map/kakao-map'

interface ResultSearchBoxProps extends ClassName {
  query: string
}

const d: KakaoPlaceItem[] = [
  {
    address_name: '서울 서초구 서초동 1308-10',
    category_group_code: 'FD6',
    category_group_name: '음식점',
    category_name: '음식점 > 한식 > 육류,고기 > 곱창,막창',
    distance: '',
    id: 21440993,
    phone: '02-533-8592',
    place_name: '더막창스 강남본점',
    place_url: 'http://place.map.kakao.com/21440993',
    road_address_name: '서울 서초구 서초대로77길 37',
    x: Number('127.02503381702525'),
    y: Number('37.50089453792234'),
  },
  {
    address_name: '서울 서초구 서초동 1308-5',
    category_group_code: 'FD6',
    category_group_name: '음식점',
    category_name: '음식점 > 술집 > 실내포장마차',
    distance: '',
    id: 529377134,
    phone: '',
    place_name: '쁨포차 강남역점',
    place_url: 'http://place.map.kakao.com/529377134',
    road_address_name: '서울 서초구 서초대로77길 43',
    x: Number('127.024902793996'),
    y: Number('37.501383811835'),
  },
  {
    address_name: '서울 서초구 서초동 1308-12',
    category_group_code: 'FD6',
    category_group_name: '음식점',
    category_name: '음식점 > 한식 > 육류,고기 > 곱창,막창',
    distance: '',
    id: 762214594,
    phone: '02-3482-2337',
    place_name: '정분네중앙곱창 강남본점',
    place_url: 'http://place.map.kakao.com/762214594',
    road_address_name: '서울 서초구 서초대로77길 35',
    x: Number('127.02533234763213'),
    y: Number('37.500807076702884'),
  },
  {
    address_name: '서울 서초구 서초동 1308-23',
    category_group_code: 'FD6',
    category_group_name: '음식점',
    category_name: '음식점 > 한식 > 육류,고기 > 곱창,막창',
    distance: '',
    id: 1364306049,
    phone: '02-533-3309',
    place_name: '진구곱창',
    place_url: 'http://place.map.kakao.com/1364306049',
    road_address_name: '서울 서초구 서초대로75길 37',
    x: Number('127.024807588306'),
    y: Number('37.5007531277083'),
  },
]

const ResultSearchBox = ({ query, className }: ResultSearchBoxProps) => {
  const [isMapView, setIsMapView] = useState(false)
  const [places, setPlaces] = useState<KakaoPlaceItem[]>([])

  useIsomorphicLayoutEffect(() => {
    ;(async () => {
      const bounds = mapBoundSessionStorage.getValueOrNull()
      try {
        // const data = await api.search.places.get({
        //   q: query,
        //   rect: formatBoundToRect(bounds),
        // })
        console.log(bounds)
        setPlaces(d)
      } catch {
        notify.error('예상치 못한 오류가 발생했습니다.')
      }
    })()
  }, [])

  return (
    <div className={cn('w-full h-full relative', className)}>
      <ResultSearchInput
        value={query}
        isMapView={isMapView}
        onToggleView={() => setIsMapView((prev) => !prev)}
        className="absolute h-[60px] z-[100]"
      />
      {isMapView ? (
        // TODO: 카카오 맵 + 마커 + GPS 컴포넌트로 변경
        <KakaoMap className="absolute top-0 left-0 w-[calc(100%+40px)] mx-[-20px] h-dvh z-[50]" />
      ) : (
        <ResultSearchListBox places={places} className="absolute top-[60px]" />
      )}
    </div>
  )
}

export default ResultSearchBox
