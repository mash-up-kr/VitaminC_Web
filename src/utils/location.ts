export const formatBoundToRect = (
  bound: {
    x1: number
    y1: number
    x2: number
    y2: number
  } | null,
  defaultRect?: string,
): string => {
  if (!bound) {
    return defaultRect ?? '127.02598800275543,37.50079626026492'
  }

  return `${bound.y1},${bound.x1},${bound.y2},${bound.x2}`
}

export const deg2rad = (deg: number): number => deg * (Math.PI / 180)

export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371 // 지구 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
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
