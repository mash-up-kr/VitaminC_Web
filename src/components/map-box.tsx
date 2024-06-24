import React from 'react'

//TODO: Map에 대한 스타일 props 정의
const MapBox = React.forwardRef((_, ref: React.ForwardedRef<HTMLElement>) => {
  return <section ref={ref} className="w-full h-96" />
})

export default MapBox
