import { cva } from 'class-variance-authority'
import { forwardRef, type RefObject } from 'react'
import Typography from './typography'
import cn from '@/utils/cn'
import Spinner from '../spinner'

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
  loading?: boolean
  colorScheme?: 'coral' | 'dark-blue' | 'sky-blue' | 'violet' | 'green'
  className?: string
}

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ value, colorScheme, className, me = false, loading = false }, ref) => {
    const initial = value ? Array.from(value)[0] : '🍋'

    return (
      <Typography
        ref={ref as RefObject<HTMLDivElement>}
        as="span"
        size="h4"
        color="neutral-000"
        className={cn(AvatarVariants({ colorScheme }), className)}
      >
        {loading ? <Spinner /> : <span>{initial}</span>}
        {me && (
          <Typography
            size="h7"
            color="neutral-100"
            className="absolute right-[-4px] top-[-4px] flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800"
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
