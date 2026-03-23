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

export const getDonorReviewsAPI = (donorId, listingId) =>
  API.get(`/reviews/donor/${donorId}`, {
    params: listingId ? { listingId } : undefined,
  });

export const createReviewAPI = (data) => API.post("/reviews", data);