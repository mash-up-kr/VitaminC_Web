const getFitContainerWidthHashtag = (
  placeId: string,
  currentHashtags: string[],
  containerWidth: number,
) => {
  let totalWidth = 0
  const filteredVisibleHashtags = currentHashtags.filter((tag) => {
    const chip = document.querySelector<HTMLElement>(
      `#${placeId}-hashtag-${tag}`,
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
