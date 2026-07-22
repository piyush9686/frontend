import { create } from "zustand";

import {
    getNearbyEvents,
    createEvent,
    joinEvent,
    leaveEvent,
} from "../api/event.api";

export const useEventStore = create((set, get) => ({

    events: [],

    // =====================
    // Fetch Events
    // =====================

    fetchEvents: async () => {

        try {

            const response =
                await getNearbyEvents();

            set({
                events: response.data.data,
            });

        } catch (error) {

            console.error(
                "Fetch events error:",
                error
            );

        }

    },

    // =====================
    // Create Event
    // =====================

    // createNewEvent: async (data) => {

    //     try {

    //         console.log(
    //             "📤 Sending event:",
    //             data
    //         );

    //         const response =
    //             await createEvent(data);

    //         console.log(
    //             "✅ Event created:",
    //             response.data
    //         );

    //         await get().fetchEvents();

    //         return response.data;

    //     } catch (error) {

    //         console.error(
    //             "❌ Create event error:",
    //             error.response?.data ||
    //             error.message
    //         );

    //         throw error;

    //     }

    // },

createNewEvent: async (data) => {

    console.log("STEP 1");

    try {

        console.log("STEP 2", data);

        const response =
            await createEvent(data);

        console.log("STEP 3", response);

        await get().fetchEvents();

        return response.data;

    } catch (error) {

        console.log("STEP 4 ERROR");

        console.log(error);

        console.log(error.response);

        console.log(error.response?.data);

        throw error;

    }

},
    // =====================
    // Join Event
    // =====================

    joinEventById: async (id) => {

        try {

            await joinEvent(id);

            await get().fetchEvents();

        } catch (error) {

            console.error(error);

        }

    },

    // =====================
    // Leave Event
    // =====================

    leaveEventById: async (id) => {

        try {

            await leaveEvent(id);

            await get().fetchEvents();

        } catch (error) {

            console.error(error);

        }

    },

}));