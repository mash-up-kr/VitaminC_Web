'use client'

import { useState } from 'react'

import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import { FilterIdsType } from './page'
import { api } from '@/utils/api'
import { TagItem } from '@/types/api/maps'
import { notify } from '@/components/common/custom-toast'
import { ChipButton, Typography } from '@/components'

interface FilterModalBodyProps {
  mapId: string
  selectedFilterIds: FilterIdsType
  onChangeSelectedFilterIds: (value: CategoryType | number) => void
}

export type CategoryType = 'all' | 'pick' | 'like'

const CATEGORY_LIST: { type: CategoryType; label: string }[] = [
  { type: 'all', label: '전체' },
  { type: 'pick', label: '내가 등록한 맛집' },
  { type: 'like', label: '내가 좋아요한 맛집' },
]

const FilterModalBody = ({
  mapId,
  selectedFilterIds,
  onChangeSelectedFilterIds,
}: FilterModalBodyProps) => {
  const [hashtags, setHashtags] = useState<TagItem[]>([])

  const getIsCategorySelected = (type: CategoryType) => {
    if (type === 'all') {
      return selectedFilterIds.category.length === 0
    }
    return selectedFilterIds.category.includes(type)
  }
  useIsomorphicLayoutEffect(() => {
    const getHashtags = async () => {
      try {
        const { data } = await api.maps.id.tag.get(mapId)
        setHashtags(data)
      } catch (err) {
        notify.error('해시태그 목록을 가지고 오지 못했습니다.')
      }
    }
    getHashtags()
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-3 py-5">
        <Typography size="h6" color="neutral-300">
          분류
        </Typography>
        <div className="flex gap-3 items-center">
          {CATEGORY_LIST.map((category) => (
            <ChipButton
              key={category.type}
              isActive={getIsCategorySelected(category.type)}
              onClick={() => onChangeSelectedFilterIds(category.type)}
            >
              {category.label}
            </ChipButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 py-5">
        <Typography size="h6" color="neutral-300">
          #해시태그
        </Typography>
        <div className="flex gap-3 items-center flex-wrap">
          {hashtags.map((tag) => (
            <ChipButton
              key={tag.id}
              isActive={selectedFilterIds.hashtags.includes(tag.id)}
              onClick={() => onChangeSelectedFilterIds(tag.id)}
            >
              {tag.content}
            </ChipButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterModalBody
