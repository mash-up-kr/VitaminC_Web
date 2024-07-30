import { PlaceType, SearchPlace } from '@/types/api/place'

export const convertSearchPlaceToPlaceType = (
  searchPlace: SearchPlace,
): PlaceType => {
  return {
    ...searchPlace,
    place: {
      id: searchPlace.kakaoId,
      kakaoPlace: {
        id: searchPlace.kakaoId,
        name: searchPlace.placeName,
        category: searchPlace.category,
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
