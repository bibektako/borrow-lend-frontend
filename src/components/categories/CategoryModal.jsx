import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { XIcon } from "../ui/Icons";
import { useCreateCategory, useUpdateCategory } from "../../hooks/admin/useAdminCategory"; 
import { toast } from "react-toastify";

const CategoryModal = ({ isOpen, onClose, category }) => {
  // Hooks for creating and updating categories
  const { mutate: createMutate, isPending: isCreating } = useCreateCategory();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory();

  // Separate state for the image preview URL
  const [preview, setPreview] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    image: Yup.mixed()
      .nullable()
      .test(
        "fileSize",
        "File is too large (max 5MB)",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.image) {
        formData.append("image", values.image);
      }

      if (category) {
        // --- UPDATE MODE ---
        updateMutate(
          { id: category._id, data: formData },
          {
            onSuccess: () => {
              toast.success("Category updated successfully!");
              onClose(); // Close modal on success
            },
          }
        );
      } else {
        // --- CREATE MODE ---
        createMutate(formData, {
          onSuccess: () => {
            toast.success("Category created successfully!");
            onClose(); // Close modal on success
          },
        });
      }
    },
  });

  // Effect to populate form when modal opens or category changes
  useEffect(() => {
    if (isOpen) {
      if (category) {
        // Edit mode: set initial values from the category prop
        formik.setFieldValue("name", category.name);
        setPreview(category.image || "");
      } else {
        // Create mode: reset the form
        formik.resetForm();
        setPreview("");
      }
    }
  }, [category, isOpen]);

  // Handle file input change and update formik state + preview
  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
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

        {/* Use formik's handleSubmit on the form tag */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="category-name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category Name
            </label>
            <input
              id="category-name"
              name="name" // Name attribute is important for formik
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // Track if the field was touched
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Winter Collection"
            />
            {/* Display validation error */}
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
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
                name="image"
                type="file"
                onChange={handleImageChange} // Use custom handler
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {/* Display validation error */}
            {formik.touched.image && formik.errors.image ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
            ) : null}
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button" // Prevent default form submission
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit" // This button now submits the form
              disabled={isCreating || isUpdating} // Disable when submitting
              className="px-6 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isCreating || isUpdating ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;