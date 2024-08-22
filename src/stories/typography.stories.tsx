import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components'

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    size: {
      control: 'select',
      options: [
        'h0',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h5-2',
        'h6',
        'h7',
        'body0-2',
        'body0',
        'body1',
        'body2',
        'body3',
        'body4',
      ],
    },
    color: {
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
    children: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {
  args: {
    size: 'h4',
    color: 'neutral-000',
    children: 'Default Typography',
  },
}

export const CustomSizeColor: Story = {
  args: {
    size: 'h1',
    color: 'orange-500',
    children: 'Custom Size and Color Typography',
  },
}
