import { create } from "zustand";

import {
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser,
    updateProfile,
} from "../api/auth.api";

import {
    updateLocation as updateLocationAPI,
} from "../api/user.api";

import { socket } from "../socket/socket";

export const useAuthStore = create((set) => ({

    user: null,

    isAuthenticated: false,

    isCheckingAuth: true,

    isLoading: false,

    // ======================
    // Login
    // ======================

    login: async (data) => {

        try {

            set({ isLoading: true });

            const response =
                await loginUser(data);

            const user =
                response.data.data.user;

            set({

                user,
                isAuthenticated: true,
                isLoading: false,

            });

            if (!socket.connected) {
                socket.connect();
            }

            socket.emit("join", user._id);

            return response.data;

        } catch (error) {

            set({ isLoading: false });

            throw error;

        }

    },

    // ======================
    // Register
    // ======================

    register: async (data) => {

        try {

            set({ isLoading: true });

            const response =
                await registerUser(data);

            set({ isLoading: false });

            return response.data;

        } catch (error) {

            set({ isLoading: false });

            throw error;

        }

    },

    // ======================
    // Fetch Current User
    // ======================

    fetchCurrentUser: async () => {

        try {

            const response =
                await getCurrentUser();

            const user =
                response.data.data;

            set({

                user,
                isAuthenticated: true,
                isCheckingAuth: false,

            });

            if (!socket.connected) {
                socket.connect();
            }

            socket.emit("join", user._id);

        } catch {

            set({

                user: null,
                isAuthenticated: false,
                isCheckingAuth: false,

            });

        }

    },

    // ======================
    // Update Profile
    // ======================

    updateProfile: async (data) => {

        try {

            set({
                isLoading: true,
            });

            const response =
                await updateProfile(data);

            set({

                user: response.data.data,
                isLoading: false,

            });

            return response.data;

        } catch (error) {

            set({
                isLoading: false,
            });

            throw error;

        }

    },

    // ======================
    // Update Location
    // ======================

    updateLocation: async (data) => {

        const response =
            await updateLocationAPI(data);

        set({
            user: response.data.data,
        });

    },

    // ======================
    // Logout
    // ======================

    logout: async () => {

        try {

            await logoutUser();

        } finally {

            if (socket.connected) {
                socket.disconnect();
            }

            set({

                user: null,
                isAuthenticated: false,

            });

        }

    },

}));