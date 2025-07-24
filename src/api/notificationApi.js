import axios from "./api"; // Your central axios instance

const resource = "/borrow";

/**
 * @desc    Direct API call to create a borrow request.
 * @route   POST /api/borrow/request/:itemId
 */
export const createBorrowRequestApi = (itemId) =>
  axios.post(`${resource}/request/${itemId}`);

/**
 * @desc    Direct API call to get all borrow requests for the current user.
 * @route   GET /api/borrow/requests
 */
export const getBorrowRequestsApi = () => axios.get(`${resource}/requests`);

/**
 * @desc    Direct API call to update a borrow request's status.
 * @route   PATCH /api/borrow/request/:requestId
 */
export const updateBorrowRequestApi = (requestId, status) =>
  axios.patch(`${resource}/request/${requestId}`, { status });