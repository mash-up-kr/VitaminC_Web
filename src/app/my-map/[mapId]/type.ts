export type EditableMapInfo = 'name' | 'visibility' | 'description'

export type OpenModal = EditableMapInfo | null

export interface EditableProps {
  openModal: OpenModal
  handleOpenModal: (key: OpenModal) => void
  handleChangeMapInfo: (key: EditableMapInfo) => void
}
