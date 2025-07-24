import React, { useState } from "react";
import { useCategories } from "../../hooks/useCatagory";

// --- Icon Components ---
import { MapPin, Star, AlertCircle } from "lucide-react";

const StarIcon = ({ filled, onHover, onLeave, onClick }) => (
  <svg
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className={`w-6 h-6 cursor-pointer transition-colors ${
      filled ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
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
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label htmlFor={id} className="ml-3 text-sm text-gray-700 select-none cursor-pointer">
      {label}
    </label>
  </div>
);

// A skeleton loader for the category section
const CategoryFilterSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center">
        <div className="w-4 h-4 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-4 ml-3 bg-gray-300 rounded"></div>
      </div>
    ))}
  </div>
);

const FilterSidebar = ({ onFilterChange, initialFilters = {} }) => {
  const [location, setLocation] = useState(initialFilters.location || "");
  const [selectedCategories, setSelectedCategories] = useState(initialFilters.categories || {});
  const [priceRange, setPriceRange] = useState(initialFilters.price || 5000);
  const [rating, setRating] = useState(initialFilters.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const { categories: availableCategories, isLoading: isLoadingCategories, isError, error } = useCategories();

  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prev) => ({ ...prev, [id]: checked }));
  };
  
  // Cleans up the filters object before passing it to the parent
  const cleanupFilters = (filters) => {
    const cleaned = { ...filters };
    if (!cleaned.location) delete cleaned.location;
    if (cleaned.categories.length === 0) delete cleaned.categories;
    if (cleaned.rating === 0) delete cleaned.rating;
    if (cleaned.price >= 5000) delete cleaned.price; // Only include price if it's not the max
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
    onFilterChange(cleanupFilters(filtersToApply));
  };

  const resetFilters = () => {
    setLocation("");
    setSelectedCategories({});
    setPriceRange(5000);
    setRating(0);
    onFilterChange({}); // Pass an empty object to clear all filters
  };

  return (
    <aside className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        <button onClick={resetFilters} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
          Reset All
        </button>
      </div>

      <div className="flex-grow overflow-y-auto py-6 pr-2 -mr-4 space-y-8">
        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block text-md font-semibold text-gray-800 mb-3">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. New York"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-4">Category</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {isLoadingCategories ? ( <CategoryFilterSkeleton /> ) : 
             isError ? ( <p className="text-sm text-red-500 flex items-center gap-2"><AlertCircle size={16}/> {error.message}</p> ) :
             ( availableCategories.map((category) => (
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
          <h3 className="text-md font-semibold text-gray-800 mb-3">Max Price / Day</h3>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>$0</span>
            <span className="font-semibold text-blue-600">${priceRange}{priceRange >= 5000 ? '+' : ''}</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h3 className="text-md font-semibold text-gray-800 mb-3">Minimum Rating</h3>
          <div className="flex justify-start space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                filled={(hoverRating || rating) >= star}
                onHover={() => setHoverRating(star)}
                onLeave={() => setHoverRating(0)}
                onClick={() => setRating(star === rating ? 0 : star)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <button onClick={handleApplyFilters} className="w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Apply Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;