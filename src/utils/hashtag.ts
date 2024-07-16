const getFitContainerWidthHashtag = (
  placeId: number,
  currentHashtags: string[],
  containerWidth: number,
) => {
  let totalWidth = 0
  const filteredVisibleHashtags = currentHashtags.filter((tag) => {
    const chip = document.querySelector<HTMLElement>(
      `#hashtag-${placeId}-${tag.replace(/ /g, '-')}`,
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

export { getFitContainerWidthHashtag }
