import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

import useRenderState from './use-render-state'

const useModalTransition = (
  isOpen: boolean,
  initial?: CSSProperties,
  animate?: CSSProperties,
  exit?: CSSProperties,
  delay: string = '0.3s',
) => {
  const [state, transition] = useRenderState('unmounted')
  const [styles, setStyles] = useState(initial)

  useEffect(() => {
    if (isOpen && state === 'unmounted') {
      transition('mounting')
      setStyles({ ...initial, transition: `all ${delay} ease-in` })

      setTimeout(() => {
        transition('mounted')
        setStyles({
          ...animate,
          transition: `all ${delay}`,
        })
      }, 100)
    } else if (!isOpen && state === 'mounted') {
      transition('unmounting')
      setStyles({
        ...exit,
        transition: `all ${delay} ease-out`,
      })

      setTimeout(() => {
        transition('unmounted')
      }, 300)
    }
  }, [isOpen, state, initial, animate, exit, transition, delay])

  return { state, styles }
}

export default useModalTransition
