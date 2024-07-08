import type { MutableRefObject, LegacyRef, RefCallback } from 'react'

export const mergeRefs = <T = HTMLElement>(
  refs: (MutableRefObject<T> | LegacyRef<T>)[],
): RefCallback<T> => {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref) {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    })
  }
}
