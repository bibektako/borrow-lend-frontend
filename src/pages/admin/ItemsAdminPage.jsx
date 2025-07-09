import React, { useState } from "react";
import ItemTable from "../../components/items/ItemsTableAdmin"; 
import ItemModal from "../../components/items/ItemModel";
import DeleteModal from "../../components/ui/DeleteModel"; 
import { useItems, useDeleteItem } from "../../hooks/useItem";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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


const ItemPage = () => {
  // State for controlling modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // --- Data Fetching and Mutations via TanStack Query Hooks ---
  const { items, isLoading, error, totalPages } = useItems({
    page: currentPage,
    limit: itemsPerPage,
  });
  const { categories } = useAdminCategory(); // Fetch categories for the modal
  const { mutate: deleteItemMutate, isPending: isDeleting } = useDeleteItem();

  // --- Modal Handlers ---
  const handleAddClick = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteItemMutate(deleteId, {
        onSuccess: () => setDeleteId(null), // Close modal on success
      });
    }
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
          <h2 className="text-2xl font-bold text-gray-800">Manage Items</h2>
          <button
            onClick={handleAddClick}
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error.message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ItemTable
            items={items}
            isLoading={isLoading}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
        
        {!isLoading && !error && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        )}
      </div>

      {/* --- Modals --- */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        categories={categories}
      />

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
    </main>
  );
};

export default ItemPage;
