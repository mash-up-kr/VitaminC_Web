'use client'

import MapInfoEditableTitle from './map-info-editable-title'
import MapInfoVisibility from './map-info-visibility'

import Typography from '@/components/common/typography'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import type { User } from '@/models/user'
import cn from '@/utils/cn'

export interface MapInfoBoxProps extends ClassName {
  mapInfo: MapInfo
  user: User
  refetchMapInfo: VoidFunction
}

const MapInfoBox = ({
  mapInfo,
  user,
  className,
  refetchMapInfo,
}: MapInfoBoxProps) => {
  return (
    <div className={cn(className)}>
      {mapInfo.createBy.id === user.id ? (
        <div className="flex w-full items-center justify-between">
          <MapInfoEditableTitle
            mapInfo={mapInfo}
            refetchMapInfo={refetchMapInfo}
          />
          <div className="w-fit rounded-[8px] bg-neutral-600 px-[3px] py-[4px]">
            <MapInfoVisibility
              mapInfo={mapInfo}
              refetchMapInfo={refetchMapInfo}
            />
          </div>
        </div>
      ) : (
        <Typography size="body0-2" color="neutral-000">
          {mapInfo.name}
        </Typography>
      )}
    </div>
  )
}

export default MapInfoBox
