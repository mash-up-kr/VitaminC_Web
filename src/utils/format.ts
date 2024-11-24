import type { KorrkPlace, PlaceItem } from '@/models/api/place'

export const convertplaceItemToKorrkPlace = (
  placeItem: PlaceItem,
): KorrkPlace => {
  return {
    ...placeItem,
    likedUser: placeItem.likedUser ?? [],
    createdBy: {
      id: -1,
      nickname: '',
    },
    tags: placeItem.tags?.map((tag) => ({ name: tag })),
    place: {
      id: placeItem.kakaoId,
      kakaoPlace: {
        id: placeItem.kakaoId,
        name: placeItem.placeName,
        category: placeItem.category,
        categoryIconCode: placeItem.categoryIconCode,
        address: placeItem.address,
        x: placeItem.x,
        y: placeItem.y,
        score: placeItem.score,
        menuList: [],
        photoList: [],
        mainPhotoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      x: placeItem.x,
      y: placeItem.y,
    },
    comments: [],
    createdAt: '',
    updatedAt: '',
  }
}
