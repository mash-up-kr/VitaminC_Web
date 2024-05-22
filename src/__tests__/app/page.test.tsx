import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'

test('Page', () => {
  render(<Page />)
  expect(screen.getAllByRole('heading', { level: 2 })).toBeDefined()
})
