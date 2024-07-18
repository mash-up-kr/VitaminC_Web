import { forwardRef } from 'react'

import { Icon, Typography } from './common'
import type { ClassName } from '@/models/interface'

interface IconChipProps extends ClassName {
  label: string
  colorScheme?: 'neutral-800'
  icon: Parameters<typeof Icon>[0]
}

const IconChip = forwardRef<HTMLDivElement, IconChipProps>(
  ({ label, icon }, ref) => {
    return (
      <div
        ref={ref}
        className="flex gap-1 justify-center items-center w-fit rounded-full px-[14px] py-2 bg-neutral-800"
      >
        <Icon type={icon.type} size="lg" aria-hidden />
        <Typography size="body2" className="text-[#dcdcdc]">
          {label}
        </Typography>
      </div>
    )
  },
)

IconChip.displayName = 'IconChip'

export default IconChip
