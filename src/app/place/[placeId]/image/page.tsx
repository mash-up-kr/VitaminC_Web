import Carousel from '@/components/common/carousel'
import ProxyImage from '@/components/common/proxy-image'
import { getMapId } from '@/services/map-id'
import { api } from '@/utils/api'

interface PlaceImageProps {
  params?: { placeId?: number }
  searchParams: { type: 'photoList' | 'mainPhotoUrl' }
}

const PlaceImage = async ({ params, searchParams }: PlaceImageProps) => {
  const mapId = (await getMapId()) || ''
  const response =
    !!mapId && !!params?.placeId
      ? await api.place.mapId.kakao.kakaoPlaceId.get({
          mapId,
          kakaoPlaceId: params?.placeId ?? -1,
        })
      : null
  const place = response?.data
  const imageType = searchParams.type

  const photoList = place?.photoList.slice(0, 3) || []
  const mainPhotoUrl = place?.mainPhotoUrl ? [place.mainPhotoUrl] : []

  const images =
    imageType === 'photoList'
      ? photoList
      : imageType === 'mainPhotoUrl'
        ? mainPhotoUrl
        : []

  return (
    <div className="mt-[60px]">
      {images && images.length > 1 ? (
        <Carousel
          items={images.map((src, index) => (
            <div key={src} className="h-[calc(100dvh-104px)] content-center">
              <ProxyImage
                src={src}
                alt={`이미지 상세 ${index + 1}`}
                className="w-full object-cover"
                draggable="false"
              />
            </div>
          ))}
          indicatorPosition="bottom"
        />
      ) : (
        <div className="h-[calc(100dvh-104px)] content-center">
          <ProxyImage
            src={images[0]}
            alt="이미지 상세"
            className="w-full object-cover"
            draggable="false"
          />
        </div>
      )}
    </div>
  )
}

export default PlaceImage
