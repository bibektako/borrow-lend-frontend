import axios from 'axios';


export const getNotificationsApi = () => axios.get('/notifications');


export const markNotificationsAsReadApi = () => axios.patch('/notifications/read');