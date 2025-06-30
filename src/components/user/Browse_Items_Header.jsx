import React, { useState } from 'react';

// This component represents the header for the item browsing section.
const BrowseItemsHeader = ({ itemCount = 0 }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Left Side: Title and Item Count */}
        <div>
          <h2 className="text-xl font-bold text-gray-900">Browse Items</h2>
          <p className="text-sm text-gray-500 mt-1">Showing {itemCount} items</p>
        </div>

        {/* Right Side: View Toggles and Sort Dropdown */}
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
              aria-label="Grid view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
              aria-label="List view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Sort Dropdown */}
          <select className="px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// This is a simple wrapper to display the component for preview purposes.
export default function App() {
  return (
    <div className="bg-gray-100 p-4 sm:p-8 flex justify-center items-start min-h-screen">
      <div className="w-full max-w-6xl">
        <BrowseItemsHeader itemCount={12} />
      </div>
    </div>
  );
}
