import React, { useState } from "react";
import ItemTable from "../../components/items/ItemsTableAdmin"; // Adjust path
import ItemModal from "../../components/items/ItemModel"; // Adjust path
import DeleteModal from "../../components/ui/DeleteModel"; // Adjust path
import { useItems, useDeleteItem } from "../../hooks/useItem";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory";

const ItemPage = () => {
  // State for controlling modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // --- Data Fetching and Mutations via TanStack Query Hooks ---
  const { items, isLoading, error } = useItems();
  const { categories } = useAdminCategory(); // Fetch categories for the modal
  const { mutate: deleteItemMutate } = useDeleteItem();

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

  return (
    <main className="flex-1 bg-gray-100 p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Items</h2>
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
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
    </main>
  );
};

export default ItemPage;
