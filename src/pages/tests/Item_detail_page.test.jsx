// src/pages/__tests__/ItemDetailPage.test.jsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ItemDetailPage from '../ItemsDetailPage';
import * as useItemHook from '../../hooks/useItem';

vi.mock('../../components/items/items detail/ImageGallery', () => ({
  default: () => <div data-testid="image-gallery">Image Gallery</div>,
}));
vi.mock('../../components/items/items detail/itemsInfo', () => ({
  default: () => <div data-testid="item-info">Item Info</div>,
}));
vi.mock('../../components/items/items detail/ownerInfo', () => ({
  default: () => <div data-testid="owner-info">Owner Info</div>,
}));
vi.mock('../../components/items/items detail/BookingPanel', () => ({
  default: () => <div data-testid="booking-panel">Booking Panel</div>,
}));
vi.mock('../../components/items/items detail/Reviews', () => ({
  default: () => <div data-testid="reviews">Reviews</div>,
}));

describe('ItemDetailPage', () => {
  const mockItem = {
    _id: '123',
    name: 'Test Item',
    imageUrls: ['url1', 'url2'],
    owner: { name: 'Owner' },
  };

  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks between tests
  });

  it('shows loading state', () => {
    vi.spyOn(useItemHook, 'useItemById').mockReturnValue({
      item: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/items/123']}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading item details/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.spyOn(useItemHook, 'useItemById').mockReturnValue({
      item: null,
      isLoading: false,
      error: { message: 'Something went wrong' },
    });

    render(
      <MemoryRouter initialEntries={['/items/123']}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('shows "item not found" message', () => {
    vi.spyOn(useItemHook, 'useItemById').mockReturnValue({
      item: null,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/items/123']}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/item not found/i)).toBeInTheDocument();
  });

  it('renders all main components when item is available', () => {
    vi.spyOn(useItemHook, 'useItemById').mockReturnValue({
      item: mockItem,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={['/items/123']}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('image-gallery')).toBeInTheDocument();
    expect(screen.getByTestId('item-info')).toBeInTheDocument();
    expect(screen.getByTestId('owner-info')).toBeInTheDocument();
    expect(screen.getByTestId('booking-panel')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    vi.spyOn(useItemHook, 'useItemById').mockReturnValue({
      item: mockItem,
      isLoading: false,
      error: null,
    });

    const { asFragment } = render(
      <MemoryRouter initialEntries={['/items/123']}>
        <Routes>
          <Route path="/items/:id" element={<ItemDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
