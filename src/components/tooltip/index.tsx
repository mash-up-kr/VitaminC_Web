import { HTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import AccessibleIconButton from '../accessible-icon-button'

const TooltipVariants = cva<{
  color: Record<'orange' | 'neutral', string>
  size: Record<'sm' | 'md' | 'lg', string>
}>(
  `absolute whitespace-nowrap flex gap-2.5 items-center z-10 text-white rounded-full left-0 top-[calc(100%+20px)] after:content-[''] after:absolute after:border-8 after:rounded-sm after:bottom-[calc(100%-11px)] after:left-6  after:rotate-45`,
  {
    variants: {
      color: {
        neutral: `bg-neutral-500 after:border-neutral-500`,
        orange: `bg-orange-400 after:border-orange-400`,
      },
      size: {
        lg: 'px-7 py-5 ',
        md: 'px-5 py-3 ',
        sm: 'px-3 py-2 ',
      },
    },
    defaultVariants: {
      color: 'orange',
      size: 'md',
    },
  },
)

interface TooltipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof TooltipVariants> {
  label: string
  onClose: () => void
  color?: 'orange' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ size, color, className, label, children, onClose, ...props }, ref) => {
    return (
      <div className="relative">
        {children}
        <div
          role="tooltip"
          {...props}
          ref={ref}
          className={cn(TooltipVariants({ color, size }), className)}
        >
          <span className="text-white font-bold leading-tight text-[15px]">
            {label}
          </span>
          <AccessibleIconButton
            label="닫기"
            icon={{
              type: 'close',
              onClick: onClose,
              stroke: 'neutral-000',
              'aria-hidden': true,
            }}
          />
        </div>
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
