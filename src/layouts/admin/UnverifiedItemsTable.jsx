import React from 'react';
import { getBackendImageUrl } from '../../../utils/backend-image';

const UnverifiedItemsTable = ({ items, onVerify, isVerifyingId }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow">
        <p className="text-lg font-semibold text-gray-600">All items are verified!</p>
        <p className="text-gray-400 mt-2">There are no items currently awaiting verification.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={getBackendImageUrl(item.imageUrls?.[0])}
                        alt={item.name}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/CCCCCC/FFFFFF?text=No+Img"; }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.owner?.username || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.category?.name || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${item.borrowingPrice?.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onVerify(item._id)}
                    disabled={isVerifyingId === item._id}
                    className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isVerifyingId === item._id ? 'Verifying...' : 'Verify'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnverifiedItemsTable;
