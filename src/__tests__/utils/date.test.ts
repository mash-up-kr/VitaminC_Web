import { describe, expect, it } from 'vitest'

import { DateOrderError, getDiffDateText } from '@/utils/date'

describe('getDiffDateText', () => {
  it('should return 1 if the difference is less than a day', () => {
    const startDate = new Date('2024-05-04T23:40:00Z')
    const endDate = new Date('2024-05-04T23:59:00Z')

    expect(getDiffDateText(startDate, endDate)).toBe(1)
  })

  it('should return 2 if day crosses midnight', () => {
    const startDate = new Date('2024-05-04T23:40:00Z')
    const endDate = new Date('2024-05-05T00:00:00Z')

    expect(getDiffDateText(startDate, endDate)).toBe(2)
  })

  it('should return the correct number of days if the difference is more than a day', () => {
    const startDate = new Date('2024-05-04T00:00:00Z')
    const endDate = new Date('2024-05-06T00:00:00Z')

    expect(getDiffDateText(startDate, endDate)).toBe(3)
  })

  it('should throw a DateOrderError if endDate is before startDate', () => {
    const startDate = new Date('2024-05-05T00:00:00Z')
    const endDate = new Date('2024-05-04T23:40:00Z')

    expect(() => getDiffDateText(startDate, endDate)).toThrow(DateOrderError)
  })
})
