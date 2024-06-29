import { Meta, StoryObj } from '@storybook/react'

import { QRCode } from '@/components'

const meta: Meta<typeof QRCode> = {
  title: 'Components/QRCode',
  component: QRCode,
  argTypes: {
    url: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof QRCode>

export const Default: Story = {
  args: {
    url: 'https://example.com',
  },
}

export const CustomURL: Story = {
  args: {
    url: 'https://custom-url.com',
  },
}
