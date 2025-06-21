import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050/api";

console.log("API Service is configured to use Base URL:", API_URL);

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (!token) {
      token = sessionStorage.getItem("token");
    }

    // 3. If a token is found in either location, attach it to the header.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token found and attached to request header.");
    } else {
      console.log("No token found in localStorage or sessionStorage.");
    }
  return config;
},
(error) => {
    return Promise.reject(error);
}
);

export default instance;
