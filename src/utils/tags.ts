import type { TagItem } from '@/models/api/maps'
import type { KorrkPlace } from '@/models/api/place'

const changeSpaceToHyphen = (name: string) => {
  if (typeof name !== 'string' || name === '') return

  return name.replace(/ /g, '-')
}

const getFitContainerWidthTags = (
  placeId: KorrkPlace['place']['id'],
  currentTags: TagItem[],
  containerWidth: number,
) => {
  let totalWidth = 0
  const filteredVisibleTags = currentTags.filter((tag) => {
    const chip = document.querySelector<HTMLElement>(
      `#tag-${placeId}-${changeSpaceToHyphen(tag.name)}`,
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
