import type { RefObject } from 'react'
import { useCallback } from 'react'

import useEventListener from './use-event-listener'

type ClickOutsideEventType = Extract<
  keyof WindowEventMap,
  | 'mousedown'
  | 'mouseup'
  | 'touchstart'
  | 'touchend'
  | 'pointerdown'
  | 'pointerup'
>

export function useClickOutside<K extends ClickOutsideEventType>(
  target: RefObject<HTMLElement>,
  handler: (evt: WindowEventMap[K]) => void,
  options?: { type: K },
) {
  const eventType: K = options?.type ?? ('pointerdown' as K)

  const listener = useCallback(
    (event: WindowEventMap[K]) => {
      const el = target.current
      if (!el) return

      if (el === event.target || event.composedPath().includes(el)) return

      handler(event)
    },
    [handler, target],
  )

  const eventListenerProps: Parameters<typeof useEventListener<K>>[0] = {
    type: eventType,
    listener,
    options: {
      passive: true,
    },
  }

  return useEventListener(eventListenerProps)
}
