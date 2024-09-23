import type { PlaceType } from '@/models/api/place'

export const PLACE_LIST_DATA: PlaceType[] = [
  {
    place: {
      id: 1,
      kakaoPlace: {
        mainPhotoUrl: '1',
        id: 1,
        name: 'Sarang Restaurant',
        category: 'Korean',
        categoryIconCode: 100,
        address: '서울특별시 중구 세종대로 110',
        x: 126.977969,
        y: 37.566535,
        menuList: [
          {
            menu: 'Kimchi Stew',
            photo: '',
            price: '8000',
          },
          {
            menu: 'Bulgogi',
            photo: '',
            price: '12000',
          },
        ],
        photoList: ['/images/food.png', '/images/food.png', '/images/food.png'],
        createdAt: new Date('2024-07-16T12:00:00Z'),
        updatedAt: new Date('2024-07-16T12:00:00Z'),
      },
      x: 126.977969,
      y: 37.566535,
    },
    tags: [
      {
        name: '소규모 모임',
      },
      {
        name: '혼밥',
      },
      {
        name: '진대쌉가능',
      },
    ],
    comments: [{}],
    likedUser: [{ id: 1 }, { id: 2 }, { id: 3 }],
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
        mainPhotoUrl: '1',
        id: 2,
        name: 'Han River Sushi',
        category: 'Japanese',
        categoryIconCode: 100,
        address: '서울특별시 중구 을지로 39길',
        x: 126.983569,
        y: 37.563375,
        menuList: [
          {
            menu: 'Sushi Set',
            photo: '',
            price: '15000',
          },
          {
            menu: 'Tempura',
            photo: '',
            price: '10000',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
        createdAt: new Date('2024-07-16T12:00:00Z'),
        updatedAt: new Date('2024-07-16T12:00:00Z'),
      },
      x: 126.983569,
      y: 37.563375,
    },
    tags: [
      {
        name: 'Great sushi',
      },
    ],
    comments: [{}],
    likedUser: [{ id: 2 }, { id: 3 }, { id: 4 }],
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
        mainPhotoUrl: '1',
        id: 3,
        name: 'Gyeongbok Palace BBQ',
        category: 'BBQ',
        categoryIconCode: 100,
        address: '서울특별시 종로구 사직로 161',
        x: 126.974546,
        y: 37.579617,
        menuList: [
          {
            menu: 'BBQ Set',
            photo: '',
            price: '20000',
          },
          {
            menu: 'Galbi',
            photo: '',
            price: '25000',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
        createdAt: new Date('2024-07-16T12:00:00Z'),
        updatedAt: new Date('2024-07-16T12:00:00Z'),
      },
      x: 126.974546,
      y: 37.579617,
    },
    tags: [
      {
        name: 'Best BBQ',
      },
    ],
    comments: [{}],
    likedUser: [{ id: 3 }, { id: 4 }, { id: 5 }],
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
        mainPhotoUrl: '1',
        id: 4,
        name: 'Namdaemun Noodles',
        category: 'Noodles',
        categoryIconCode: 100,
        address: '서울특별시 중구 남대문로 23',
        x: 126.976889,
        y: 37.558517,
        menuList: [
          {
            menu: 'Cold Noodles',
            photo: '',
            price: '7000',
          },
          {
            menu: 'Spicy Noodles',
            photo: '',
            price: '7500',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
        createdAt: new Date('2024-07-16T12:00:00Z'),
        updatedAt: new Date('2024-07-16T12:00:00Z'),
      },
      x: 126.976889,
      y: 37.558517,
    },
    tags: [
      {
        name: 'Refreshing noodles',
      },
    ],
    comments: [{}],
    likedUser: [{ id: 4 }, { id: 5 }, { id: 6 }],
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
        mainPhotoUrl: '1',
        id: 5,
        name: 'Insadong Cafe',
        category: 'Cafe',
        categoryIconCode: 100,
        address: '서울특별시 종로구 인사동길 12',
        x: 126.984851,
        y: 37.571455,
        menuList: [
          {
            menu: 'Americano',
            photo: '',
            price: '4000',
          },
          {
            menu: 'Green Tea Latte',
            photo: '',
            price: '5000',
          },
        ],
        photoList: [
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/people-creating-food-content-to-upload-on-the-internet-for-food-lovers_23-2151461628.jpg?size=626&ext=jpg',
        ],
        createdAt: new Date('2024-07-16T12:00:00Z'),
        updatedAt: new Date('2024-07-16T12:00:00Z'),
      },
      x: 126.984851,
      y: 37.571455,
    },
    tags: [
      {
        iconType: 'U1F35A',
        name: 'Cozy ambiance',
      },
    ],
    comments: [{}],
    likedUser: [{ id: 5 }, { id: 6 }, { id: 7 }],
    createdBy: {
      id: 5,
      nickname: 'cafeLover',
    },
    createdAt: '2024-07-16T14:00:00Z',
    updatedAt: '2024-07-16T14:00:00Z',
  },
]

export const PLACE_DETAIL_DATA = PLACE_LIST_DATA[0]
