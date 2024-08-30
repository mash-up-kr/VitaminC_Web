import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'

interface KakaoMapContextProps {
  map: kakao.maps.Map | null
}

const KakaoMapContext = createContext<KakaoMapContextProps>({
  map: null,
})

export const KakaoMapProvider = ({
  map,
  children,
}: PropsWithChildren<KakaoMapContextProps>) => {
  return (
    <KakaoMapContext.Provider value={{ map }}>
      {children}
    </KakaoMapContext.Provider>
  )
}

export const useKakaoMap = () => useContext(KakaoMapContext)
