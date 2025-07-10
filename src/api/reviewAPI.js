import axios from "./api"; 

const resource = "/reviews"; 


export const getReviewsApi = (itemId) => {
 
  return axios.get(resource, { params: { item_id: itemId } });
};


export const createReviewApi = (reviewData, token) => {
  return axios.post(`${resource}/create`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateReviewApi = (reviewId, reviewData, token) => {
  return axios.put(`${resource}/${reviewId}`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const deleteReviewApi = (reviewId, token) => {
  return axios.delete(`${resource}/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
