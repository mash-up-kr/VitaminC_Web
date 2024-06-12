import React, { ButtonHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import cn from '@/utils/cn'

const ButtonVariants = cva(
  `
  font-[700] border-0 rounded-[3em] cursor-pointer inline-block leading-normal
  `,
  {
    variants: {
      size: {
        sm: 'text-[12px] py-[10px] px-[16px]',
        md: 'text-[14px] py-[11px] px-[20px]',
        lg: 'text-[16px] py-[12px] px-[24px]',
      },
      variant: {
        primary: 'text-white bg-[#1ea7fd]',
        secondary: 'text-[#333] bg-transparent shadow-md',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  /**
   * What background color to use
   */
  bgColor?: string
  /**
   * Button contents
   */
  label: string
  /**
   * Additional styling using tailwind
   */
  className?: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  size,
  variant,
  bgColor,
  label,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor }}
      className={cn(ButtonVariants({ size, variant }), className)}
      {...props}
    >
      {label}
    </button>
  )
}
