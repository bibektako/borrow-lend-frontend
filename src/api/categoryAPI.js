import axios from "./api";

const resource = "/admin/category";

// --- API Functions for Categories ---

export const getCategoriesApi = () => axios.get(resource);

export const createCategoryApi = (formData) =>
  axios.post(resource, formData, {
    // This header is required for file uploads. It overrides any default.
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateCategoryApi = (id, formData) =>
  axios.put(`${resource}/${id}`, formData, {
    // This header is also required for file uploads.
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteCategoryApi = (id) => axios.delete(`${resource}/${id}`);


