import type { Meta, StoryObj } from '@storybook/react'

import Icon from '@/components/common/icon'
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
        'orange-50',
        'orange-100',
        'orange-200',
        'orange-300',
        'orange-400',
        'orange-500',
        'orange-600',
        'orange-700',
        'orange-800',
        'purple-50',
        'purple-100',
        'purple-200',
        'purple-300',
        'purple-400',
        'purple-500',
        'purple-600',
        'purple-700',
        'purple-800',
        'yellow-100',
        'profile-coral',
        'profile-dark-blue',
        'profile-sky-blue',
        'profile-violet',
        'profile-green',
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
        'orange-50',
        'orange-100',
        'orange-200',
        'orange-300',
        'orange-400',
        'orange-500',
        'orange-600',
        'orange-700',
        'orange-800',
        'purple-50',
        'purple-100',
        'purple-200',
        'purple-300',
        'purple-400',
        'purple-500',
        'purple-600',
        'purple-700',
        'purple-800',
        'yellow-100',
        'profile-coral',
        'profile-dark-blue',
        'profile-sky-blue',
        'profile-violet',
        'profile-green',
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
    fill: 'orange-400',
    size: 'lg',
  },
}

export const LargeIcon: Story = {
  args: {
    type: 'infoCircle',
    stroke: 'neutral-000',
    fill: 'purple-400',
    size: 'lg',
  },
}
