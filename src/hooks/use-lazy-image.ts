import type { RefObject } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

const isIntersectionObserverSupported = () =>
  'IntersectionObserver' in window &&
  'IntersectionObserverEntry' in window &&
  'intersectionRatio' in window.IntersectionObserverEntry.prototype

interface UseLazyImageProps {
  src: string
  options: {
    root?: IntersectionObserver['root']
    rootMargin?: IntersectionObserver['rootMargin']
    threshold?: number | number[]
    onLoadComplete?: VoidFunction
    onInView?: VoidFunction
  }
}

const noop = () => {}

const isHTMLImageElement = ($element: Element): $element is HTMLImageElement =>
  $element instanceof HTMLImageElement

export const useLazyImage = ({
  src,
  options: {
    rootMargin,
    threshold,
    root,
    onInView = noop,
    onLoadComplete = noop,
  },
}: UseLazyImageProps): {
  ref: RefObject<HTMLImageElement>
  isLoading: boolean
  inView: boolean
} => {
  const ref = useRef<HTMLImageElement>(null)
  const [inView, setInView] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onInViewEvent = useCallback(() => {
    onInView()
  }, [onInView])
  const onLoadCompleteEvent = useCallback(() => {
    onLoadComplete()
  }, [onLoadComplete])

  const registerLoadImageEvent = useCallback(
    ($image: HTMLImageElement) => {
      setIsLoading(true)

      $image.onload = () => {
        onLoadCompleteEvent()
        setIsLoading(false)
      }
    },
    [onLoadCompleteEvent],
  )

  const injectSrcOnImage = useCallback(
    ($image: HTMLImageElement) => {
      if (!src) return

      $image.src = src

      if ($image.complete) {
        onLoadCompleteEvent()
        return
      }
      registerLoadImageEvent($image)
    },
    [src, registerLoadImageEvent, onLoadCompleteEvent],
  )

  const intersectionAction = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (!entry || !entry.isIntersecting) return

      const $target = entry.target

      if (isHTMLImageElement($target)) {
        injectSrcOnImage($target)
        setInView(true)
        onInViewEvent()

        observer.unobserve($target)
      }
    },
    [injectSrcOnImage, onInViewEvent],
  )

  useEffect(() => {
    const $image = ref.current

    if (!$image) return

    if (!isIntersectionObserverSupported()) return

    const observer = new IntersectionObserver(intersectionAction, {
      root,
      rootMargin,
      threshold,
    })

    observer.observe($image)

    return () => {
      observer.unobserve($image)
    }
  }, [
    root,
    threshold,
    rootMargin,
    registerLoadImageEvent,
    injectSrcOnImage,
    intersectionAction,
  ])

  return {
    ref,
    isLoading,
    inView,
  }
}
