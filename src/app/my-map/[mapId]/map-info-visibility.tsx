import type { EditableProps } from './type'

import Typography from '@/components/common/typography'
import BottomModal from '@/components/common/bottom-modal'
import cn from '@/utils/cn'

interface MapInfoVisibilityProps extends EditableProps {
  mapName: string
  isPublic: boolean
}

const MapInfoVisibility = ({
  mapName,
  isPublic,
  openModal,
  handleOpenModal,
  handleChangeMapInfo,
}: MapInfoVisibilityProps) => {
  const handleClickMapReveal = () => {
    console.log(isPublic)
    if (!isPublic) {
      // 비공개 => 공개
      handleOpenModal('visibility')
      return
    }

    // 공개 => 비공개
    handleChangeMapInfo('visibility')
  }

  return (
    <>
      <button
        type="button"
        className="flex rounded-[8px]"
        onClick={handleClickMapReveal}
      >
        <Typography
          size="h6"
          color={isPublic ? 'neutral-300' : 'neutral-000'}
          className={cn(
            'rounded-[8px] px-[6px] py-[3px]',
            !isPublic && 'bg-neutral-500',
          )}
        >
          비공개
        </Typography>
        <Typography
          size="h6"
          color={isPublic ? 'neutral-000' : 'neutral-300'}
          className={cn(
            'rounded-[8px] px-[6px] py-[3px]',
            isPublic && 'bg-orange-400',
          )}
        >
          공개
        </Typography>
      </button>

      <BottomModal
        layout="confirm"
        title={`${mapName} 지도를 공개할까요?`}
        isOpen={openModal === 'visibility'}
        cancelMessage="취소"
        confirmMessage="공개로 전환"
        body={
          '모두가 지도에 참여할 수 있고, 등록된 맛집을 확인하고 좋아요를 누를 수 있어요.'
        }
        onClose={() => handleOpenModal(null)}
        onCancel={() => handleOpenModal(null)}
        onConfirm={() => handleChangeMapInfo('visibility')}
      />
    </>
  )
}

export default MapInfoVisibility
