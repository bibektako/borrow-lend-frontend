import axios from "./api";
const resource = "/borrow";

export const createBorrowRequestApi = (itemId) =>
  axios.post(`${resource}/request/${itemId}`);

export const getBorrowRequestsApi = () => axios.get(`${resource}/requests`);

export const updateBorrowRequestApi = (requestId, status) =>
  axios.patch(`${resource}/request/${requestId}`, { status });
