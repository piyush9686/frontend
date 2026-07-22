import axiosInstance from "./axios";

// Get All Lost & Found Posts
export const getAllLostFound = (params = {}) =>
  axiosInstance.get("/api/v1/lost-found", { params });

// Get Single Post
export const getLostFoundById = (id) =>
  axiosInstance.get(`/api/v1/lost-found/${id}`);

// Create Post
export const createLostFound = (formData) =>
  axiosInstance.post("/api/v1/lost-found", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update Post
export const updateLostFound = (id, formData) =>
  axiosInstance.put(`/api/v1/lost-found/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete Post
export const deleteLostFound = (id) =>
  axiosInstance.delete(`/api/v1/lost-found/${id}`);

// Mark as Found
export const markAsFound = (id) =>
  axiosInstance.patch(`/api/v1/lost-found/${id}/found`);

// Bookmark
export const bookmarkLostFound = (id) =>
  axiosInstance.post(`/api/v1/lost-found/${id}/bookmark`);

// Get Bookmarks
export const getBookmarks = () =>
  axiosInstance.get("/api/v1/lost-found/bookmarks");

// Contact Owner
export const contactOwner = (id) =>
  axiosInstance.post(`/api/v1/lost-found/${id}/contact`);

// My Posts
export const getMyLostFound = () =>
  axiosInstance.get("/api/v1/lost-found/my-items");

// Nearby Items
export const getNearbyItems = (params = {}) =>
  axiosInstance.get("/api/v1/lost-found/nearby", { params });

// Similar Items
export const getSimilarItems = (id) =>
  axiosInstance.get(`/api/v1/lost-found/${id}/similar`);

// Trending Items
export const getTrendingItems = () =>
  axiosInstance.get("/api/v1/lost-found/trending");

export const increaseViewCount=(id)=>
  axiosInstance.patch(`/api/v1/lost-found/${id}/view`)