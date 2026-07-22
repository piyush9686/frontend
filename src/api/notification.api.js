import api from "./axios";

export const getNotifications =
    () => api.get("/api/v1/notifications");

export const markNotificationAsRead =
    (id) =>
        api.patch(
            `/api/v1/notifications/${id}/read`
        );