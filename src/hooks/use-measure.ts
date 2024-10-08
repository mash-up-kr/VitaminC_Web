import { useCallback, useEffect, useRef, useState } from 'react'

import useEventListener from './use-event-listener'
import useMount from './use-mount'
import debounce from 'lodash.debounce'

interface RectReadOnly {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number
}

type HTMLOrSVGElement = HTMLElement | SVGElement

type State = {
  element: HTMLOrSVGElement | null
  scrollContainers: HTMLOrSVGElement[] | null
  resizeObserver: ResizeObserver | null
  lastBounds: RectReadOnly
}

type Options = {
  scroll?: boolean
  offsetSize?: boolean
}

const DEBOUNCE_WAIT = 250

// 스크롤 offset을 담은 배열 생성
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

const useMeasure = (
  { scroll, offsetSize }: Options = {
    scroll: false,
    offsetSize: false,
  },
): [(element: HTMLOrSVGElement | null) => void, RectReadOnly, () => void] => {
  const [bounds, setBounds] = useState<RectReadOnly>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
  })

  const state = useRef<State>({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: bounds,
  })

  const mounted = useMount()
  const handleChange = useCallback(() => {
    if (!state.current.element) return
    const { left, top, width, height, bottom, right, x, y } =
      state.current.element.getBoundingClientRect()

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

    if (mounted.current && !areBoundsEqual(state.current.lastBounds, size)) {
      setBounds((state.current.lastBounds = size))
    }
  }, [setBounds, offsetSize, mounted])

  const debouncedHandleChange = useCallback(() => {
    debounce(() => {
      handleChange()
    }, DEBOUNCE_WAIT)()
  }, [handleChange])

  const removeListeners = useCallback(() => {
    if (state.current.scrollContainers) {
      state.current.scrollContainers.forEach((element) =>
        element.removeEventListener('scroll', debouncedHandleChange, true),
      )
      state.current.scrollContainers = null
    }

    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect()
      state.current.resizeObserver = null
    }
  }, [debouncedHandleChange])

  const addListeners = useCallback(() => {
    if (!state.current.element) return

    state.current.resizeObserver = new ResizeObserver(debouncedHandleChange)
    state.current.resizeObserver!.observe(state.current.element)

    if (scroll && state.current.scrollContainers) {
      state.current.scrollContainers.forEach((scrollContainer) =>
        scrollContainer.addEventListener('scroll', debouncedHandleChange, {
          capture: true,
          passive: true,
        }),
      )
    }
  }, [scroll, debouncedHandleChange])

  // 크기를 측정할 DOM에 접근하기 위한 ref
  const ref = (node: HTMLOrSVGElement | null) => {
    if (!node || node === state.current.element) return
    removeListeners()
    state.current.element = node
    state.current.scrollContainers = findScrollContainers(node)
    addListeners()
  }

  useEventListener({
    type: 'scroll',
    listener: debouncedHandleChange,
    options: {
      capture: true,
      passive: true,
    },
    enabled: Boolean(scroll),
  })
  useEventListener({ type: 'resize', listener: debouncedHandleChange })

  useEffect(() => {
    removeListeners()
    addListeners()
  }, [scroll, debouncedHandleChange, removeListeners, addListeners])

  useEffect(() => {
    return () => {
      removeListeners()
    }
  }, [removeListeners])

  return [ref, bounds, debouncedHandleChange]
}

export default useMeasure
