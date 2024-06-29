import type { Meta, StoryObj } from '@storybook/react'

import { Icon } from '@/components'
import { icons } from '@/components/common/icons'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    type: {
      control: 'select',
      options: Object.keys(icons),
    },
    stroke: {
      control: 'select',
      options: [
        'neutral-000',
        'neutral-100',
        'neutral-200',
        'neutral-300',
        'neutral-400',
        'neutral-500',
        'neutral-600',
        'neutral-700',
        'neutral-800',
        'orange',
        'blue',
        'purple',
        'yellow',
        'pink',
        'green',
      ],
    },
    fill: {
      control: 'select',
      options: [
        'neutral-000',
        'neutral-100',
        'neutral-200',
        'neutral-300',
        'neutral-400',
        'neutral-500',
        'neutral-600',
        'neutral-700',
        'neutral-800',
        'orange',
        'blue',
        'purple',
        'yellow',
        'pink',
        'green',
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    type: 'infoCircle',
    stroke: 'neutral-000',
    fill: 'orange',
    size: 'lg',
  },
}

export const LargeIcon: Story = {
  args: {
    type: 'infoCircle',
    stroke: 'neutral-000',
    fill: 'purple',
    size: 'lg',
  },
}
