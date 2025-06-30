import React, { useState } from 'react';

// A reusable checkbox component for the filters
const FilterCheckbox = ({ id, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label htmlFor={id} className="ml-3 text-sm text-gray-600">
      {label}
    </label>
  </div>
);

// The main FilterSidebar component
const FilterSidebar = () => {
  // State for managing filter values
  const [categories, setCategories] = useState({
    electronics: false,
    tools: false,
    outdoor: false,
    household: false,
    sports: false,
    books: false,
    musical: false,
  });
  const [priceRange, setPriceRange] = useState(2000);
  const [distance, setDistance] = useState('10');
  const [rating, setRating] = useState({
    fourStar: false,
    threeStar: false,
    twoStar: false,
    oneStar: false,
  });

  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setCategories(prev => ({ ...prev, [id]: checked }));
  };

  const handleRatingChange = (event) => {
    const { id, checked } = event.target;
    setRating(prev => ({ ...prev, [id]: checked }));
  };
  
  const resetFilters = () => {
    setCategories({
        electronics: false, tools: false, outdoor: false,
        household: false, sports: false, books: false, musical: false,
    });
    setPriceRange(2000);
    setDistance('10');
    setRating({
        fourStar: false, threeStar: false, twoStar: false, oneStar: false,
    });
  };

  return (
    <div className="w-full max-w-xs p-6 bg-white rounded-lg shadow-md font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <button 
          onClick={resetFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-3">Category</h3>
        <div className="space-y-3">
          <FilterCheckbox id="electronics" label="Electronics" checked={categories.electronics} onChange={handleCategoryChange} />
          <FilterCheckbox id="tools" label="Tools & Equipment" checked={categories.tools} onChange={handleCategoryChange} />
          <FilterCheckbox id="outdoor" label="Outdoor & Travel Gear" checked={categories.outdoor} onChange={handleCategoryChange} />
          <FilterCheckbox id="household" label="Household Items" checked={categories.household} onChange={handleCategoryChange} />
          <FilterCheckbox id="sports" label="Sports Equipment" checked={categories.sports} onChange={handleCategoryChange} />
          <FilterCheckbox id="books" label="Books & Study Materials" checked={categories.books} onChange={handleCategoryChange} />
          <FilterCheckbox id="musical" label="Musical Instruments" checked={categories.musical} onChange={handleCategoryChange} />
        </div>
      </div>
      
      <hr className="my-6" />

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-3">Price Range</h3>
        <input
          type="range"
          min="0"
          max="2000"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Rs 0</span>
          <span>Rs {priceRange}</span>
        </div>
      </div>
      
      <hr className="my-6" />

      {/* Distance Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-800 mb-3">Distance</h3>
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="10">Within 10 km</option>
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
          <option value="100">Within 100 km</option>
        </select>
      </div>
      
      <hr className="my-6" />

      {/* Rating Filter */}
      <div>
        <h3 className="text-md font-semibold text-gray-800 mb-3">Rating</h3>
        <div className="space-y-3">
          <FilterCheckbox id="fourStar" label="4+ Stars" checked={rating.fourStar} onChange={handleRatingChange} />
          <FilterCheckbox id="threeStar" label="3+ Stars" checked={rating.threeStar} onChange={handleRatingChange} />
          <FilterCheckbox id="twoStar" label="2+ Stars" checked={rating.twoStar} onChange={handleRatingChange} />
          <FilterCheckbox id="oneStar" label="1+ Stars" checked={rating.oneStar} onChange={handleRatingChange} />
        </div>
      </div>
    </div>
  );
};

// This is a simple wrapper to display the sidebar for preview purposes.
// You would integrate FilterSidebar into your actual page layout.
export default function App() {
    return (
        <div className="bg-gray-100 p-4 sm:p-8 flex justify-center items-start min-h-screen">
             <FilterSidebar />
        </div>
    );
}
