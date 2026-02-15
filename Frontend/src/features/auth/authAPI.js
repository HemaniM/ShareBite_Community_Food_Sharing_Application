import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// Attach token automatically (later useful)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const loginUserAPI = (data) =>
  API.post("/auth/login", data);

export const registerUserAPI = (data) =>
  API.post("/auth/register", data);
