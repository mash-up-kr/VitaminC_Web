const memberColors = [
  'coral',
  'dark-blue',
  'sky-blue',
  'violet',
  'green',
] as const
type AvatarColor = (typeof memberColors)[number]

const hashString = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export const getColorForName = (name: string): AvatarColor => {
  const hash = hashString(name)

  const colorIndex = hash % memberColors.length
  return memberColors[colorIndex]
}
