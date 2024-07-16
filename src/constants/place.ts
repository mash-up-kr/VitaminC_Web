export const PLACE_LIST_DATA: {
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

export const PLACE_DETAIL_DATA = PLACE_LIST_DATA[0]
