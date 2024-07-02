import { forwardRef } from 'react'
import { Chip } from '.'

interface PickChipProps {
  isMyPick: boolean
}

const PickChip = forwardRef<HTMLSpanElement, PickChipProps>(
  ({ isMyPick }, ref) => {
    return (
      <Chip
        ref={ref}
        colorScheme={isMyPick ? 'orange' : 'purple'}
      >{`${isMyPick ? '나의 ' : ''}Pick`}</Chip>
    )
  },
)

PickChip.displayName = 'PickChip'

export default PickChip
