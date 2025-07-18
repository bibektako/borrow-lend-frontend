import React from 'react';
import { getBackendImageUrl } from '../../../utils/backend-image'; 

const UserItemCard = ({ item, onEdit, onDelete }) => {
  const imageUrl =
    item.imageUrls && item.imageUrls.length > 0
      ? getBackendImageUrl(item.imageUrls[0])
      : "https://placehold.co/600x400/E2E8F0/334155?text=No+Image";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-blue-600 font-semibold">
          {item.category?.name || "Uncategorized"}
        </p>
        <h3 className="text-md font-bold text-gray-800 mt-1 truncate">
          {item.name}
        </h3>
        <p className="text-lg font-black text-gray-900 mt-2">
          Rs {item.borrowingPrice}
        </p>
        <div className="mt-auto pt-4 flex gap-3">
          <button
            onClick={() => onEdit(item)} 
            className="flex-1 bg-gray-100 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserItemCard;