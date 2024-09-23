import type { EditableProps } from './type'

import BottomModal from '@/components/common/bottom-modal'
import Typography from '@/components/common/typography'
import Icon from '@/components/common/icon'
import Input from '@/components/common/input'
import get조사 from '@/utils/조사'

interface MapInfoDescriptionProps extends EditableProps {
  mapName: string
  mapDescription: string
  mapDescriptionInput: string
  handleChangeInput: (key: 'description', value: string) => void
}
const MIN_LENGTH = 0
const MAX_LENGTH = 30

const MapInfoEditableDescription = ({
  mapName,
  mapDescription,
  mapDescriptionInput,
  handleChangeInput,
  openModal,
  handleOpenModal,
  handleChangeMapInfo,
}: MapInfoDescriptionProps) => {
  return (
    <>
      <button
        type="button"
        className="flex items-center gap-1"
        onClick={() => handleOpenModal('description')}
      >
        <Typography size="body1" color="neutral-200">
          {mapDescription ??
            `${mapName}${get조사(mapName, '은/는')} 어떤 지도인가요?`}
        </Typography>
        <Icon type="pencil" size="md" fill="neutral-200" />
      </button>

      <BottomModal
        layout="alert"
        title="지도의 한 줄 소개를 적어주세요"
        isOpen={openModal === 'description'}
        confirmMessage="변경"
        body={
          <Input
            ref={(node) => node?.focus()}
            value={mapDescriptionInput}
            onChange={(value) => handleChangeInput('description', value)}
            minLength={MIN_LENGTH}
            maxLength={MAX_LENGTH}
            placeholder="최대 30자 입력"
          />
        }
        onClose={() => handleOpenModal(null)}
        onCancel={() => handleOpenModal(null)}
        onConfirm={() => handleChangeMapInfo('description')}
        disabled={
          !mapDescriptionInput || mapDescriptionInput === mapDescription
        }
      />
    </>
  )
}

export default MapInfoEditableDescription
