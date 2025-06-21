import React, { useState, useEffect } from "react";
import { XIcon } from "../ui/Icons";

const CategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setPreview(category.image || '');
      setImage(null); // Reset file input
    } else {
      setName("");
      setPreview("");
      setImage(null);
    }
  }, [category, isOpen]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!name) {
      // In a real app, you would show a toast notification here
      console.error("Please enter a category name.");
      return;
    }
    const categoryData = { ...category, name };
    onSave(categoryData, image); // pass image file as second param
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {category ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <XIcon />
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="category-name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category Name
            </label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Winter Collection"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category-image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              )}
              <input
                id="category-image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
