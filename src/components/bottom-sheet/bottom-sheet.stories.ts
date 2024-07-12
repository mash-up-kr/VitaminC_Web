import type { Meta, StoryObj } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import BottomSheet from '@/components/bottom-sheet/index'
import { BOTTOM_SHEET_STATE } from '@/models/interface'

const meta = {
  title: 'DesignSystem/BottomSheet',
  component: BottomSheet,
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
} satisfies Meta<typeof BottomSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    body: 'content',
  },
}

export const Expanded: Story = {
  args: {
    body: 'very very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long body content',
    state: BOTTOM_SHEET_STATE.Expanded,
  },
}

export const Collapsed: Story = {
  args: {
    body: 'content',
    state: BOTTOM_SHEET_STATE.Collapsed,
  },
}
