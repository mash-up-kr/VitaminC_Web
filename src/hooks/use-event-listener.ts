import { useEffect } from 'react'

interface Options {
  capture?: boolean
  once?: boolean
  passive?: boolean
  signal?: AbortSignal
}

const useEventListener = (
  type: string | null,
  listener: (event?: Event) => void,
  options?: Options,
) => {
  useEffect(() => {
    if (type) {
      window.addEventListener(type, listener, options)
      return () => void window.removeEventListener(type, listener, true)
    }
  }, [listener, options, type])
}

export default useEventListener
