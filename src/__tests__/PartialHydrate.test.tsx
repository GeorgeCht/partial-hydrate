import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import * as React from 'react'

import { PartialHydrate } from '../PartialHydrate'

const mockChildren = (<div>Mock children</div>) as React.ReactNode

test('renders even when no props are specified', () => {
  // @ts-expect-error
  render(<PartialHydrate>{mockChildren}</PartialHydrate>)
  const element = document.querySelector('[id^="partial"]')
  expect(element).toBeInTheDocument()
})

test('does not render children when no props are specified', () => {
  // @ts-expect-error
  render(<PartialHydrate>{mockChildren}</PartialHydrate>)
  const element = document.querySelector('[id^="partial"]')
  expect(element?.innerHTML).toBe('')
})

test('renders children when "when" condition is met', () => {
  render(<PartialHydrate when={() => true}>{mockChildren}</PartialHydrate>)
  expect(screen.getByText('Mock children')).toBeInTheDocument()
})

test('does not render children when "when" condition is not met', () => {
  render(<PartialHydrate when={() => false}>{mockChildren}</PartialHydrate>)
  expect(screen.queryByText('Mock children')).not.toBeInTheDocument()
})

test('renders children when minWidth condition is met', () => {
  global.innerWidth = 500
  render(<PartialHydrate minWidth={600}>{mockChildren}</PartialHydrate>)
  expect(screen.getByText('Mock children')).toBeInTheDocument()
})

test('does not render children when minWidth condition is not met', () => {
  global.innerWidth = 800
  render(<PartialHydrate minWidth={600}>{mockChildren}</PartialHydrate>)
  expect(screen.queryByText('Mock children')).not.toBeInTheDocument()
})

test('renders children when maxWidth condition is met', () => {
  global.innerWidth = 800
  render(<PartialHydrate maxWidth={600}>{mockChildren}</PartialHydrate>)
  expect(screen.getByText('Mock children')).toBeInTheDocument()
})

test('does not render children when maxWidth condition is not met', () => {
  global.innerWidth = 500
  render(<PartialHydrate maxWidth={600}>{mockChildren}</PartialHydrate>)
  expect(screen.queryByText('Mock children')).not.toBeInTheDocument()
})

test('renders children when both minWidth and maxWidth conditions are met', () => {
  global.innerWidth = 800
  render(
    <PartialHydrate maxWidth={600} minWidth={1000}>
      {mockChildren}
    </PartialHydrate>,
  )
  expect(screen.getByText('Mock children')).toBeInTheDocument()
})

test('does not render children when both minWidth and maxWidth conditions are not met', () => {
  global.innerWidth = 500
  render(
    <PartialHydrate maxWidth={600} minWidth={1000}>
      {mockChildren}
    </PartialHydrate>,
  )
  expect(screen.queryByText('Mock children')).not.toBeInTheDocument()
})

test('renders children when "when" condition is met and minWidth and maxWidth conditions are met', () => {
  global.innerWidth = 800
  render(
    <PartialHydrate maxWidth={600} minWidth={1000} when={() => true}>
      {mockChildren}
    </PartialHydrate>,
  )
  expect(screen.getByText('Mock children')).toBeInTheDocument()
})

test('does not render children when "when" condition is not met and minWidth and maxWidth conditions are met', () => {
  global.innerWidth = 800
  render(
    <PartialHydrate maxWidth={600} minWidth={1000} when={() => false}>
      {mockChildren}
    </PartialHydrate>,
  )
  expect(screen.queryByText('Mock children')).not.toBeInTheDocument()
})

test('verify "when" condition gets priority over minWidth and maxWidth', () => {
  global.innerWidth = 1280
  render(
    <PartialHydrate maxWidth={1000} minWidth={1920} when={() => window.innerWidth > 1024}>
      {mockChildren}
    </PartialHydrate>,
  )
  expect(screen.getByText('Mock children')).toBeInTheDocument()
})

test('verify "when" condition gets priority over minWidth and maxWidth', () => {
  global.innerWidth = 680
  render(
    <PartialHydrate maxWidth={0} minWidth={800} when={() => window.innerWidth > 1024}>
      {mockChildren}
    </PartialHydrate>,
  )
  expect(screen.queryByText('Mock children')).not.toBeInTheDocument()
})
