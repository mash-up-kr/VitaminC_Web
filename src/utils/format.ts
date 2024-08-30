import type { PlaceType, SearchPlace } from '@/models/api/place'

export const convertSearchPlaceToPlaceType = (
  searchPlace: SearchPlace,
): PlaceType => {
  return {
    ...searchPlace,
    likedUserIds: searchPlace.likedUserIds ?? [],
    createdBy: {
      id: -1,
      nickname: '',
    },
    tags: searchPlace.tags?.map((tag) => ({ name: tag })),
    place: {
      id: searchPlace.kakaoId,
      kakaoPlace: {
        id: searchPlace.kakaoId,
        name: searchPlace.placeName,
        category: searchPlace.category,
        categoryIconCode: searchPlace.categoryIconCode,
        address: searchPlace.address,
        x: searchPlace.x,
        y: searchPlace.y,
        menuList: [],
        photoList: [],
        mainPhotoUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      x: searchPlace.x,
      y: searchPlace.y,
    },
    comments: [],
    createdAt: '',
    updatedAt: '',
  }
}
