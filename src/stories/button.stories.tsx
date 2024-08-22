import type { Meta, StoryObj } from '@storybook/react'

import Button from '@/components/common/button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    colorScheme: {
      control: { type: 'radio' },
      options: ['orange', 'neutral'],
    },
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'full', 'fit'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
} as Meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    colorScheme: 'neutral',
    disabled: false,
    children: 'Default',
    onClick: () => console.log('default'),
  },
}

export const Orange: Story = {
  args: {
    colorScheme: 'orange',
    disabled: false,
    children: 'Orange',
    onClick: () => console.log('orange'),
  },
}

export const Disabled: Story = {
  args: {
    colorScheme: 'neutral',
    disabled: true,
    children: 'Disabled',
    onClick: () => console.log('disabled'),
  },
}
