import type { CSSProperties } from 'react'
import { startTransition, useEffect, useState } from 'react'

import useRenderState from './use-render-state'

const DEFAULT_DELAY = 500

const useModalTransition = (
  isOpen: boolean,
  initial?: CSSProperties,
  animate?: CSSProperties,
  exit?: CSSProperties,
  delay: number = DEFAULT_DELAY,
) => {
  const [state, transition] = useRenderState('unmounted')
  const [styles, setStyles] = useState(initial)

  useEffect(() => {
    if (isOpen && state === 'unmounted') {
      startTransition(() => {
        transition('mounting')
        setStyles({ ...initial, transition: `all ${delay}ms ease-in` })

        setTimeout(() => {
          transition('mounted')
          setStyles({
            ...animate,
            transition: `all ${delay}ms ease-in`,
          })
        }, 0)
      })
    } else if (!isOpen && state === 'mounted') {
      transition('unmounting')
      setStyles({
        ...exit,
        transition: `all ${delay}ms ease-out`,
      })

      setTimeout(() => {
        transition('unmounted')
      }, 300)
    }
  }, [isOpen, state, initial, animate, exit, transition, delay])

  return { state, styles }
}

export default useModalTransition
