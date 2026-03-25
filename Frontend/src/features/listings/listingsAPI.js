import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const createListingAPI = (data) => API.post("/listings", data);
export const getActiveListingsAPI = () => API.get("/listings");
export const getFoodNearYouListingsAPI = (params = {}) =>
  API.get("/listings/home/food-near-you", { params });
export const getRecentlyUploadedListingsAPI = (params = {}) =>
  API.get("/listings/home/recently-uploaded", { params });
export const getHomepageFilteredListingsAPI = (params = {}) =>
  API.get("/listings/home/filtered", { params });
export const getMyListingsAPI = () => API.get("/listings/my");
export const deleteMyListingAPI = (listingId) =>
  API.delete(`/listings/${listingId}`);
