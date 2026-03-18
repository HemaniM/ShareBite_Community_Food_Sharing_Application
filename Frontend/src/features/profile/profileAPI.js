import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getMyProfileAPI = () => API.get("/users/profile");
export const updateMyProfileAPI = (data) => API.put("/users/profile", data);
export const uploadProfileImageAPI = (data) =>
  API.post("/users/profile/image", data);