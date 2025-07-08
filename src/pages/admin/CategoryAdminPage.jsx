import React, { useState } from "react";
import CategoryTable from "../../components/categories/CategoryTable";
import CategoryModal from "../../components/categories/CategoryModal";
import DeleteModal from "../../components/ui/CategoryDeleteModel"; // Assuming you have this
import { useAdminCategory, useDeleteCategory } from "../../hooks/admin/useAdminCategory"; // Using the hooks

const CategoryAdminApi = () => {
  // State for controlling modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // --- Data Fetching and Mutations via TanStack Query Hooks ---
  const { categories, isLoading, error } = useAdminCategory();
  const { mutate: deleteCategoryMutate } = useDeleteCategory();

  // --- Modal Handlers ---
  const handleAddClick = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteCategoryMutate(deleteId, {
        onSuccess: () => {
          setDeleteId(null); // Close the modal on success
        },
      });
    }
  };

  return (
    <main className="flex-1 bg-gray-100 p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          <button
            onClick={handleAddClick}
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            + Add Category
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
          <CategoryTable
            categories={categories}
            isLoading={isLoading}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>

      {/* --- Modals --- */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={editingCategory}
      />

      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />
    </main>
  );
};

export default CategoryAdminApi;