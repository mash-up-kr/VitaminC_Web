import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import Icon from '@/components/common/icon'
import VisuallyHidden from '@/components/common/visually-hidden'

interface AccessibleIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Parameters<typeof Icon>[0]
  /**
   * 스크린 리더기에서만 읽을 수 있는 라벨입니다.
   */
  label: string
}

const AccessibleIconButton = forwardRef<
  HTMLButtonElement,
  AccessibleIconButtonProps
>(({ icon, label, ...props }, ref) => (
  <button type="button" ref={ref} {...props}>
    <VisuallyHidden>
      <div role="text">{label}</div>
    </VisuallyHidden>
    <Icon {...icon} aria-hidden />
  </button>
))

AccessibleIconButton.displayName = 'AccessibleIconButton'

export default AccessibleIconButton
