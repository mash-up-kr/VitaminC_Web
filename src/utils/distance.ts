export const formatDistance = (distance: number): string => {
  const KM = 1000
  const distanceInMeters = distance * KM

  if (distanceInMeters < KM) {
    return `${Math.round(distanceInMeters)}m`
  } else {
    return `${distance.toFixed(1)}km`
  }
}
