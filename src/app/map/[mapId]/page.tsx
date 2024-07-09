const MapMain = async ({
  params,
  searchParams,
}: {
  params: { mapId: string }
  searchParams?: { search?: string }
}) => {
  if (searchParams?.search) {
    return <>검색 화면</>
  }

  return <>지도 {params.mapId} 페이지</>
}

export default MapMain
