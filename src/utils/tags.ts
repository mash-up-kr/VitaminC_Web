import type { TagItem } from '@/types/api/maps'
import type { PlaceType } from '@/types/api/place'

const changeSpaceToHyphen = (name: string) => {
  if (typeof name !== 'string' || name === '') return

  return name.replace(/ /g, '-')
}

const getFitContainerWidthTags = (
  placeId: PlaceType['place']['id'],
  currentTags: TagItem[],
  containerWidth: number,
) => {
  let totalWidth = 0
  const filteredVisibleTags = currentTags.filter((tag) => {
    const chip = document.querySelector<HTMLElement>(
      `#tag-${placeId}-${changeSpaceToHyphen(tag.content)}`,
    )

    if (chip === null) return false

    const chipWidth = chip.offsetWidth + 4
    totalWidth += chipWidth

    if (totalWidth < containerWidth) {
      return true
    }
    return false
  })

  return filteredVisibleTags
}

export { changeSpaceToHyphen, getFitContainerWidthTags }
