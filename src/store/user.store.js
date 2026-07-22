import { create } from "zustand";

import { getAllUsers } from "../api/user.api";

export const useUserStore = create((set) => ({

    users: [],

    fetchUsers: async () => {

        try {

            const response =
                await getAllUsers();

            set({
                users: response.data.data,
            });

        } catch (error) {

            console.error(error);

        }

    },

}));