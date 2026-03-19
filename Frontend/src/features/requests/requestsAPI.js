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

export const createRequestAPI = (data) => API.post("/requests", data);
export const getMyRequestsAPI = () => API.get("/requests/mine");
export const getRequestsForListingAPI = (listingId) =>
  API.get(`/requests/listing/${listingId}`);
export const acceptRequestAPI = (requestId) =>
  API.patch("/requests/accept", { requestId });
