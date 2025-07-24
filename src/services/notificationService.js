import {
  createBorrowRequestApi,
  getBorrowRequestsApi,
  updateBorrowRequestApi,
} from "../api/borrowAPI";

/**
 * @desc    Service function to create a borrow request.
 */
export const createBorrowRequestService = async (itemId) => {
  try {
    // The token is automatically attached by your axios interceptor,
    // but passing it ensures your hook has the dependency if needed.
    const response = await createBorrowRequestApi(itemId);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send borrow request." };
  }
};

/**
 * @desc    Service function to get all of the user's borrow requests.
 */
export const getBorrowRequestsService = async () => {
  try {
    const response = await getBorrowRequestsApi();
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch rental data." };
  }
};

/**
 * @desc    Service function to update a borrow request.
 */
export const updateBorrowRequestService = async (requestId, status) => {
  try {
    const response = await updateBorrowRequestApi(requestId, status);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update request." };
  }
};
