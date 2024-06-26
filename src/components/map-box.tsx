import { forwardRef } from 'react'

//TODO: Map에 대한 스타일 props 정의
const MapBox = forwardRef((_, ref: React.ForwardedRef<HTMLElement>) => {
  return <section ref={ref} className="w-full h-96" />
})

MapBox.displayName = 'MapBox'

export default MapBox
