import SearchInput from '@/components/search-input/index'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    prevButton: {
      control: { type: 'radio' },
      options: ['on', 'off'],
    },
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
    iconLabel: '지우기',
    iconType: 'delete',
    value: '123',
    onClickIcon: () => null,
  },
}

export const Outlined: Story = {
  args: {
    iconLabel: '검색',
    iconType: 'search',
    value: '123',
    onClickIcon: () => null,
  },
}

export const Prev: Story = {
  args: {
    iconLabel: '지우기',
    iconType: 'delete',
    prevButton: 'on',
    value: '123',
    onClickPrev: () => null,
    onClickIcon: () => null,
  },
}
