import axios from './api';


export const getNotificationsApi = () => axios.get('/notifications');


export const markNotificationsAsReadApi = () => axios.patch('/notifications/read');