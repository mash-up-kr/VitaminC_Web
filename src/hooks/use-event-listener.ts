import { useEffect } from 'react'

interface Props {
  type: keyof WindowEventMap
  listener: (event?: Event) => void
  options?: Options
  enabled?: boolean
}

interface Options {
  capture?: boolean
  once?: boolean
  passive?: boolean
  signal?: AbortSignal
}

const useEventListener = ({
  type,
  listener,
  options,
  enabled = true,
}: Props) => {
  useEffect(() => {
    if (enabled) {
      window.addEventListener(type, listener, options)
      return () => void window.removeEventListener(type, listener, true)
    }
  }, [enabled, listener, options, type])
}

export default useEventListener
