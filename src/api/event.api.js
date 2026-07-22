// import api from "./axios";

// export const getNearbyEvents = () =>
//     api.get("/events/nearby");

// export const createEvent = (data) =>
//     api.post("/events", data);

// export const joinEvent = (id) =>
//     api.post(`/events/${id}/join`);

// export const leaveEvent = (id) =>
//     api.delete(`/events/${id}/leave`);

import api from "./axios";
export const getNearbyEvents = () =>
    api.get("/events/nearby");

export const createEvent = async (data) => {

    console.log("🚀 API FUNCTION CALLED");

    try {

        const response =
            await api.post(
                "/events",
                data
            );

        console.log(
            "✅ API SUCCESS:",
            response.data
        );

        return response;

    } catch (error) {

        console.log(
            "❌ API ERROR:"
        );

        console.log(error);

        console.log(
            error.response?.data
        );

        throw error;

    }

};

export const joinEvent = (id) =>
    api.post(`/events/${id}/join`);

export const leaveEvent = (id) =>
    api.post(`/events/${id}/leave`);