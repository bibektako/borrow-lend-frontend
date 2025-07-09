import React, { useState } from 'react';
import { useUnverifiedItems, useVerifyItem } from '../../hooks/admin/useAdminItem'; // Adjust path as needed
import UnverifiedItemsTable from '../../layouts/admin/UnverifiedItemsTable'; // Adjust path as needed
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Pagination Component ---
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) {
    return null;
  }
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center items-center py-8">
      <nav className="flex items-center space-x-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentPage === number
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </nav>
    </div>
  );
};


const ItemVerificationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const { unverifiedItems, isLoading, error, totalPages } = useUnverifiedItems({
    page: currentPage,
    limit: itemsPerPage,
  });
  
  
  const { mutate: verifyItemMutate } = useVerifyItem();

  // State to track which specific item is currently being verified
  const [verifyingId, setVerifyingId] = useState(null);

  const handleVerifyClick = (id) => {
    setVerifyingId(id); // Set the ID to show loading state on the specific button
    verifyItemMutate(id, {
      onSettled: () => {
        setVerifyingId(null);
      },
    });
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="flex-1 bg-gray-100 p-6 md:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Item Verification</h1>
        </div>

        {isLoading && (
          <div className="text-center py-20">
            <p className="text-gray-600">Loading unverified items...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20 bg-red-50 p-6 rounded-lg">
            <p className="text-red-600 font-semibold">An Error Occurred</p>
            <p className="text-red-500 mt-2">{error.message || 'Failed to fetch data.'}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <UnverifiedItemsTable
              items={unverifiedItems}
              onVerify={handleVerifyClick}
              isVerifyingId={verifyingId}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
};

export default ItemVerificationPage;
