import { notify } from '@/components/common/custom-toast'
import { useEffect, useState } from 'react'

const INITIAL_LATITUDE_LONGITUDE = {
  latitude: 37.561,
  longitude: 126.9996,
}

const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(
    INITIAL_LATITUDE_LONGITUDE,
  )

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCurrentLocation({ latitude, longitude })
      },
      () => {
        notify.error('위치 정보를 가지고 오지 못했습니다.')
      },
    )
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return {
    currentLocation,
    getCurrentLocation,
  }
}

export default useLocation
