import axios from "./api";

export const registerUserApi = (data) => axios.post("/auth/register", data)

export const loginUserApi = (data) => axios.post("/auth/login",data)

export const getBookmarksApi = () => axios.get('/auth/bookmarks');


export const addBookmarkApi = (itemId) => axios.post(`/auth/bookmarks/${itemId}`);


export const removeBookmarkApi = (itemId) => axios.delete(`/auth/bookmarks/${itemId}`);