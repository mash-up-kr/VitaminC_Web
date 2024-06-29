import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import type { IconKey } from './common/icon'
import type { ColorKey } from '@/types/color'
import { Icon, VisuallyHidden } from './common'

interface AccessibleIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconType: IconKey
  /**
   * 스크린 리더기에서만 읽을 수 있는 라벨입니다.
   */
  label: string
  width?: number | string
  height?: number | string
  fill?: ColorKey
  stroke?: ColorKey
}

const AccessibleIconButton = forwardRef<
  HTMLButtonElement,
  AccessibleIconButtonProps
>(({ iconType, label, width, height, fill, stroke, ...props }, ref) => (
  <button type="button" ref={ref} {...props}>
    <VisuallyHidden>
      <div role="text">{label}</div>
    </VisuallyHidden>
    <Icon type={iconType} fill={fill} stroke={stroke} aria-hidden />
  </button>
))

AccessibleIconButton.displayName = 'AccessibleIconButton'

export default AccessibleIconButton
