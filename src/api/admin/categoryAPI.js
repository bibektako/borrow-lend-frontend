import axios from "../api";

const resource = "/admin/category";

export const getAllCategoriesApi = () => axios.get(resource);

export const createCategoryApi = (formData) =>
  axios.post(resource, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateCategoryApi = (id, formData) =>
  axios.put(`${resource}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteCategoryApi = (id) => axios.delete(`${resource}/${id}`);
