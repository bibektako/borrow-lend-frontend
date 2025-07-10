import {
  getReviewsApi,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
 } from "../api/reviewAPI" 

export const getReviewsService = async (itemId) => {
  try {
    const response = await getReviewsApi(itemId);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch reviews" };
  }
};

export const createReviewService = async (reviewData, token) => {
  try {
    const response = await createReviewApi(reviewData, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create review" };
  }
};

export const updateReviewService = async (reviewId, reviewData, token) => {
  try {
    const response = await updateReviewApi(reviewId, reviewData, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update review" };
  }
};

export const deleteReviewService = async (reviewId, token) => {
  try {
    const response = await deleteReviewApi(reviewId, token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete review" };
  }
};
