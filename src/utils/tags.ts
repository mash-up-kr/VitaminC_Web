import { PlaceType } from '@/types/api/place'

const changeSpaceToHyphen = (name: string) => {
  return name.replace(/ /g, '-')
}

const getFitContainerWidthTags = (
  placeId: PlaceType['place']['id'],
  currenttags: string[],
  containerWidth: number,
) => {
  let totalWidth = 0
  const filteredVisibletags = currenttags.filter((tag) => {
    const chip = document.querySelector<HTMLElement>(
      `#tag-${placeId}-${changeSpaceToHyphen(tag)}`,
    )

    if (chip === null) return false

    const chipWidth = chip.offsetWidth + 4
    totalWidth += chipWidth

    if (totalWidth < containerWidth) {
      return true
    }
    return false
  })

  return filteredVisibletags
}

export { changeSpaceToHyphen, getFitContainerWidthTags }
