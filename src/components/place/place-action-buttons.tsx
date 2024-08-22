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
        'w-full h-[94px] flex gap-2 justify-center items-center',
        className,
      )}
    >
      <div className="min-w-[54px] min-h-[54px] rounded-full flex justify-center items-center bg-neutral-500">
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
