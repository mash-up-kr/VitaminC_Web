import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import type { Meta, StoryObj } from '@storybook/react'

import { BOTTOM_SHEET_STATE } from '@/components/common/bottom-sheet/constants'
import BottomSheet from '@/components/common/bottom-sheet/index'

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
    body: (ref) => (
      <div
        ref={(element) => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current[0] = element as HTMLDivElement
          }
        }}
      >
        content
      </div>
    ),
  },
}

export const Expanded: Story = {
  args: {
    body: (ref) => (
      <div
        ref={(element) => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current[0] = element as HTMLDivElement
          }
        }}
      >
        very very long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long long long long long long long
        long long long long long long long long body content
      </div>
    ),
    state: BOTTOM_SHEET_STATE.Expanded,
  },
}

export const Collapsed: Story = {
  args: {
    body: (ref) => (
      <div
        ref={(element) => {
          if (typeof ref !== 'function' && ref?.current) {
            ref.current[0] = element as HTMLDivElement
          }
        }}
      >
        content
      </div>
    ),
    state: BOTTOM_SHEET_STATE.Collapsed,
  },
}
