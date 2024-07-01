import { cva } from 'class-variance-authority'
import { forwardRef, type RefObject } from 'react'
import Typography from './typography'
import cn from '@/utils/cn'

const AvatarVariants = cva<{
  colorScheme: Record<
    'coral' | 'dark-blue' | 'sky-blue' | 'violet' | 'green',
    string
  >
}>('flex items-center w-9 h-9 justify-center box-border rounded-full', {
  variants: {
    colorScheme: {
      coral: 'bg-profile-coral',
      'dark-blue': 'bg-profile-dark-blue',
      'sky-blue': 'bg-profile-sky-blue',
      violet: 'bg-profile-violet',
      green: 'bg-profile-green',
    },
  },
  defaultVariants: {
    colorScheme: 'coral',
  },
})

interface AvatarProps {
  value: string
  colorScheme?: 'coral' | 'dark-blue' | 'sky-blue' | 'violet' | 'green'
  className?: string
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ value, colorScheme, className }, ref) => {
    const initial = value.charAt(0)

    return (
      <Typography
        ref={ref as RefObject<HTMLDivElement>}
        as="span"
        size="h4"
        color="neutral-000"
        className={cn(AvatarVariants({ colorScheme }), className)}
      >
        {initial}
      </Typography>
    )
  },
)

Avatar.displayName = 'avatar'

export default Avatar
