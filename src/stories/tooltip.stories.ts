import type { Meta, StoryObj } from '@storybook/react'

import Tooltip from '@/components/tooltip'

const meta = {
  title: 'DesignSystem/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['neutral', 'orange'],
    },
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'tooltip Orange example',
    onClose: () => {
      alert('close')
    },
    children: 'tooltip Children',
  },
}

export const Gray: Story = {
  args: {
    color: 'neutral',
    label: 'tooltip Grey example',
    onClose: () => {
      alert('close')
    },
    children: 'tooltip Children',
  },
}
