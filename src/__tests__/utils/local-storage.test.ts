import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LocalStorageManager } from '@/utils/storage/local-storage'

describe('LocalStorageManager', () => {
  const TEST_KEY = '@@testKey'
  const INITIAL_VALUE = '@@polee'
  const UPDATED_VALUE = '@@polee-updated'

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with the initial value', () => {
    const testStore = new LocalStorageManager<string>(TEST_KEY, INITIAL_VALUE)

    expect(testStore.getValueOrNull()).toBe(INITIAL_VALUE)
  })

  it('should set and get the value correctly', () => {
    const testStore = new LocalStorageManager<string>(TEST_KEY, INITIAL_VALUE)

    testStore.set(UPDATED_VALUE)
    expect(testStore.getValueOrNull()).toBe(UPDATED_VALUE)
  })

  it('should remove the value correctly with returning null', () => {
    const testStore = new LocalStorageManager<string>(TEST_KEY, INITIAL_VALUE)

    testStore.set(UPDATED_VALUE)
    testStore.remove()
    expect(testStore.getValueOrNull()).toBeNull()
  })

  it('should trigger the change handler on value change', () => {
    const testStore = new LocalStorageManager<string>(TEST_KEY, INITIAL_VALUE)

    const mockHandler = vi.fn()
    testStore.onChange(mockHandler)

    testStore.set(UPDATED_VALUE)
    expect(mockHandler).toHaveBeenCalledWith(TEST_KEY, UPDATED_VALUE)

    testStore.remove()
    expect(mockHandler).toHaveBeenCalledWith(TEST_KEY, null)
  })

  it('should fallback to inMemoryStorage if localStorage is not available', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('can not use localStorage case')
    })
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('can not use localStorage case')
    })

    const testStore = new LocalStorageManager<string>(TEST_KEY, INITIAL_VALUE)

    testStore.set(UPDATED_VALUE)
    expect(testStore.getValueOrNull()).toBe(UPDATED_VALUE)
    expect(testStore.getInMemoryStorage().get(TEST_KEY)).toBe(UPDATED_VALUE)

    testStore.remove()
    expect(testStore.getValueOrNull()).toBeNull()
    expect(testStore.getInMemoryStorage().get(TEST_KEY)).toBeNull()
  })
})
