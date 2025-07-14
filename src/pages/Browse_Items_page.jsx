import React, { useState, useCallback, useMemo } from "react";
import Header from "../layouts/Header";
import FilterSidebar from "../components/user/Filter_Sidebar_component";
import ItemCard from "../components/user/ItemsCard";
import { useItems } from "../hooks/useItem";
import { SlidersHorizontal, X } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center py-8">
      <nav
        className="flex items-center space-x-1 md:space-x-2"
        aria-label="Pagination"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`hidden sm:inline-block px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === number
                ? "bg-blue-600 text-white border border-blue-600"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default function Browse_Items_page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 8;

  const queryFilters = useMemo(
    () => ({
      ...filters,
      page: currentPage,
      limit: itemsPerPage,
    }),
    [filters, currentPage, itemsPerPage]
  );

  const { items, isLoading, error, totalPages } = useItems(queryFilters);
  console.log("Items:", items);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = useCallback((newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="w-full max-w-screen-xl mx-auto flex flex-col lg:flex-row pt-6 px-4">
        <aside className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 lg:pr-8">
          <div className="sticky top-24">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        </aside>

        <div
          className={`fixed inset-0 z-40 lg:hidden transition-opacity ${
            isFilterOpen
              ? "bg-black bg-opacity-50"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsFilterOpen(false)}
        >
          <aside
            className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-50 p-6 overflow-y-auto transform transition-transform ${
              isFilterOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <FilterSidebar onFilterChange={handleFilterChange} />
          </aside>
        </div>

        <main className="w-full lg:w-3/4 xl:w-4/5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Browse Items
            </h1>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
          </div>

          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-600">Loading items...</p>
            </div>
          )}

          {error && (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">
                {error.message || "Failed to fetch items."}
              </p>
            </div>
          )}

          {!isLoading && !error && items.length === 0 && (
            <div className="text-center py-20 bg-white rounded-lg shadow">
              <p className="text-lg font-semibold text-gray-600">
                No Items Found
              </p>
              <p className="text-gray-400 mt-2">
                Try adjusting your filters to find what you're looking for.
              </p>
            </div>
          )}

          {!isLoading && !error && items.length > 0 && (
            <>
              <ItemCard items={items} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
