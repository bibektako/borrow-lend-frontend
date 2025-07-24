import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCatagory'; // Make sure this path is correct
import { getBackendImageUrl } from '../../../utils/backend-image';// Use the image helper

// --- UI ASSETS (Only AlertCircle is needed now) ---
import { AlertCircle } from 'lucide-react';

// --- UPDATED SKELETON COMPONENT ---
// This skeleton now mimics the design of a circular image and a text label below it.
const CategorySkeleton = () => (
  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg animate-pulse">
    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
    <div className="w-24 h-4 mt-3 bg-gray-300 rounded"></div>
  </div>
);


const Categories = () => {
  // The hook fetches the categories, which should include an 'imageUrl' field.
  const { categories, isLoading, isError, error } = useCategories();

  const renderContent = () => {
    if (isLoading) {
      // Show 6 skeleton loaders while fetching
      return Array.from({ length: 6 }).map((_, index) => (
        <CategorySkeleton key={index} />
      ));
    }

    if (isError) {
      return (
        <div className="col-span-full flex flex-col items-center text-red-500 bg-red-50 p-6 rounded-lg">
          <AlertCircle className="w-10 h-10 mb-2" />
          <p className="font-semibold">Could not load categories</p>
          <p className="text-sm">{error.message}</p>
        </div>
      );
    }

    if (categories.length === 0) {
      return <p className="col-span-full text-center text-gray-500">No categories found.</p>;
    }

    // --- UPDATED RENDER LOGIC ---
    // Map over the data fetched from the backend
    return categories.map((cat) => (
      <Link
        to={`/browse?category=${encodeURIComponent(cat.name)}`}
        key={cat._id}
        className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      >
        {/* This div creates the circular frame for the image */}
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-white group-hover:border-blue-200 transition-colors">
          <img
            src={getBackendImageUrl(cat.imageUrl)}
            alt={cat.name}
            className="w-full h-full object-cover" // Ensures the image fills the circle without distortion
          />
        </div>
        
        {/* The category name below the image */}
        <p className="mt-3 text-sm font-semibold text-gray-800 text-center transition-colors group-hover:text-blue-600">
          {cat.name}
        </p>
      </Link>
    ));
  };

  return (
    <section className="px-4 py-16 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Explore by Category
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Find exactly what you need from our wide selection.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Categories;