import {
  getNotificationsApi,
  markNotificationsAsReadApi} from "../api/notificationApi"


export const getNotificationsService = async () => {
  try {
    const response = await getNotificationsApi();
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch notifications" };
  }
};


export const markNotificationsAsReadService = async () => {
  try {
    const response = await markNotificationsAsReadApi();
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to mark notifications as read" };
  }
};