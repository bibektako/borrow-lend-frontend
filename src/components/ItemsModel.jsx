import React, { useState, useEffect } from "react";

const ItemModal = ({ isOpen, onClose, onSave, item, categories }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [borrowingPrice, setBorrowingPrice] = useState("");
  const [images, setImages] = useState([]); // Files
  const [previews, setPreviews] = useState([]); // URLs for preview

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setDescription(item.description || "");
      setCategoryId(item.category?._id || "");
      setBorrowingPrice(item.borrowingPrice?.toString() || "");
      setPreviews(item.imageUrls || []);
      setImages([]); // reset new upload
    } else {
      setName("");
      setDescription("");
      setCategoryId("");
      setBorrowingPrice("");
      setPreviews([]);
      setImages([]);
    }
  }, [item, isOpen]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);

      // Generate preview URLs
      const urls = filesArray.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
    }
  };

  const handleSave = () => {
    if (!name || !description || !categoryId || !borrowingPrice) {
      console.error("Please fill all required fields.");
      return;
    }
    if (isNaN(borrowingPrice) || Number(borrowingPrice) < 0) {
      console.error("Borrowing price must be a non-negative number.");
      return;
    }

    const itemData = {
      ...item,
      name,
      description,
      category: categoryId,
      borrowingPrice: Number(borrowingPrice),
    };

    onSave(itemData, images); // pass images as second arg
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {item ? "Edit Item" : "Add New Item"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Item name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Item description"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Borrowing Price
            </label>
            <input
              type="number"
              value={borrowingPrice}
              onChange={(e) => setBorrowingPrice(e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Price"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Images (max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {previews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              ))}
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

export default ItemModal;
