import { create } from "zustand";
import { getFeed } from "../api/post.api";

export const usePostStore = create((set) => ({

    posts: [],
    isLoading: false,

    fetchFeed: async () => {

        try {

            set({ isLoading: true });

            const response =
                await getFeed();

            set({

                posts: response.data.data || [],
                isLoading: false,

            });

        } catch (error) {

            set({ isLoading: false });

            console.error(error);

        }

    },

}));