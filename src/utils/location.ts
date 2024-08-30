export const formatBoundToRect = (
  bound: {
    latitude1: number
    longitude1: number
    latitude2: number
    longitude2: number
  } | null,
  defaultRect?: string,
): string => {
  if (!bound) {
    return defaultRect ?? '127.02598800275543,37.50079626026492'
  }

  return `${bound.longitude2},${bound.latitude2},${bound.longitude1},${bound.latitude1}`
}

export const deg2rad = (deg: number): number => deg * (Math.PI / 180)

export const getDistance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number => {
  const R = 6371 // 지구 반지름 (단위: km)
  const dLat = deg2rad(latitude2 - latitude1)
  const dLon = deg2rad(longitude2 - longitude1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(latitude1)) *
      Math.cos(deg2rad(latitude2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // 두 지점 간의 거리 (단위: km)
  return distance
}

export const formatDistance = (distance: number): string => {
  const KM = 1000
  const distanceInMeters = distance * KM

  if (distanceInMeters < KM) {
    return `${Math.round(distanceInMeters)}m`
  } else {
    return `${distance.toFixed(1)}km`
  }
}
