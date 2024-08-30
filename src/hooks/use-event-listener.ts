import { useEffect } from 'react'

interface EventListenerProps<K extends keyof WindowEventMap> {
  type: K
  listener: (event: WindowEventMap[K]) => void
  options?: Options
  enabled?: boolean
}

interface Options {
  capture?: boolean
  once?: boolean
  passive?: boolean
  signal?: AbortSignal
}

const useEventListener = <K extends keyof WindowEventMap>({
  type,
  listener,
  options,
  enabled = true,
}: EventListenerProps<K>) => {
  useEffect(() => {
    if (enabled) {
      window.addEventListener(type, listener, options)
      return () => void window.removeEventListener(type, listener, true)
    }
  }, [enabled, listener, options, type])
}

export default useEventListener
