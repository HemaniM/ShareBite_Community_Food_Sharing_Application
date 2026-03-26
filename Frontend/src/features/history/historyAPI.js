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

export const getHistoryOverviewAPI = () => API.get("/requests/history");
export const getHistoryListingRequestsAPI = (listingId) =>
  API.get(`/requests/history/listing/${listingId}`);