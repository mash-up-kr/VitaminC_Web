import { IconKey } from '@/components/common/icon'

const getStarByScore = (score: number): IconKey => {
  if (score > 4) return 'starFilled'
  if (score > 1) return 'starHalfFilled'
  return 'starGrey'
}

export { getStarByScore }
