import type { Meta, StoryObj } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import Tooltip from '@/components/tooltip/index'

const meta = {
  title: 'DesignSystem/Tooltip',
  component: Tooltip,
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
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '안녕하세요요요요요요',
    onClose: () => {
      alert('닫기!')
    },
    children: 'ddd',
  },
}

export const Gray: Story = {
  args: {
    label: '안녕하세요요요요요요',
    onClose: () => {
      alert('닫기!')
    },
    children: 'ddd',
  },
}
