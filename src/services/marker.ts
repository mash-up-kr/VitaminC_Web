import type { IconKey } from '@/components/common/icon'
import { removeAllSpaces } from '@/utils/category'

export const getMarkerType = (
  category: string,
  isPick: boolean,
): Extract<
  IconKey,
  | 'cafe'
  | 'restaurant'
  | 'bar'
  | 'selectedCafe'
  | 'selectedRestaurant'
  | 'selectedBar'
> => {
  const trimmedCategory = removeAllSpaces(category)

  if (['호프', '요리주점'].includes(trimmedCategory))
    return isPick ? 'selectedBar' : 'bar'
  if (['카페', '디저트'].includes(trimmedCategory))
    return isPick ? 'selectedCafe' : 'cafe'
  return isPick ? 'selectedRestaurant' : 'restaurant'
}
