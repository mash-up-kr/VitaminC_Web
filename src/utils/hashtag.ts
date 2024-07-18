import { PlaceType } from '@/types/api/place'

const changeSpaceToHyphen = (name: string) => {
  return name.replace(/ /g, '-')
}

const getFitContainerWidthHashtag = (
  placeId: PlaceType['place']['id'],
  currentHashtags: string[],
  containerWidth: number,
) => {
  let totalWidth = 0
  const filteredVisibleHashtags = currentHashtags.filter((tag) => {
    const chip = document.querySelector<HTMLElement>(
      `#hashtag-${placeId}-${changeSpaceToHyphen(tag)}`,
    )

    if (chip === null) return false

    const chipWidth = chip.offsetWidth + 4
    totalWidth += chipWidth

    if (totalWidth < containerWidth) {
      return true
    }
    return false
  })

  return filteredVisibleHashtags
}

export { changeSpaceToHyphen, getFitContainerWidthHashtag }
