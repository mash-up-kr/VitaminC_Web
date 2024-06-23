import type { Meta, StoryObj } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import BottomSheet from '@/components/bottom-sheet/index'

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

export const Collapsed: Story = {
  args: {
    header: 'header',
    body: 'content',
  },
}

export const Expanded: Story = {
  args: {
    header: 'header',
    body: 'content',
    expanded: true,
  },
}
