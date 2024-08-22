import { ParseJSONError } from '@/models/api/index'

export const parseJSON = async <T>(response: Response): Promise<T> => {
  try {
    const data = await response.json()
    return data as T
  } catch (error) {
    throw new ParseJSONError({
      name: 'parse-json-error',
      message: 'Failed to parse JSON response',
    })
  }
}
