import type { Meta, StoryObj } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import SearchInput from '@/components/search-input/index'

const meta = {
  title: 'DesignSystem/SearchInput',
  component: SearchInput,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    iconType: 'search',
  },
}

export const Reset: Story = {
  args: {
    value: '000',
    variant: 'filled',
    iconType: 'reset',
    onReset: () => null,
  },
}
