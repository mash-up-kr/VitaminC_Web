import type { Meta, StoryObj } from '@storybook/react'

import ConfirmCancelButton from '@/components/confirm-cancel-button'

const meta: Meta<typeof ConfirmCancelButton> = {
  title: 'Components/ConfirmCancelButton',
  component: ConfirmCancelButton,
  argTypes: {
    className: {
      control: 'text',
    },
    cancelLabel: {
      control: 'text',
    },
    confirmLabel: {
      control: 'text',
    },
    onCancel: { action: 'cancel' },
    onConfirm: { action: 'confirm' },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmCancelButton>

export const Default: Story = {
  args: {
    className: '',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    onCancel: () => console.log('cancel'),
    onConfirm: () => console.log('confirm'),
  },
}
