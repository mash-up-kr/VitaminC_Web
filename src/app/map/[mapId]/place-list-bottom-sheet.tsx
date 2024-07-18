import { FilterButton } from '@/components'
import PlaceListItem from '@/components/place/place-list-item'
import useUserGeoLocation from '@/hooks/use-user-geo-location'
import { PlaceType } from '@/types/api/place'
import { formatDistance, getDistance } from '@/utils/location'
import { FilterIdsType } from './page'

interface PlaceListBottomSheetProps {
  places: PlaceType[]
  selectedFilter?: FilterIdsType
  onClickFilterButton: VoidFunction
}

const PlaceListBottomSheet = ({
  places,
  selectedFilter,
  onClickFilterButton,
}: PlaceListBottomSheetProps) => {
  const userLocation = useUserGeoLocation()

  return (
    <div className="flex flex-col pt-3.5 px-5">
      <div>
        <FilterButton
          numOfSelectedFilter={
            (selectedFilter?.category.length ?? 0) +
            (selectedFilter?.tags.length ?? 0)
          }
          icon={{ type: 'filter' }}
          onClick={onClickFilterButton}
        >
          필터
        </FilterButton>
      </div>
      <ul className="flex flex-col ">
        {places.map((place) => (
          <PlaceListItem
            key={`bottom-sheet-${place.place.id}`}
            placeId={place.place.id}
            address={place.place.kakaoPlace.address}
            name={place.place.kakaoPlace.name}
            rating={1}
            category={place.place.kakaoPlace.category}
            distance={formatDistance(
              getDistance(
                userLocation.latitude,
                userLocation.longitude,
                place.place.y,
                place.place.x,
              ),
            )}
            images={place.place.kakaoPlace.photoList}
            pick={{
              //TODO: userId 연동
              isLiked: place.likedUserIds.includes(1),
              isMyPick: place.createdBy.id === 1,
              numOfLikes: place.likedUserIds.length,
              tags: place.tags.map((tag) => tag.content),
              onClickLike: () => null,
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export default PlaceListBottomSheet
