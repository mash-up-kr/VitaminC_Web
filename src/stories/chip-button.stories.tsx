import { Meta, StoryObj } from '@storybook/react'

import { ChipButton } from '@/components'
import { icons } from '@/components/common/icons'

const meta: Meta<typeof ChipButton> = {
  title: 'Components/ChipButton',
  component: ChipButton,
  argTypes: {
    rightIcon: {
      control: 'select',
      options: Object.keys(icons),
    },
    isActive: {
      control: 'boolean',
    },
    colorScheme: {
      control: 'select',
      options: ['neutral', 'orange'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ChipButton>

export const Default: Story = {
  args: {
    children: 'Chip Button',
    colorScheme: 'neutral',
    isActive: false,
  },
}

export const Active: Story = {
  args: {
    children: 'Active Chip Button',
    colorScheme: 'neutral',
    isActive: true,
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Chip Button with Icon',
    colorScheme: 'orange',
    isActive: false,
    rightIcon: {
      type: 'infoCircle',
      stroke: 'neutral-500',
      size: 'md',
    },
  },
}
