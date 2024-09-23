import type { EditableProps } from './type'

import BottomModal from '@/components/common/bottom-modal'
import Typography from '@/components/common/typography'
import Icon from '@/components/common/icon'
import Input from '@/components/common/input'

interface MapInfoTitleProps extends EditableProps {
  mapName: string
  mapNameInput: string
  handleChangeInput: (key: 'name', value: string) => void
}
const MIN_LENGTH = 2
const MAX_LENGTH = 8

const MapInfoEditableTitle = ({
  mapName,
  mapNameInput,
  handleChangeInput,
  openModal,
  handleOpenModal,
  handleChangeMapInfo,
}: MapInfoTitleProps) => {
  return (
    <>
      <button
        type="button"
        className="flex items-center gap-1"
        onClick={() => handleOpenModal('name')}
      >
        <Typography size="body0-2" color="neutral-000">
          {mapName}
        </Typography>
        <Icon type="pencil" size="xl" />
      </button>

      <BottomModal
        layout="alert"
        title="어떤 이름으로 바꿀까요?"
        isOpen={openModal === 'name'}
        confirmMessage="이름 변경"
        body={
          <Input
            ref={(node) => node?.focus()}
            value={mapNameInput}
            onChange={(value) => handleChangeInput('name', value)}
            minLength={MIN_LENGTH}
            maxLength={MAX_LENGTH}
            placeholder="지도명 최대 8글자"
          />
        }
        onClose={() => handleOpenModal(null)}
        onCancel={() => handleOpenModal(null)}
        onConfirm={() => handleChangeMapInfo('name')}
        disabled={!mapNameInput || mapNameInput === mapName}
      />
    </>
  )
}

export default MapInfoEditableTitle
