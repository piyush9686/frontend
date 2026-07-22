import { create } from "zustand";

import {
    getNotifications,
    markNotificationAsRead,
} from "../api/notification.api";

export const useNotificationStore =
    create((set, get) => ({

        notifications: [],

        fetchNotifications: async () => {

            const response =
                await getNotifications();

            set({
                notifications:
                    response.data.data,
            });

        },

        markAsRead: async (id) => {

            await markNotificationAsRead(id);

            set({

                notifications:
                    get().notifications.map(

                        (notification) =>

                            notification._id === id

                                ? {
                                      ...notification,
                                      isRead: true,
                                  }

                                : notification

                    ),

            });

        },

        markAllAsRead: () => {

            set({

                notifications:
                    get().notifications.map(

                        (notification) => ({

                            ...notification,
                            isRead: true,

                        })

                    ),

            });

        },

        unreadCount: () => {

            return get().notifications.filter(

                (notification) =>
                    !notification.isRead

            ).length;

        },

    }));