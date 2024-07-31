export const extractCategory = (categoryName?: string): string => {
  if (!categoryName) return ''

  const categories = categoryName.split(' > ')
  const category = categories?.[categories.length - 1]
  return category
}

export const removeAllSpaces = (input: string): string => {
  return input.replace(/\s+/g, '')
}
