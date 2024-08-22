import type { Meta, StoryObj } from '@storybook/react'

import SearchInput from '@/components/search-input'

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['outlined', 'filled'],
    },
    width: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} as Meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  args: {
    rightIcon: {
      icon: {
        type: 'search',
        'aria-hidden': true,
      },
      onClick: () => null,
      label: '검색',
    },
  },
}

export const Outlined: Story = {
  args: {
    value: '123',
    variant: 'outlined',
    rightIcon: {
      icon: {
        type: 'delete',
        'aria-hidden': true,
      },
      onClick: () => null,
      label: '삭제',
    },
  },
}

export const Prev: Story = {
  args: {
    value: '123',
    variant: 'outlined',
    leftIcon: {
      icon: {
        type: 'caretLeft',
        'aria-hidden': true,
      },
      label: '이전 화면',
      onClick: () => null,
    },
    rightIcon: {
      icon: {
        type: 'delete',
        'aria-hidden': true,
      },
      onClick: () => null,
      label: '삭제',
    },
  },
}
