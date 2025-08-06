// src/components/__tests__/ItemCard.test.jsx
import React from "react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCard from "../user/ItemsCard";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../auth/Authprovider";
import { useBookmarks } from "../../hooks/useBookmarks";
import { useCreateBorrowRequest } from "../../hooks/useBorrow";

vi.mock("../../hooks/useBookmarks");
vi.mock("../../hooks/useBorrow");

const mockToggleBookmark = vi.fn();
const mockCreateBorrowRequest = vi.fn();

const mockItem = {
  _id: "item123",
  name: "Sample Item",
  category: { name: "Electronics" },
  borrowingPrice: 150,
  imageUrls: ["test.jpg"],
  owner: { _id: "owner1", location: "Kathmandu" },
  rating: 4.5,
  reviewCount: 12,
  status: "available",
};

describe("SingleItemCard Component", () => {
  beforeEach(() => {
    useBookmarks.mockReturnValue({
      toggleBookmark: mockToggleBookmark,
      isBookmarked: () => false,
      isToggling: false,
    });

    useCreateBorrowRequest.mockReturnValue({
      mutate: mockCreateBorrowRequest,
      isPending: false,
    });
  });

  const renderCard = (user = { _id: "user1" }, item = mockItem) =>
    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <ItemCard items={[item]} />
        </AuthContext.Provider>
      </BrowserRouter>
    );

  it("renders item details", () => {
    renderCard();
    expect(screen.getByText("Sample Item")).toBeInTheDocument();
    expect(
      screen.getByText(
        (content, element) => element?.textContent === "Rs150.00/day"
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Electronics/)).toBeInTheDocument();
    expect(screen.getByText(/Kathmandu/)).toBeInTheDocument();
  });

  it("renders star ratings and review count", () => {
    renderCard();
    expect(screen.getByText("(12 reviews)")).toBeInTheDocument();
  });

  it("calls toggleBookmark on heart click", () => {
    renderCard();
    fireEvent.click(screen.getByLabelText("Add to wishlist"));
    expect(mockToggleBookmark).toHaveBeenCalledWith(mockItem._id);
  });

  it("calls borrow request on button click", () => {
    renderCard();
    fireEvent.click(screen.getByTestId("borrow-button"));
    expect(mockCreateBorrowRequest).toHaveBeenCalledWith(mockItem._id);
  });

  it('shows "Your Item" if user is owner', () => {
    renderCard({ _id: "owner1" });
    expect(screen.getByText(/Your Item/)).toBeInTheDocument();
  });

  it("disables borrow button if item is already borrowed", () => {
    const borrowedItem = { ...mockItem, status: "borrowed" };
    renderCard({ _id: "user1" }, borrowedItem);
    expect(screen.getByTestId("borrow-button")).toBeDisabled();
  });

  it("matches snapshot", () => {
    const { asFragment } = renderCard();
    expect(asFragment()).toMatchSnapshot();
  });
});
