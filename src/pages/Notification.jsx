import { useEffect } from "react";

import AppLayout from "../components/layout/AppLayout";

import NotificationItem from "../components/notification/NotificationItem";
import EmptyNotifications from "../components/notification/EmptyNotifications";

import {
    useNotificationStore,
} from "../store/notification.store";

function Notifications() {

    const notifications =
        useNotificationStore(
            (state) =>
                state.notifications
        );

    const fetchNotifications =
        useNotificationStore(
            (state) =>
                state.fetchNotifications
        );

    const markAsRead =
        useNotificationStore(
            (state) =>
                state.markAsRead
        );

    const markAllAsRead =
        useNotificationStore(
            (state) =>
                state.markAllAsRead
        );

    useEffect(() => {

        fetchNotifications();

    }, [fetchNotifications]);

    return (

        <AppLayout>

            <div className="mx-auto max-w-4xl space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">

                            Notifications 🔔

                        </h1>

                        <p className="mt-1 text-slate-500">

                            Stay updated with your local community.

                        </p>

                    </div>

                    {notifications.some(
                        (notification) =>
                            !notification.isRead
                    ) && (

                        <button
                            onClick={markAllAsRead}
                            className="
                                rounded-xl
                                bg-violet-600
                                px-5 py-3
                                font-semibold
                                text-white
                                hover:bg-violet-700
                            "
                        >

                            Mark all as read

                        </button>

                    )}

                </div>

                {/* Notification List */}
                {notifications.length > 0 ? (

                    <div className="space-y-4">

                        {notifications.map(
                            (notification) => (

                                <NotificationItem
                                    key={
                                        notification._id
                                    }
                                    notification={
                                        notification
                                    }
                                    onClick={() =>
                                        markAsRead(
                                            notification._id
                                        )
                                    }
                                />

                            )
                        )}

                    </div>

                ) : (

                    <EmptyNotifications />

                )}

            </div>

        </AppLayout>

    );

}

export default Notifications;