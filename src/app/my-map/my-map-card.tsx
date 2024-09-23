import BoardingDivider from '@/components/boarding-pass/boarding-divider'
import AccessibleIconButton from '@/components/common/accessible-icon-button'
import Chip from '@/components/common/chip'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import useFetch from '@/hooks/use-fetch'
import useSafeRouter from '@/hooks/use-safe-router'
import type { ClassName } from '@/models/common'
import type { MapInfo } from '@/models/map'
import { api } from '@/utils/api'
import cn from '@/utils/cn'
import Link from 'next/link'

interface MyMapCardProps extends ClassName {
  mapId: MapInfo['id']
}

const MyMapCard = ({ className, mapId }: MyMapCardProps) => {
  const router = useSafeRouter()

  const { data: user } = useFetch(api.users.me.get, {
    key: ['user'],
  })

  const { data: mapInfo } = useFetch(() => api.maps.id.get(mapId), {
    key: ['map', mapId],
  })

  return (
    <section className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between rounded-t-[24px] bg-neutral-600 px-5 pb-4 pt-5">
        <div className="flex gap-1">
          <Typography
            as="h3"
            size="h3"
            color="neutral-000"
            className="min-h-[27px]"
          >
            {mapInfo?.name ?? ''}
          </Typography>
          {user?.id && mapInfo?.createBy.id === user.id && (
            <Chip size="sm" colorScheme="neutral-800" className="ml-[6px]">
              모임장
            </Chip>
          )}
        </div>

        <Link href={`/my-map/${mapId}`}>
          <Typography size="body3" color="neutral-200">
            관리
          </Typography>
        </Link>
      </div>

      <BoardingDivider className="max-h-[24px] w-full" />

      <div className="flex justify-center rounded-b-[24px] bg-neutral-600 px-5 pb-5 pt-4">
        <div className="h-[45px] flex-1 flex-col gap-[2px]">
          <div className="flex gap-[2px]">
            <Icon type="person" size="md" fill="neutral-300" />
            <Typography size="body3" color="neutral-300">
              Crew
            </Typography>
          </div>

          <Typography size="body0" color="neutral-000" className="min-h-[24px]">
            {Number(mapInfo?.users.length ?? 0).toLocaleString()}명
          </Typography>
        </div>

        <div className="h-[45px] flex-1 flex-col gap-[2px]">
          <div className="flex gap-[2px]">
            <Icon type="pin" size="md" fill="neutral-300" />
            <Typography size="body3" color="neutral-300">
              Pins
            </Typography>
          </div>

          <Typography size="body0" color="neutral-000" className="min-h-[24px]">
            {Number(mapInfo?.registeredPlaceCount ?? 0).toLocaleString()}개
          </Typography>
        </div>

        <AccessibleIconButton
          role="link"
          icon={{ type: 'arrowRight', size: 'xl', stroke: 'neutral-100' }}
          label={`${mapInfo?.name} 지도로 이동`}
          className="h-10 w-10 rounded-full bg-neutral-400 p-2"
          onClick={() => router.push(`/map/${mapId}`)}
        />
      </div>
    </section>
  )
}

export default MyMapCard
