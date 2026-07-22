import api from "./axios";

export const updateLocation = (data) =>
    api.patch("/users/location", data);

export const getAllUsers = () =>
    api.get("/users/all");