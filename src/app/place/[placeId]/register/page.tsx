import { REGISTER_TAGS } from './tags'
import RegisterBox from './register-box'
import { PLACE_DETAIL_DATA } from '@/constants/place'

const PlaceRegister = async () => {
  // TODO: place api 연동
  // const tags = (await api.maps.id.tag.get('1')) ?? { data: REGISTER_TAGS }
  // const place = (await api.place.placeId.get('1')) ?? {
  //   data: PLACE_DETAIL_DATA,
  // }

  const tags = { data: REGISTER_TAGS }
  const place = {
    data: PLACE_DETAIL_DATA,
  }

  return (
    <>
      <RegisterBox place={place.data} tags={tags.data} />
    </>
  )
}

export default PlaceRegister
