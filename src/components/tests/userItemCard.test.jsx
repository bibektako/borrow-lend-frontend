// src/components/__tests__/UserItemCard.test.jsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserItemCard from '../user/User_Items_card';
import { getBackendImageUrl } from "../../../utils/backend-image"

vi.mock('../../../utils/backend-image', () => ({
  getBackendImageUrl: vi.fn(() => 'https://mocked.image.url/test.jpg'),
}));

const mockItem = {
  _id: 'item123',
  name: 'Test Item',
  borrowingPrice: 250,
  imageUrls: ['test.jpg'],
  category: { name: 'Tools' },
};

describe('UserItemCard', () => {
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders item details correctly', () => {
    render(<UserItemCard item={mockItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText('Tools')).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Rs 250')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://mocked.image.url/test.jpg');
  });

  it('calls onEdit when Edit button is clicked', () => {
    render(<UserItemCard item={mockItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText('Edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockItem);
  });

  it('calls onDelete when Delete button is clicked', () => {
    render(<UserItemCard item={mockItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByText('Delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockItem._id);
  });

  it('displays "Uncategorized" if no category exists', () => {
    const uncategorizedItem = { ...mockItem, category: null };
    render(<UserItemCard item={uncategorizedItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByText('Uncategorized')).toBeInTheDocument();
  });

  it('uses fallback image if imageUrls is empty', () => {
    const noImageItem = { ...mockItem, imageUrls: [] };
    render(<UserItemCard item={noImageItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://placehold.co/600x400/E2E8F0/334155?text=No+Image'
    );
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<UserItemCard item={mockItem} onEdit={mockOnEdit} onDelete={mockOnDelete} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
