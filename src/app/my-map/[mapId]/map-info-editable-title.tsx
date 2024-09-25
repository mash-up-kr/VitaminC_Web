import type { EditableProps } from './type'

import BottomModal from '@/components/common/bottom-modal'
import Typography from '@/components/common/typography'
import Icon from '@/components/common/icon'
import Textarea from '@/components/common/text-area'
import { countCharacters } from '@/utils/string'

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
  const { num } = countCharacters(mapNameInput)
  const isValidInput = mapNameInput && mapNameInput !== mapName
  const isValidLength = MIN_LENGTH <= num && num <= MAX_LENGTH

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
            minLength={MIN_LENGTH}
            maxLength={MAX_LENGTH}
            placeholder="최대 8자 입력"
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
