'use client'

import { useEffect, useRef, useState } from 'react'
import KakaoMap from '@/components/kakao-map/kakao-map'
import Marker from '@/components/kakao-map/marker'
import PlaceMapPopup from '@/components/place/place-map-popup'
import { Avatar, Icon, Typography } from '@/components'
import Tooltip from '@/components/tooltip'
import Link from 'next/link'
import BottomSheet from '@/components/bottom-sheet'
import { visitedMapIdsStorage } from '@/utils/storage'
import SearchAnchorBox from './search-anchor-box'

const MAP_DATA = {
  id: '123',
  name: '바이타민C',
}

const PLACE_LIST_DATA: {
  place: {
    id: number
    kakaoPlace: {
      id: number
      name: string
      category: string
      address: string
      x: number
      y: number
      menuList: {
        menu: string
        price: string
      }[]
      photoList: string[]
    }
    x: number
    y: number
  }
  tags: [
    {
      id: number
      mapId: string
      content: string
      createdAt: string
    },
  ]
  comments: [{}]
  likedUserIds: number[]
  createdBy: {
    id: number
    nickname: string
  }
  createdAt: string
  updatedAt: string
}[] = [
  {
    place: {
      id: 1,
      kakaoPlace: {
        id: 1,
        name: 'Sarang Restaurant',
        category: 'Korean',
        address: '서울특별시 중구 세종대로 110',
        x: 126.977969,
        y: 37.566535,
        menuList: [
          {
            menu: 'Kimchi Stew',
            price: '8000 KRW',
          },
          {
            menu: 'Bulgogi',
            price: '12000 KRW',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
      },
      x: 126.977969,
      y: 37.566535,
    },
    tags: [
      {
        id: 1,
        mapId: '1',
        content: 'Cozy place',
        createdAt: '2024-07-16T12:00:00Z',
      },
    ],
    comments: [{}],
    likedUserIds: [1, 2, 3],
    createdBy: {
      id: 1,
      nickname: 'foodie',
    },
    createdAt: '2024-07-16T12:00:00Z',
    updatedAt: '2024-07-16T12:00:00Z',
  },
  {
    place: {
      id: 2,
      kakaoPlace: {
        id: 2,
        name: 'Han River Sushi',
        category: 'Japanese',
        address: '서울특별시 중구 을지로 39길',
        x: 126.983569,
        y: 37.563375,
        menuList: [
          {
            menu: 'Sushi Set',
            price: '15000 KRW',
          },
          {
            menu: 'Tempura',
            price: '10000 KRW',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
      },
      x: 126.983569,
      y: 37.563375,
    },
    tags: [
      {
        id: 2,
        mapId: '2',
        content: 'Great sushi',
        createdAt: '2024-07-16T12:30:00Z',
      },
    ],
    comments: [{}],
    likedUserIds: [2, 3, 4],
    createdBy: {
      id: 2,
      nickname: 'sushiLover',
    },
    createdAt: '2024-07-16T12:30:00Z',
    updatedAt: '2024-07-16T12:30:00Z',
  },
  {
    place: {
      id: 3,
      kakaoPlace: {
        id: 3,
        name: 'Gyeongbok Palace BBQ',
        category: 'BBQ',
        address: '서울특별시 종로구 사직로 161',
        x: 126.974546,
        y: 37.579617,
        menuList: [
          {
            menu: 'BBQ Set',
            price: '20000 KRW',
          },
          {
            menu: 'Galbi',
            price: '25000 KRW',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
      },
      x: 126.974546,
      y: 37.579617,
    },
    tags: [
      {
        id: 3,
        mapId: '3',
        content: 'Best BBQ',
        createdAt: '2024-07-16T13:00:00Z',
      },
    ],
    comments: [{}],
    likedUserIds: [3, 4, 5],
    createdBy: {
      id: 3,
      nickname: 'meatLover',
    },
    createdAt: '2024-07-16T13:00:00Z',
    updatedAt: '2024-07-16T13:00:00Z',
  },
  {
    place: {
      id: 4,
      kakaoPlace: {
        id: 4,
        name: 'Namdaemun Noodles',
        category: 'Noodles',
        address: '서울특별시 중구 남대문로 23',
        x: 126.976889,
        y: 37.558517,
        menuList: [
          {
            menu: 'Cold Noodles',
            price: '7000 KRW',
          },
          {
            menu: 'Spicy Noodles',
            price: '7500 KRW',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
      },
      x: 126.976889,
      y: 37.558517,
    },
    tags: [
      {
        id: 4,
        mapId: '4',
        content: 'Refreshing noodles',
        createdAt: '2024-07-16T13:30:00Z',
      },
    ],
    comments: [{}],
    likedUserIds: [4, 5, 6],
    createdBy: {
      id: 4,
      nickname: 'noodleFan',
    },
    createdAt: '2024-07-16T13:30:00Z',
    updatedAt: '2024-07-16T13:30:00Z',
  },
  {
    place: {
      id: 5,
      kakaoPlace: {
        id: 5,
        name: 'Insadong Cafe',
        category: 'Cafe',
        address: '서울특별시 종로구 인사동길 12',
        x: 126.984851,
        y: 37.571455,
        menuList: [
          {
            menu: 'Americano',
            price: '4000 KRW',
          },
          {
            menu: 'Green Tea Latte',
            price: '5000 KRW',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
      },
      x: 126.984851,
      y: 37.571455,
    },
    tags: [
      {
        id: 5,
        mapId: '5',
        content: 'Cozy ambiance',
        createdAt: '2024-07-16T14:00:00Z',
      },
    ],
    comments: [{}],
    likedUserIds: [5, 6, 7],
    createdBy: {
      id: 5,
      nickname: 'cafeLover',
    },
    createdAt: '2024-07-16T14:00:00Z',
    updatedAt: '2024-07-16T14:00:00Z',
  },
]

const PLACE_DETAIL_DATA = PLACE_LIST_DATA[0]

const MapMain = ({ params: { mapId } }: { params: { mapId: string } }) => {
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null)
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const visitedMapIds = visitedMapIdsStorage.getValueOrNull() ?? []

  const handleClickPlace = (placeId: number) => () => {
    if (selectedPlace === placeId) {
      setSelectedPlace(null)
      return
    }
    setSelectedPlace(placeId)
  }

  useEffect(() => {
    if (!visitedMapIds.includes(mapId)) {
      setIsTooltipOpen(true)
    }
  }, [visitedMapIds, mapId])

  return (
    <>
      <header className="absolute inset-x-5 z-50 top-4 flex flex-col gap-2">
        <div className="w-full flex justify-between">
          <Link href="" className="flex items-center">
            <Typography size="h3">{MAP_DATA.name}</Typography>
            <Icon type="caretDown" size="lg" />
          </Link>
          <Avatar value="홍길동" />
        </div>
        <Tooltip
          open={isTooltipOpen}
          label="원하는 장소를 등록해서 맛집을 등록해보세요!"
          onClose={() => {
            setIsTooltipOpen(false)
            visitedMapIdsStorage.set([
              ...(visitedMapIdsStorage.getValueOrNull() ?? []),
              mapId,
            ])
          }}
        >
          <SearchAnchorBox mapId={mapId} />
        </Tooltip>
      </header>
      <div className="w-full min-h-dvh flex flex-col justify-center items-center bg-neutral-700 px-5">
        <KakaoMap
          className="w-[calc(100%+40px)] h-screen"
          center={{ lat: 37.5665, lng: 126.978 }}
          level={3}
          bottomRef={bottomRef}
        >
          {PLACE_LIST_DATA.map((place) => (
            <Marker
              isSaved
              key={place.place.id}
              latitude={place.place.y}
              longitude={place.place.x}
              type={
                selectedPlace === place.place.id
                  ? 'selectedRestaurant'
                  : 'restaurant'
              }
              onClick={handleClickPlace(place.place.id)}
            />
          ))}
        </KakaoMap>
      </div>
      {selectedPlace === null ? (
        <BottomSheet
          ref={bottomRef}
          body={<Typography size="h1">아 하기 싫어</Typography>}
        />
      ) : (
        <PlaceMapPopup
          ref={bottomRef}
          className="absolute bottom-5 px-5"
          image={PLACE_DETAIL_DATA.place.kakaoPlace.photoList[0]}
          address={PLACE_DETAIL_DATA.place.kakaoPlace.address}
          name={PLACE_DETAIL_DATA.place.kakaoPlace.name}
          placeId={PLACE_DETAIL_DATA.place.kakaoPlace.id}
          category={PLACE_DETAIL_DATA.place.kakaoPlace.category}
          pick={{
            isLiked: PLACE_DETAIL_DATA.likedUserIds.includes(1),
            isMyPick: PLACE_DETAIL_DATA.createdBy.id === 1,
            numOfLikes: PLACE_DETAIL_DATA.likedUserIds.length,
            hashtags: PLACE_DETAIL_DATA.tags.map((tag) => tag.content),
            onClickLike: () => null,
          }}
        />
      )}
    </>
  )
}

export default MapMain
