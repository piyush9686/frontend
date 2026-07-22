import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import { useUserStore } from "../store/user.store";
import { useChatStore } from "../store/chat.store";

function Users() {

    const navigate = useNavigate();

    const users = useUserStore(
        (state) => state.users
    );

    const fetchUsers = useUserStore(
        (state) => state.fetchUsers
    );

    const sendNewMessage = useChatStore(
        (state) => state.sendNewMessage
    );

    useEffect(() => {

        fetchUsers();

    }, []);

    const startChat = async (userId) => {

        try {

            // Creates a conversation automatically
            await sendNewMessage(
                userId,
                "👋 Hi!"
            );

            // Refresh conversations
            await useChatStore
                .getState()
                .fetchConversations();

            navigate("/chat");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <AppLayout>

            <div className="mx-auto max-w-4xl space-y-6">

                <h1 className="text-3xl font-bold">
                    Community Members 👥
                </h1>

                {users.length === 0 ? (

                    <div className="rounded-2xl bg-white p-8 text-center shadow">

                        No users found.

                    </div>

                ) : (

                    users.map((user) => (

                        <div
                            key={user._id}
                            className="flex items-center justify-between rounded-2xl bg-white p-5 shadow"
                        >

                            <div>

                                <h2 className="text-lg font-semibold">
                                    {user.name}
                                </h2>

                                <p className="text-sm text-slate-500">
                                    📍 {user.locationName || "Unknown"}
                                </p>

                                <p className="text-sm">

                                    {user.isOnline
                                        ? "🟢 Online"
                                        : "⚫ Offline"}

                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    startChat(user._id)
                                }
                                className="rounded-xl bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-700"
                            >
                                Message 💬
                            </button>

                        </div>

                    ))

                )}

            </div>

        </AppLayout>

    );

}

export default Users;