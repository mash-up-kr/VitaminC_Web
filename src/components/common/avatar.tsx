import { cva } from 'class-variance-authority'
import { forwardRef, type RefObject } from 'react'
import Typography from './typography'
import cn from '@/utils/cn'

const AvatarVariants = cva<{
  colorScheme: Record<
    'coral' | 'dark-blue' | 'sky-blue' | 'violet' | 'green',
    string
  >
}>(
  'flex items-center w-9 h-9 justify-center box-border rounded-full relative',
  {
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
  },
)

interface AvatarProps {
  value: string
  me?: boolean
  colorScheme?: 'coral' | 'dark-blue' | 'sky-blue' | 'violet' | 'green'
  className?: string
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ value, colorScheme, className, me = false }, ref) => {
    const initial = value ? value.charAt(0) : '🍋'

    return (
      <Typography
        ref={ref as RefObject<HTMLDivElement>}
        as="span"
        size="h4"
        color="neutral-000"
        className={cn(AvatarVariants({ colorScheme }), className)}
      >
        {initial}
        {me && (
          <Typography
            size="h7"
            color="neutral-100"
            className="absolute top-[-4px] right-[-4px] rounded-full w-5 h-5 bg-neutral-800 flex justify-center items-center"
          >
            나
          </Typography>
        )}
      </Typography>
    )
  },
)

Avatar.displayName = 'avatar'

export default Avatar
