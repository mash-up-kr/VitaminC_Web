import { describe, it, expect } from 'vitest'

import { parseJSON } from '@/utils/api/parse-json'
import { ParseJSONError } from '@/models/interface'

describe('parseJSON', () => {
  it('should parse JSON response correctly', async () => {
    const mockResponse = {
      json: async () => ({ key: 'value' }),
    } as Response

    const result = await parseJSON<{ key: string }>(mockResponse)
    expect(result).toEqual({ key: 'value' })
  })

  it('should throw ParseJSONError on invalid JSON', async () => {
    const mockResponse = {
      json: async () => {
        throw new Error('Invalid JSON')
      },
    } as unknown as Response

    await expect(parseJSON(mockResponse)).rejects.toThrow(ParseJSONError)
    await expect(parseJSON(mockResponse)).rejects.toThrow(
      'Failed to parse JSON response',
    )
  })
})
