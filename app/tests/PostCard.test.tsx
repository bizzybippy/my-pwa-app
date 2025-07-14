import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PostCard from '../components/PostCard';

describe('PostCard', () => {
  it('renders title and body correctly', () => {
    render(<PostCard title="Test Title" body="Test Body" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });
});
