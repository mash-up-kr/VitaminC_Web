'use client'

import { useState } from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import { FilterIdsType } from './page'
import { api } from '@/utils/api'
import { TagItem } from '@/types/api/maps'
import { notify } from '@/components/common/custom-toast'
import { ChipButton, Icon, Typography } from '@/components'
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
      return selectedFilterNames.category.length === 0
    }
    return selectedFilterNames.category.includes(type)
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
        <div className="flex gap-3 items-center">
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
        <div className="flex gap-3 items-center flex-wrap">
          {tags.map((tag) => (
            <button
              key={`${mapId}-${tag.name}`}
              className={cn(
                'flex h-[35px] items-center gap-1 w-fit rounded-[20px] px-[10px] py-2 transition-colors',
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
