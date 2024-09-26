import type { EditableProps } from './type'

import BottomModal from '@/components/common/bottom-modal'
import Typography from '@/components/common/typography'
import Icon from '@/components/common/icon'
import Textarea from '@/components/common/text-area'
import { countCharacters } from '@/utils/string'
import { MAX_MAP_NAME_LENGTH, MIN_MAP_NAME_LENGTH } from '@/constants/input'

interface MapInfoTitleProps extends EditableProps {
  mapName: string
  mapNameInput: string
  handleChangeInput: (key: 'name', value: string) => void
}

const MapInfoEditableTitle = ({
  mapName,
  mapNameInput,
  handleChangeInput,
  openModal,
  handleOpenModal,
  handleChangeMapInfo,
}: MapInfoTitleProps) => {
  const { num } = countCharacters(mapNameInput)
  const isValidInput = mapNameInput && mapNameInput !== mapName
  const isValidLength = MIN_MAP_NAME_LENGTH <= num && num <= MAX_MAP_NAME_LENGTH

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
        title="지도의 이름을 변경해주세요"
        isOpen={openModal === 'name'}
        confirmMessage="변경"
        body={
          <Textarea
            ref={(node) => node?.focus()}
            value={mapNameInput}
            onChange={(value) => handleChangeInput('name', value)}
            minLength={MIN_MAP_NAME_LENGTH}
            maxLength={MAX_MAP_NAME_LENGTH}
          />
        }
        onClose={() => handleOpenModal(null)}
        onCancel={() => handleOpenModal(null)}
        onConfirm={() => handleChangeMapInfo('name')}
        disabled={!isValidInput || !isValidLength}
      />
    </>
  )
}

export default MapInfoEditableTitle
