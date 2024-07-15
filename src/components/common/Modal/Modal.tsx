import type {
  CSSProperties,
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactNode,
  RefObject,
} from 'react'
import { forwardRef, useEffect, useId, useRef } from 'react'

import cn from '@/utils/cn'
import Portal from './Portal'
import type { ClassName } from '@/models/interface'
import { mergeRefs } from '@/utils/merge-refs'
import useEventListener from '@/hooks/use-event-listener'
import { useClickOutside } from '@/hooks/use-click-outside'
import useModalTransition from '@/hooks/use-modal-transition'

export interface ModalProps extends ClassName {
  children: ReactNode
  onClose: VoidFunction
  isOpen: boolean
  shouldCloseOnDimClick?: boolean
  initial?: CSSProperties
  animate?: CSSProperties
  exit?: CSSProperties
  delayTiming?: string
  preventBackgroundScroll?: boolean
  shouldCloseOnEsc?: boolean
  dimClassName?: string
  mountNode?: RefObject<HTMLElement>
  ariaLabelledby?: string
  ariaDescribedby?: string
}

const Backdrop = (props: ComponentPropsWithoutRef<'div'>) => {
  return <div {...props} />
}

const Modal = forwardRef(
  (props: ModalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      children,
      onClose,
      isOpen,
      initial,
      animate,
      exit,
      ariaLabelledby,
      ariaDescribedby,
      mountNode,
      className,
      dimClassName,
      delayTiming = '0.3s',
      preventBackgroundScroll = true,
      shouldCloseOnDimClick = true,
      shouldCloseOnEsc = true,
    } = props
    const portalId = useId()
    const modalRef = useRef<HTMLDivElement>(null)
    const { state, styles: animationStyles } = useModalTransition(
      isOpen,
      initial,
      animate,
      exit,
      delayTiming,
    )

    useEventListener({
      type: 'keydown',
      listener: (event) => {
        if (shouldCloseOnEsc && event.key === 'Escape') {
          onClose()
        }
      },
    })

    useEffect(() => {
      if (preventBackgroundScroll && state !== 'unmounted') {
        document.body.style.overflow = 'hidden'
      }

      return () => {
        if (preventBackgroundScroll) {
          document.body.style.overflow = ''
        }
      }
    }, [preventBackgroundScroll, state])

    useClickOutside(modalRef, () => {
      if (shouldCloseOnDimClick) {
        onClose()
      }
    })

    if (!isOpen && state === 'unmounted') {
      return null
    }

    return (
      <Portal id={portalId} containerRef={mountNode}>
        <Backdrop
          className={cn(
            'fixed top-0 left-0 right-0 bottom-0 z-[9995] bg-black opacity-[0.85]',
            dimClassName,
          )}
          aria-hidden={!shouldCloseOnDimClick}
          aria-label={shouldCloseOnDimClick ? '화면 닫기' : ''}
        />

        <div
          ref={mergeRefs([modalRef, ref])}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          className={cn(
            'fixed top-1/2 left-1/2 z-[9996] -translate-y-1/2 -translate-x-1/2',
            className,
          )}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          style={animationStyles}
        >
          {children}
        </div>
      </Portal>
    )
  },
)

Modal.displayName = 'Modal'

export default Modal
