import React from 'react'
import { render, screen } from '@testing-library/react'
import BlogCard from '../BlogCard'

test('renders blog card with provided props', () => {
  render(
    <BlogCard
      title="Test Title"
      description="Test description"
      date="2025-10-25"
      readTime="5 min"
      imageUrl="/img.jpg"
      link="https://example.com"
    />
  )

  expect(screen.getByText('Test Title')).toBeInTheDocument()
  expect(screen.getByText('Test description')).toBeInTheDocument()
  expect(screen.getByText(/2025-10-25/)).toBeInTheDocument()
  expect(screen.getByText(/5 min/)).toBeInTheDocument()
  expect(screen.getByAltText('Test Title')).toBeInTheDocument()
})
