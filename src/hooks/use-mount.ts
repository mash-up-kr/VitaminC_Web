import { useEffect, useRef } from 'react'

const useMount = () => {
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    return () => void (mounted.current = false)
  }, [])

  return mounted
}

export default useMount
