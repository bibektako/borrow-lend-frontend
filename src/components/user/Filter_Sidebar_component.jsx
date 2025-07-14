import React, { useState } from "react";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory"; // Adjust path

// --- Icon Components (no changes) ---
const LocationPinIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.16-4.057l-1.18-1.18a15.475 15.475 0 01-4.022 3.055l-2.296 1.532a1.125 1.125 0 01-1.344 0l-2.296-1.532a15.475 15.475 0 01-4.022-3.055l-1.18 1.18a16.975 16.975 0 005.16 4.057l.071.041zM12 1.5a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z"
      clipRule="evenodd"
    />
    <path d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
  </svg>
);
const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 transition-colors ${
      filled ? "text-yellow-400" : "text-gray-300"
    }`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

const FilterCheckbox = ({ id, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      checked={!!checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
    />
    <label
      htmlFor={id}
      className="ml-3 text-sm text-gray-700 select-none cursor-pointer"
    >
      {label}
    </label>
  </div>
);

const FilterSidebar = ({ onFilterChange, initialFilters = {} }) => {
  const [location, setLocation] = useState(initialFilters.location || "");
  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters.categories || {}
  );
  const [priceRange, setPriceRange] = useState(initialFilters.price || 5000);
  const [rating, setRating] = useState(initialFilters.rating || 0);

  const { categories: availableCategories, isLoading: isLoadingCategories } =
    useAdminCategory();

  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prev) => ({ ...prev, [id]: checked }));
  };

  /**
   * IMPROVEMENT: A utility function to remove empty/default values from the filter object.
   * This ensures we only send meaningful filters to the backend.
   */
  const cleanupFilters = (filters) => {
    const cleaned = { ...filters };
    if (!cleaned.location) delete cleaned.location;
    if (cleaned.categories && cleaned.categories.length === 0)
      delete cleaned.categories;
    if (cleaned.rating === 0) delete cleaned.rating;
    if (cleaned.price === 5000) delete cleaned.price; // Or whatever your max/default is
    return cleaned;
  };

  const handleApplyFilters = () => {
    const activeCategoryIds = Object.keys(selectedCategories).filter(
      (key) => selectedCategories[key]
    );
    const filtersToApply = {
      location,
      categories: activeCategoryIds,
      price: priceRange,
      rating,
    };
    // Pass the cleaned object to the parent
    onFilterChange(cleanupFilters(filtersToApply));
  };

  const resetFilters = () => {
    setLocation("");
    setSelectedCategories({});
    setPriceRange(5000);
    setRating(0);
    // When resetting, pass a completely empty object
    onFilterChange({});
  };

  // ... (JSX is the same as your provided code) ...

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-xl font-sans h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Reset All
        </button>
      </div>

      <div className="flex-grow overflow-y-auto py-6 pr-2 -mr-2 space-y-6">
        {/* Location Filter */}
        <div>
          <label
            htmlFor="location-filter"
            className="text-md font-semibold text-gray-800 mb-3 block"
          >
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {" "}
              <LocationPinIcon />{" "}
            </div>
            <input
              type="text"
              id="location-filter"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. 'Madhyapur Thimi'"
              className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-4">Category</h3>
          <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
            {isLoadingCategories ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              availableCategories.map((category) => (
                <FilterCheckbox
                  key={category._id}
                  id={category._id}
                  label={category.name}
                  checked={selectedCategories[category._id]}
                  onChange={handleCategoryChange}
                />
              ))
            )}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">
            Max Price
          </h3>
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>$0</span>
            <span className="font-semibold text-blue-600">${priceRange}</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">
            Minimum Rating
          </h3>
          <div className="flex justify-start space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star === rating ? 0 : star)}
                className="flex items-center justify-center p-2 rounded-lg transition-all duration-200"
                aria-label={`Rate ${star} stars`}
              >
                <StarIcon filled={rating >= star} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer with Apply Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={handleApplyFilters}
          className="w-full px-6 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
