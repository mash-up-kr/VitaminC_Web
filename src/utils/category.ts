import type { IconKey } from '@/components/common/icon'

export const extractCategory = (categoryName?: string): string => {
  if (!categoryName) return ''

  const categories = categoryName.split(' > ')
  const category = categories?.[categories.length - 1]
  return category
}

export const removeAllSpaces = (input: string): string => {
  return input.replace(/\s+/g, '')
}

export const getCategoryIconKey = (
  category: string | undefined,
): IconKey | null => {
  if (!category) return null

  const trimmedCategory = removeAllSpaces(category)
  if (['찜', '탕', '찌개'].includes(trimmedCategory)) return '찜'
  if (['돈까스', '회', '일식'].includes(trimmedCategory)) return '일식'
  if (['피자'].includes(trimmedCategory)) return '피자'
  if (['고기', '구기'].includes(trimmedCategory)) return '고기'
  if (['호프', '요리주점'].includes(trimmedCategory)) return '호프'
  if (['양식'].includes(trimmedCategory)) return '양식'
  if (['치킨'].includes(trimmedCategory)) return '치킨'
  if (['중식'].includes(trimmedCategory)) return '중식'
  if (['아시안'].includes(trimmedCategory)) return '아시안'
  if (['백반', '죽', '국수'].includes(trimmedCategory)) return '백반'
  if (['분식'].includes(trimmedCategory)) return '분식'
  if (['카페', '디저트'].includes(trimmedCategory)) return '카페'
  if (['패스트푸드'].includes(trimmedCategory)) return '패스트푸드'

  return null
}
