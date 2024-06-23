import { useEffect, useState, useRef, useCallback } from 'react'

export interface RectReadOnly {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number
  [key: string]: number
}

type HTMLOrSVGElement = HTMLElement | SVGElement

type Result = [
  (element: HTMLOrSVGElement | null) => void,
  RectReadOnly,
  () => void,
]

type State = {
  element: HTMLOrSVGElement | null
  scrollContainers: HTMLOrSVGElement[] | null
  resizeObserver: ResizeObserver | null
  lastBounds: RectReadOnly
}

export type Options = {
  scroll?: boolean
  offsetSize?: boolean
}

// Adds native resize listener to window
const useOnWindowResize = (onWindowResize: (event: Event) => void) => {
  useEffect(() => {
    const cb = onWindowResize
    window.addEventListener('resize', cb)
    return () => void window.removeEventListener('resize', cb)
  }, [onWindowResize])
}
const useOnWindowScroll = (onScroll: () => void, enabled: boolean) => {
  useEffect(() => {
    if (enabled) {
      const cb = onScroll
      window.addEventListener('scroll', cb, { capture: true, passive: true })
      return () => void window.removeEventListener('scroll', cb, true)
    }
  }, [onScroll, enabled])
}

// Returns a list of scroll offsets
const findScrollContainers = (
  element: HTMLOrSVGElement | null,
): HTMLOrSVGElement[] => {
  const result: HTMLOrSVGElement[] = []
  if (!element || element === document.body) return result
  const { overflow, overflowX, overflowY } = window.getComputedStyle(element)
  if (
    [overflow, overflowX, overflowY].some(
      (prop) => prop === 'auto' || prop === 'scroll',
    )
  )
    result.push(element)
  return [...result, ...findScrollContainers(element.parentElement)]
}

const useMeasure = (
  { scroll, offsetSize }: Options = {
    scroll: false,
    offsetSize: false,
  },
): Result => {
  const [bounds, set] = useState<RectReadOnly>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  })

  // keep all state in a ref
  const state = useRef<State>({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: bounds,
  })

  // make sure to update state only as long as the component is truly mounted
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    return () => void (mounted.current = false)
  })

  // memoize handlers, so event-listeners know when they should update
  const handleChange = useCallback(() => {
    if (!state.current.element) return
    const { left, top, width, height, bottom, right, x, y } =
      state.current.element.getBoundingClientRect() as unknown as RectReadOnly

    const size = {
      left,
      top,
      width,
      height,
      bottom,
      right,
      x,
      y,
    }

    if (state.current.element instanceof HTMLElement && offsetSize) {
      size.height = state.current.element.offsetHeight
      size.width = state.current.element.offsetWidth
    }

    Object.freeze(size)
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (mounted.current && !areBoundsEqual(state.current.lastBounds, size))
      set((state.current.lastBounds = size))
  }, [set, offsetSize])

  // cleanup current scroll-listeners / observers
  const removeListeners = useCallback(() => {
    if (state.current.scrollContainers) {
      state.current.scrollContainers.forEach((element) =>
        element.removeEventListener('scroll', handleChange, true),
      )
      state.current.scrollContainers = null
    }

    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect()
      state.current.resizeObserver = null
    }
  }, [handleChange])

  // add scroll-listeners / observers
  const addListeners = useCallback(() => {
    if (!state.current.element) return
    state.current.resizeObserver = new ResizeObserver(handleChange)
    state.current.resizeObserver!.observe(state.current.element)
    if (scroll && state.current.scrollContainers) {
      state.current.scrollContainers.forEach((scrollContainer) =>
        scrollContainer.addEventListener('scroll', handleChange, {
          capture: true,
          passive: true,
        }),
      )
    }
  }, [scroll, handleChange])

  // the ref we expose to the user
  const ref = (node: HTMLOrSVGElement | null) => {
    if (!node || node === state.current.element) return
    removeListeners()
    state.current.element = node
    state.current.scrollContainers = findScrollContainers(node)
    addListeners()
  }

  // add general event listeners
  useOnWindowScroll(handleChange, Boolean(scroll))
  useOnWindowResize(handleChange)

  // respond to changes that are relevant for the listeners
  useEffect(() => {
    removeListeners()
    addListeners()
  }, [scroll, handleChange, handleChange, removeListeners, addListeners])

  // remove all listeners when the components unmounts
  useEffect(() => removeListeners, [removeListeners])
  return [ref, bounds, handleChange]
}

// Checks if element boundaries are equal
const keys: (keyof RectReadOnly)[] = [
  'x',
  'y',
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height',
]
const areBoundsEqual = (a: RectReadOnly, b: RectReadOnly): boolean =>
  keys.every((key) => a[key] === b[key])

export default useMeasure
