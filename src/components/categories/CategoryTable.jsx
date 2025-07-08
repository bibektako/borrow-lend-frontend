import React from 'react';
import { getBackendImageUrl } from '../../../utils/backend-image'; 

const CategoryTable = ({ categories, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return <p className="p-6 text-center text-gray-500">Loading categories...</p>;
  }

  if (!categories.length) {
    return <p className="p-6 text-center text-gray-500">No categories found. Add one to get started!</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {category.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  className="h-12 w-12 rounded-lg object-cover"
                  src={getBackendImageUrl(category.imageUrl)}
                  alt={category.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Img";
                  }}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(category)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(category._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;