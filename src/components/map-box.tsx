import { forwardRef } from 'react'

//TODO: Map에 대한 스타일 props 정의
const MapBox = forwardRef((_, ref: React.ForwardedRef<HTMLElement>) => {
  return <section ref={ref} className="h-96 w-full" />
})

MapBox.displayName = 'MapBox'

export default MapBox
