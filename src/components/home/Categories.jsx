import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useCatagory';
import { getBackendImageUrl } from '../../../utils/backend-image';
import { AlertCircle } from 'lucide-react';

const CategorySkeleton = () => (
  <div className="bg-slate-100/70 rounded-xl p-4 flex items-center gap-4 animate-pulse">
    <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
      <div className="w-1/2 h-3 bg-slate-200 rounded"></div>
    </div>
  </div>
);

const Categories = () => {
  const { categories, isLoading, isError, error } = useCategories();

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CategorySkeleton key={index} />);
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

    if (categories?.length === 0) {
      return <p className="col-span-full text-center text-slate-500">No categories found.</p>;
    }

    return categories.map((cat) => (
      <Link
        to={`/browse?category=${encodeURIComponent(cat.name)}`}
        key={cat._id}
        className="group bg-white rounded-xl p-4 flex items-center gap-4 border hover:shadow-lg hover:border-blue-500 hover:scale-105 transition-all duration-300"
      >
        <img
          src={getBackendImageUrl(cat.imageUrl)}
          alt={cat.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div>
          <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {cat.name}
          </p>
          {/* To enable this, you would need to add `itemCount` to your category model on the backend */}
          {/* <p className="text-sm text-slate-500">{cat.itemCount || 0} items</p> */}
        </div>
      </Link>
    ));
  };

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Explore by Category</h2>
          <p className="mt-3 text-lg text-slate-600">Find exactly what you're looking for.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Categories;