import React, { useState, useEffect, useCallback } from "react";
// UPDATED to use new service file and function names
import {
  getCategoriesApi,
  updateCategoryApi,
  deleteCategoryApi,
  createCategoryApi,
} from "../../api/categoryAPI";
import CategoryModal from "../../components/categories/CategoryModal";
import { MoreVerticalIcon } from "../../components/ui/Icons";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const getCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getCategoriesApi();
      setCategories(response.data?.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching categories:", err);
      const errorMessage =
        err.response?.status === 404
          ? "Failed to load categories. Please ensure your backend server is running on the correct port and the API route is correct."
          : "Failed to load categories.";
      setError(errorMessage);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategoryApi(categoryId);
        console.log("Category deleted successfully!");
        getCategories();
      } catch (err) {
        console.error("Error deleting category: ", err);
        setError(`Failed to delete category. Error: ${err.message}`);
      }
    }
  };

  const handleSaveCategory = async (categoryData, imageFile) => {
    setIsModalOpen(false);
    const formData = new FormData();
    formData.append("name", categoryData.name);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (categoryData._id) {
        await updateCategoryApi(categoryData._id, formData);
        console.log("Category updated successfully!");
      } else {
        await createCategoryApi(formData);
        console.log("Category added successfully!");
      }
      getCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      const status = err.response?.status;
      let errorMessage = `Failed to save category. Error: ${err.message}`;
      if (status === 404) {
        errorMessage =
          "Failed to save: The API endpoint was not found. Please check your server routes.";
      } else if (status === 401 || status === 403) {
        errorMessage =
          "Failed to save: You are not authorized. Please log in as an admin.";
      }
      setError(errorMessage);
    }
  };

  return (
    <main className="flex-1 bg-gray-100 p-6 md:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
          <button
            onClick={handleAddCategory}
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
            {error}
          </div>
        )}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {isLoading ? (
            <p className="p-6 text-center text-gray-500">
              Loading categories...
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
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
                          src={baseUrl + "/" + category.imageUrl}
                          alt={category.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/100x100/CCCCCC/FFFFFF?text=Error";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
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
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </main>
  );
};

export default CategoryPage;
