import type { ClassName } from '@/models/interface'
import cn from '@/utils/cn'
import AccessibleIconButton from '../accessible-icon-button'
import { Button } from '../common'

interface PlaceActionButtonsProps extends ClassName {
  like?: boolean
  onLikePlace: VoidFunction
  onUnLikePlace: VoidFunction
  onDeletePlace: VoidFunction
}

const PlaceActionButtons = ({
  className,
  like,
  onLikePlace,
  onUnLikePlace,
  onDeletePlace,
}: PlaceActionButtonsProps) => {
  return (
    <div
      className={cn(
        'flex h-[94px] w-full items-center justify-center gap-2',
        className,
      )}
    >
      <div className="flex min-h-[54px] min-w-[54px] items-center justify-center rounded-full bg-neutral-500">
        <AccessibleIconButton
          icon={{
            size: 'xl',
            type: 'heartStraightFilled',
            fill: like ? 'orange-400' : 'neutral-100',
          }}
          label={like ? '해당 장소 좋아요' : '해당 장소 싫어요'}
          onClick={like ? onUnLikePlace : onLikePlace}
        />
      </div>
      <Button colorScheme="neutral" onClick={onDeletePlace}>
        맛집 삭제하기
      </Button>
    </div>
  )
}

export default PlaceActionButtons
