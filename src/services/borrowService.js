import { 
  createBorrowRequestApi,
  getBorrowRequestsApi,
  updateBorrowRequestApi
} from '../api/borrowAPI';

export const createBorrowRequestService = async (itemId) => {
  try {
    const response = await createBorrowRequestApi(itemId);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create borrow request" };
  }
};

export const getBorrowRequestsService = async () => {
    try {
        const response = await getBorrowRequestsApi();
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch borrow requests" };
    }
};

export const updateBorrowRequestService = async (requestId, status) => {
    try {
        const response = await updateBorrowRequestApi(requestId, status);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to update request" };
    }
};
