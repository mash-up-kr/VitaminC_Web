import { HTMLAttributes, forwardRef } from 'react'

import cn from '@/utils/cn'
import { VariantProps, cva } from 'class-variance-authority'
import AccessibleIconButton from './accessible-icon-button'
import Typography from './common/typography'
import RoundedTriangle from './common/icons/RoundedTriangle.svg'
import { Icon } from '.'

/* Polygon 3 */

const TooltipVariants = cva<{
  color: Record<'orange' | 'neutral', string>
  size: Record<'sm' | 'md' | 'lg', string>
}>(
  `absolute whitespace-nowrap flex gap-2.5 items-center z-10 text-white rounded-full left-0 top-[calc(100%+20px)] 
  `,
  {
    variants: {
      color: {
        neutral: `bg-neutral-500`,
        orange: `bg-orange-400`,
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
      <div className="relative ">
        {children}
        <div
          role="tooltip"
          {...props}
          ref={ref}
          className={cn(TooltipVariants({ color, size }), className)}
        >
          <Typography size="h5-2" className="text-white">
            {label}
          </Typography>
          <Icon
            type="roundedTriangle"
            className="absolute bottom-[calc(100%-6px)] left-5 w-[22px] h-[18px]"
          />
          <AccessibleIconButton
            label="닫기"
            icon={{
              type: 'close',
              onClick: onClose,
              stroke: 'neutral-000',
              'aria-hidden': true,
              size: 'sm',
            }}
          />
        </div>
      </div>
    )
  },
)

Tooltip.displayName = 'Tooltip'

export default Tooltip
