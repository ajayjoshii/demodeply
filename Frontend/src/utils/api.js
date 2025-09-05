
// // import axios from "axios";

// // const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// // const api = axios.create({
// //   baseURL: BASE_URL + "/api",
// //   headers: { "Content-Type": "application/json" },
// // });

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("adminToken"); // read fresh token each request
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // export default api;

// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// const api = axios.create({
//   baseURL: BASE_URL + "/api",
//   headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("adminToken");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL + "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach admin token automatically to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
