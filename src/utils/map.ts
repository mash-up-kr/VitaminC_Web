export const getCorners = (bounds: kakao.maps.LatLngBounds) => {
  const northEast = bounds.getNorthEast()
  const southWest = bounds.getSouthWest()

  const northWest = {
    latitude: northEast.getLat(),
    longitude: southWest.getLng(),
  }

  const southEast = {
    latitude: southWest.getLat(),
    longitude: northEast.getLng(),
  }

  return {
    northWest,
    southEast,
  }
}
