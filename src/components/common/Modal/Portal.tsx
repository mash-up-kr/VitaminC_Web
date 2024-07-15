import { createPortal } from 'react-dom'
import { Children, useEffect, useState } from 'react'
import type { PropsWithChildren, RefObject } from 'react'

import { useIsServer } from '@/hooks/use-is-server'

interface PortalProps {
  id: string
  containerRef?: RefObject<HTMLElement>
}

const Portal = ({
  id,
  children,
  containerRef,
}: PropsWithChildren<PortalProps>) => {
  const isServer = useIsServer()
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (isServer) return

    let portalElement = containerRef?.current ?? document.getElementById(id)
    if (portalElement) {
      setElement(portalElement)
      return () => {
        portalElement?.remove()
      }
    }

    portalElement = document.createElement('div')
    portalElement.id = id
    document.body.appendChild(portalElement)
    setElement(portalElement)

    return () => {
      portalElement?.remove()
    }
  }, [id, containerRef, isServer])

  if (isServer) {
    return children
  }

  if (!element) {
    return null
  }

  return <>{Children.map(children, (child) => createPortal(child, element))}</>
}

export default Portal
