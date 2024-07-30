import Link from 'next/link'

import cn from '@/utils/cn'
import type { ClassName } from '@/models/interface'
import { AccessibleIconButton, Typography } from '@/components'
import useSafeRouter from '@/hooks/use-safe-router'

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
        'w-full h-[60px] flex justify-center items-end gap-[10px]',
        className,
      )}
    >
      <Link
        href={`/search?search=${encodeURI(value)}`}
        aria-label={`${value}값을 가지고 검색 화면으로 이동`}
        className={cn(
          'w-full flex items-center rounded-[6px] gap-[10px] py-[14px] px-[16px] transition-colors',
          isMapView
            ? 'bg-neutral-700 outline outline-1 outline-neutral-500'
            : 'bg-neutral-600 ',
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
          'flex justify-center items-center w-[52px] h-[52px] p-[14px] rounded-[6px] transition-colors',
          isMapView
            ? 'bg-neutral-700 outline outline-1 outline-neutral-500'
            : 'bg-neutral-600 ',
        )}
        label={isMapView ? '목록 화면으로 전환' : '지도 화면으로 전환'}
        onClick={onToggleView}
      />
    </div>
  )
}

export default ResultSearchInput
