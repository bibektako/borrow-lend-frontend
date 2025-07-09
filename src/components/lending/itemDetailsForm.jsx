import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAdminCategory } from "../../hooks/admin/useAdminCategory";
import { useCreateItem } from "../../hooks/useItem";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { toast } from "react-toastify";

const ItemDetailsForm = () => {
  const navigate = useNavigate();
  const { categories, isLoading: isLoadingCategories } = useAdminCategory();
  const { mutate: createItem, isPending } = useCreateItem();
  const [previews, setPreviews] = useState([]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Item title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Please select a category"),
    borrowingPrice: Yup.number()
      .positive("Price must be a positive number")
      .required("Daily price is required"),
    location: Yup.string().required("Location is required"),
    imageUrls: Yup.array()
      .min(1, "At least one image is required")
      .max(5, "You can upload a maximum of 5 photos"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      borrowingPrice: "",
      location: "",
      imageUrls: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("borrowingPrice", values.borrowingPrice);
      formData.append("location", values.location);
      values.imageUrls.forEach((file) => {
        formData.append("imageUrls", file);
      });

      createItem(formData, {
        onSuccess: () => {
          toast.success("Item listed successfully!");
          setTimeout(() => navigate("/browse"), 1500);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to list item.");
        },
      });
    },
  });

  const handleImageUpload = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const allFiles = [...formik.values.imageUrls, ...files].slice(0, 5);
      formik.setFieldValue("imageUrls", allFiles);

      const newPreviews = allFiles.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const removeImage = (index) => {
    const remainingFiles = formik.values.imageUrls.filter(
      (_, i) => i !== index
    );
    formik.setFieldValue("imageUrls", remainingFiles);

    const remainingPreviews = remainingFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(remainingPreviews);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Item Details</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Item Title */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Item Title
          </label>
          <input
            id="name"
            {...formik.getFieldProps("name")}
            placeholder="e.g., Professional DSLR Camera"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            {...formik.getFieldProps("description")}
            placeholder="Describe your item in detail, including its condition and any accessories."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              {...formik.getFieldProps("category")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option
                value=""
                label={isLoadingCategories ? "Loading..." : "Select category"}
              />
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="borrowingPrice"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Daily Price (Rs)
            </label>
            <input
              id="borrowingPrice"
              type="number"
              {...formik.getFieldProps("borrowingPrice")}
              placeholder="e.g., 500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.borrowingPrice && formik.errors.borrowingPrice && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.borrowingPrice}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Pickup Location
          </label>
          <input
            id="location"
            {...formik.getFieldProps("location")}
            placeholder="e.g., Madhyapur Thimi, Bhaktapur"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.location && formik.errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.location}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Item Photos
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {previews.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
              >
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {formik.values.imageUrls.length < 5 && (
              <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-500 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mb-1" />
                <span className="text-xs text-center text-gray-500">
                  Upload Photo
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  multiple
                />
              </label>
            )}
          </div>
          {formik.touched.imageUrls && formik.errors.imageUrls && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.imageUrls}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all disabled:bg-blue-300"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "List Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemDetailsForm;
