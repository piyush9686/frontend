import api from "./axios";

export const registerUser = (data) =>
    api.post("/api/v1/auth/register", data);

export const loginUser = (data) =>
    api.post("/api/v1/auth/login", data);

export const logoutUser = () =>
    api.post("/api/v1/auth/logout");

export const getCurrentUser = () =>
    api.get("/api/v1/auth/me");

export const refreshToken = () =>
    api.post("/api/v1/auth/refresh-token");

export const updateProfile = (data) =>
    api.patch(
        "/api/v1/auth/profile",
        data
    );