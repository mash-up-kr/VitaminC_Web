const MapMain = ({
  searchParams,
}: {
  searchParams?: {
    userId?: string
    mapName?: string
    search?: string
  }
}) => {
  if (searchParams?.search) {
    return <>검색 화면</>
  }

  return <>지도 페이지</>
}

export default MapMain
