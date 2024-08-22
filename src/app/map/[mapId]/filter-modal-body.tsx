'use client'

import { useState } from 'react'

import type { FilterIdsType } from './page'

import ChipButton from '@/components/common/chip-button'
import { notify } from '@/components/common/custom-toast'
import Icon from '@/components/common/icon'
import Typography from '@/components/common/typography'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import type { TagItem } from '@/types/api/maps'
import { api } from '@/utils/api'
import cn from '@/utils/cn'

interface FilterModalBodyProps {
  mapId: string
  selectedFilterNames: FilterIdsType
  onChangeSelectedFilterNames: (value: CategoryType | TagItem['name']) => void
}

export type CategoryType = 'all' | 'pick' | 'like'

const CATEGORY_LIST: { type: CategoryType; label: string }[] = [
  { type: 'all', label: '전체' },
  { type: 'pick', label: '내가 등록한 맛집' },
  { type: 'like', label: '내가 좋아요한 맛집' },
]

const FilterModalBody = ({
  mapId,
  selectedFilterNames,
  onChangeSelectedFilterNames,
}: FilterModalBodyProps) => {
  const [tags, setTags] = useState<TagItem[]>([])

  const getIsCategorySelected = (type: CategoryType) => {
    if (type === 'all') {
      return selectedFilterNames.category === 'all'
    }
    return selectedFilterNames.category === type
  }
  useIsomorphicLayoutEffect(() => {
    const fetchTags = async () => {
      try {
        const { data } = await api.maps.id.tag.get(mapId)
        setTags(data)
      } catch (err) {
        notify.error('해시태그 목록을 가지고 오지 못했습니다.')
      }
    }
    fetchTags()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-3 py-5">
        <Typography size="h6" color="neutral-300">
          분류
        </Typography>
        <div className="flex items-center gap-3">
          {CATEGORY_LIST.map((category) => (
            <ChipButton
              key={category.type}
              isActive={getIsCategorySelected(category.type)}
              onClick={() => onChangeSelectedFilterNames(category.type)}
            >
              {category.label}
            </ChipButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 py-5">
        <Typography size="h6" color="neutral-300">
          # 해시태그
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <button
              key={`${mapId}-${tag.name}`}
              className={cn(
                'flex h-[35px] w-fit items-center gap-1 rounded-[20px] px-[10px] py-2 transition-colors',
                selectedFilterNames.tags.includes(tag.name)
                  ? 'bg-orange-400'
                  : 'bg-neutral-500',
              )}
              onClick={() => onChangeSelectedFilterNames(tag.name)}
            >
              {tag.iconType && (
                <Icon type={tag.iconType} size="md" aria-hidden />
              )}
              <Typography as="span" size="body3" color="neutral-000">
                {tag.name}
              </Typography>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default FilterModalBody
