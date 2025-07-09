import { getItemsApi, verifyItemApi } from "../../api/itemAPI";

export const getUnverifiedItemsService = async () => {
  try {
    const response = await getItemsApi({ isVerified: false });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch unverified items" };
  }
};


export const verifyItemService = async (id, token) => {
  try {
    const response = await verifyItemApi(id, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to verify item" };
  }
};