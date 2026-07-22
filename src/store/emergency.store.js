import { create } from "zustand";

import {
    getNearbyEmergencies,
    createEmergency,
    resolveEmergency,
    getEmergencyById,
    respondToEmergency,
} from "../api/emergency.api";

export const useEmergencyStore = create((set, get) => ({

    // =====================================
    // State
    // =====================================

    emergencies: [],

    selectedEmergency: null,

    isLoading: false,

    // =====================================
    // Fetch Nearby Emergencies
    // =====================================

    fetchEmergencies: async () => {

        try {

            set({
                isLoading: true,
            });

            const response =
                await getNearbyEmergencies();

            set({

                emergencies:
                    response.data.data,

                isLoading: false,

            });

        }

        catch (error) {

            console.error(error);

            set({
                isLoading: false,
            });

        }

    },

    // =====================================
    // Fetch Single Emergency
    // =====================================

    fetchEmergencyById: async (id) => {

        try {

            set({
                isLoading: true,
            });

            const response =
                await getEmergencyById(id);

            set({

                selectedEmergency:
                    response.data.data,

                isLoading: false,

            });

        }

        catch (error) {

            console.error(error);

            set({

                selectedEmergency: null,

                isLoading: false,

            });

        }

    },

    // =====================================
    // Create Emergency
    // =====================================

    createNewEmergency: async (data) => {

        try {

            await createEmergency(data);

            await get().fetchEmergencies();

        }

        catch (error) {

            console.error(error);

        }

    },

    // =====================================
    // Resolve Emergency
    // =====================================

    resolveEmergencyById: async (id) => {

        try {

            await resolveEmergency(id);

            await get().fetchEmergencies();

        }

        catch (error) {

            console.error(error);

        }

    },

    // =====================================
    // Respond to Emergency
    // =====================================

    respondEmergency: async (

        id,

        data

    ) => {

        try {

            await respondToEmergency(

                id,

                data

            );

            // Refresh emergency details

            await get().fetchEmergencyById(id);

        }

        catch (error) {

            console.error(error);

        }

    },

    // =====================================
    // Real-time Socket Event
    // =====================================

    addEmergency: (emergency) => {

        set((state) => ({

            emergencies: [

                emergency,

                ...state.emergencies,

            ],

        }));

    },

}));