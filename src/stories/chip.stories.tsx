import type { Meta, StoryObj } from '@storybook/react'

import Chip from '@/components/common/chip'

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    colorScheme: {
      control: { type: 'radio' },
      options: ['neutral'],
    },
    children: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  args: {
    colorScheme: 'neutral-400',
    children: '#혼밥',
  },
}
