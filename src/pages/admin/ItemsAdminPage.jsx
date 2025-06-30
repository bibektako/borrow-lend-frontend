import React, { useState, useEffect, useCallback } from "react";
import {
  getItemsApi,
  createItemApi,
  updateItemApi,
  deleteItemApi,
} from "../../api/itemAPI"; // Your item API functions
import { getCategoriesApi } from "../../api/categoryAPI"; // To fetch categories for dropdown
import ItemModal from "../../components/ItemsModel"; // The modal you have (or will create)
import { MoreVerticalIcon } from "../../components/ui/Icons"; // Optional for UI
import { API_URL } from "../../api/api";

const ItemPage = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch categories once for modal category select
  const fetchCategories = useCallback(async () => {
    try {
      const res = await getCategoriesApi();
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  }, []);

  // Fetch items list
  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getItemsApi();
      setItems(response.data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching items:", err);
      const errorMessage =
        err.response?.status === 404
          ? "Failed to load items. Check backend server and API route."
          : "Failed to load items.";
      setError(errorMessage);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, [fetchCategories, fetchItems]);

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItemApi(itemId);
        console.log("Item deleted successfully!");
        fetchItems();
      } catch (err) {
        console.error("Error deleting item:", err);
        setError(`Failed to delete item. Error: ${err.message}`);
      }
    }
  };

  const handleSaveItem = async (itemData, imageFiles) => {
    setIsModalOpen(false);

    const formData = new FormData();
    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("category", itemData.category);
    formData.append("borrowingPrice", itemData.borrowingPrice);

    if (imageFiles && imageFiles.length > 0) {
      imageFiles.forEach((file) => formData.append("imageUrls", file));
    }

    try {
      if (itemData._id) {
        await updateItemApi(itemData._id, formData);
        console.log("Item updated successfully!");
      } else {
        await createItemApi(formData);
        console.log("Item added successfully!");
      }
      fetchItems();
    } catch (err) {
      console.error("Error saving item:", err);
      const status = err.response?.status;
      let errorMessage = `Failed to save item. Error: ${err.message}`;
      if (status === 404) {
        errorMessage =
          "Failed to save: The API endpoint was not found. Please check your server routes.";
      } else if (status === 401 || status === 403) {
        errorMessage = "Failed to save: You are not authorized. Please log in.";
      }
      setError(errorMessage);
    }
  };

  return (
    <main className="flex-1 bg-gray-100 p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Items</h2>
          <button
            onClick={handleAddItem}
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            + Add Item
          </button>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <p className="p-6 text-center text-gray-500">Loading items...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Borrowing Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Images
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.category?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ${item.borrowingPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          {item.imageUrls?.slice(0, 3).map((url, idx) => (
                            <img
                              key={idx}
                              className="h-12 w-12 rounded-lg object-cover"
                              src={baseUrl + "/" + url}
                              alt={`${item.name} image ${idx + 1}`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/100x100/CCCCCC/FFFFFF?text=Error";
                              }}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
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
          )}
        </div>
      </div>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        item={editingItem}
        categories={categories}
      />
    </main>
  );
};

export default ItemPage;
