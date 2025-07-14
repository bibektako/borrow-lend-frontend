import {
  getItemsApi,
  getItemByIdApi,
  createItemApi,
  updateItemApi,
  deleteItemApi,
} from "../api/itemAPI";

export const getItemsService = async (filters) => {
  try {
    const response = await getItemsApi(filters);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch items" };
  }
};

export const getItemByIdService = async (id) => {
  try {
    const response = await getItemByIdApi(id);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch item details" };
  }
};

export const createItemService = async (formData, token) => {
  try {
    const response = await createItemApi(formData, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create item" };
  }
};

export const updateItemService = async (id, formData, token) => {
  try {
    const response = await updateItemApi(id, formData, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update item" };
  }
};

export const deleteItemService = async (id, token) => {
  try {
    const response = await deleteItemApi(id, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete item" };
  }
};
