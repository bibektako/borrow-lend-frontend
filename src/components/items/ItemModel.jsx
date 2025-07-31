import React, { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCreateItem, useUpdateItem } from '../../hooks/useItem'; 
import { getBackendImageUrl } from '../../../utils/backend-image'; 

const UploadIcon = () => (
  <svg className="w-8 h-8 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.707-10.707a1 1 0 0 0-1.414-1.414L10 8.586 7.707 6.293a1 1 0 0 0-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 1 0 1.414 1.414L10 11.414l2.293 2.293a1 1 0 0 0 1.414-1.414L11.414 10l2.293-2.293Z" clipRule="evenodd" />
  </svg>
);


const ItemModal = ({ isOpen, onClose, item, categories }) => {
  const { mutate: createItem, isPending: isCreating } = useCreateItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateItem();
  const [previews, setPreviews] = useState([]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Item name is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    borrowingPrice: Yup.number().positive('Price must be positive').required('Price is required'),
    imageUrls: Yup.array()
      .min(1, 'At least one image is required.')
      .max(5, 'You can upload a maximum of 5 images.')
      .nullable(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: '',
      borrowingPrice: '',
      imageUrls: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('borrowingPrice', values.borrowingPrice);

      values.imageUrls.forEach(file => {
        if (file instanceof File) {
          formData.append('imageUrls', file);
        }
      });

      if (item) {
        updateItem({ id: item._id, formData }, { onSuccess: onClose });
      } else {
        createItem(formData, { onSuccess: onClose });
      }
    },
  });

  const updatePreviews = useCallback((files) => {
    const newPreviews = files.map(file => {
      return (file instanceof File) ? URL.createObjectURL(file) : getBackendImageUrl(file);
    });
    setPreviews(newPreviews);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      const initialImages = item?.imageUrls || [];
      formik.setValues({
        name: item?.name || '',
        description: item?.description || '',
        category: item?.category?._id || '',
        borrowingPrice: item?.borrowingPrice || '',
        imageUrls: initialImages,
      });
      updatePreviews(initialImages);
    } else {
      formik.resetForm();
      setPreviews([]);
    }
  }, [item, isOpen]);

  const handleFileChange = (files) => {
    if (files.length) {
      const allFiles = [...formik.values.imageUrls, ...files].slice(0, 5);
      formik.setFieldValue('imageUrls', allFiles);
      updatePreviews(allFiles);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const remainingFiles = formik.values.imageUrls.filter((_, index) => index !== indexToRemove);
    formik.setFieldValue('imageUrls', remainingFiles);
    updatePreviews(remainingFiles);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl max-h-[95vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{item ? 'Edit Item' : 'Add New Item'}</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input id="name" type="text" {...formik.getFieldProps('name')} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.name && formik.errors.name ? <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div> : null}
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
              <select id="category" {...formik.getFieldProps('category')} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a category</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
              {formik.touched.category && formik.errors.category ? <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div> : null}
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea id="description" rows="4" {...formik.getFieldProps('description')} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            {formik.touched.description && formik.errors.description ? <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div> : null}
          </div>
          <div>
            <label htmlFor="borrowingPrice" className="block text-sm font-semibold text-gray-700 mb-1">Borrowing Price (Rs)</label>
            <input id="borrowingPrice" type="number" step="0.01" {...formik.getFieldProps('borrowingPrice')} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
            {formik.touched.borrowingPrice && formik.errors.borrowingPrice ? <div className="text-red-500 text-sm mt-1">{formik.errors.borrowingPrice}</div> : null}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Images</label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon/>
                  <p className="mb-2 text-sm text-blue-700"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or WEBP (MAX. 5 images)</p>
                </div>
                <input id="dropzone-file" type="file" multiple className="hidden" onChange={(e) => handleFileChange(e.target.files)} accept="image/*"/>
              </label>
            </div>
            {formik.touched.imageUrls && formik.errors.imageUrls ? <div className="text-red-500 text-sm mt-1">{formik.errors.imageUrls}</div> : null}
          </div>
          
          {previews.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700">Image Previews</p>
              <div className="flex flex-wrap gap-4 mt-2 p-4 border rounded-lg bg-gray-50">
                {previews.map((previewUrl, index) => (
                  <div key={index} className="relative">
                    <img src={previewUrl} alt={`Preview ${index + 1}`} className="h-28 w-28 rounded-lg object-cover shadow-md" />
                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full hover:scale-110 transition-transform">
                      <XCircleIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-8 py-2.5 rounded-lg text-gray-800 bg-gray-200 hover:bg-gray-300 font-semibold transition">Cancel</button>
            <button type="submit" disabled={isCreating || isUpdating} className="px-8 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-semibold transition shadow-sm hover:shadow-lg disabled:bg-blue-300 disabled:cursor-not-allowed">
              {isCreating || isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemModal;
