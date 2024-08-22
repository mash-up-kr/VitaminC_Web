import Link from 'next/link'

import { AccessibleIconButton, Typography } from '@/components'
import useSafeRouter from '@/hooks/use-safe-router'
import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'

interface ResultSearchInputProps extends ClassName {
  value: string
  isMapView: boolean
  onToggleView: VoidFunction
}

const ResultSearchInput = ({
  value,
  isMapView,
  className,
  onToggleView,
}: ResultSearchInputProps) => {
  const router = useSafeRouter()

  return (
    <div
      className={cn(
        'flex h-[60px] w-full items-end justify-center gap-[10px]',
        className,
      )}
    >
      <Link
        href={`/search?search=${encodeURI(value)}`}
        aria-label={`${value}값을 가지고 검색 화면으로 이동`}
        className={cn(
          'flex w-full items-center gap-[10px] rounded-[6px] px-[16px] py-[14px] transition-colors',
          isMapView
            ? 'bg-neutral-700 outline outline-1 outline-neutral-500'
            : 'bg-neutral-600',
        )}
      >
        <AccessibleIconButton
          role="link"
          icon={{ type: 'caretLeft', size: 'xl' }}
          label="값 초기화와 함께 검색 화면으로 이동"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            router.push('/search')
          }}
        />
        <Typography size="body1" className="font-medium">
          {value}
        </Typography>
      </Link>
      <AccessibleIconButton
        icon={{ type: isMapView ? 'listView' : 'mapView', size: 'xl' }}
        className={cn(
          'flex h-[52px] w-[52px] items-center justify-center rounded-[6px] p-[14px] transition-colors',
          isMapView
            ? 'bg-neutral-700 outline outline-1 outline-neutral-500'
            : 'bg-neutral-600',
        )}
        label={isMapView ? '목록 화면으로 전환' : '지도 화면으로 전환'}
        onClick={onToggleView}
      />
    </div>
  )
}

export default ResultSearchInput
