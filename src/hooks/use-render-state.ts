import { useCallback, useState } from 'react'

type MountState = 'unmounted' | 'mounting' | 'mounted' | 'unmounting'

const useRenderState = (
  initialState: MountState,
): [MountState, (nextState: MountState) => void] => {
  const [state, setState] = useState<MountState>(initialState)

  const transition = useCallback((nextState: MountState) => {
    setState((prevState) => {
      if (prevState !== nextState) {
        return nextState
      }
      return prevState
    })
  }, [])

  return [state, transition]
}

export default useRenderState
