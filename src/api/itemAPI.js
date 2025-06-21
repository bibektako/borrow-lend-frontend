import axios from "./api";

const resource = "/items";

// --- API Functions for Items ---

export const getItemsApi = (filters = {}) =>
  axios.get(resource, { params: filters });

export const getItemByIdApi = (id) =>
  axios.get(`${resource}/${id}`);

export const createItemApi = (formData, token) =>
  axios.post(resource, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // attach auth token
    },
  });

export const updateItemApi = (id, formData, token) =>
  axios.put(`${resource}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // attach auth token
    },
  });

export const deleteItemApi = (id, token) =>
  axios.delete(`${resource}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
