import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import ConversationList from "../components/chat/ConversationList";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import TypingIndicator from "../components/chat/TypingIndicator";

import { useChatStore } from "../store/chat.store";
import { useAuthStore } from "../store/auth.store";

import { socket } from "../socket/socket";

function Chat() {

    const user = useAuthStore(
        (state) => state.user
    );

    const messages = useChatStore(
        (state) => state.messages
    );

    const selectedConversation = useChatStore(
        (state) => state.selectedConversation
    );

    const addMessage = useChatStore(
        (state) => state.addMessage
    );

    const updateUserStatus = useChatStore(
        (state) => state.updateUserStatus
    );

    const [typingUser, setTypingUser] =
        useState(false);

    // ==========================
    // Socket Listeners
    // ==========================

    useEffect(() => {

        // New message
        socket.on(
            "newMessage",
            (message) => {

                addMessage(message);

            }
        );

        // User online
        socket.on(
            "userOnline",
            (userId) => {

                updateUserStatus(
                    userId,
                    true
                );

            }
        );

        // User offline
        socket.on(
            "userOffline",
            ({
                userId,
                lastSeen,
            }) => {

                updateUserStatus(
                    userId,
                    false,
                    lastSeen
                );

            }
        );

        // Typing
        socket.on(
            "userTyping",
            () => {

                setTypingUser(true);

            }
        );

        // Stop typing
        socket.on(
            "userStoppedTyping",
            () => {

                setTypingUser(false);

            }
        );

        return () => {

            socket.off("newMessage");

            socket.off("userOnline");

            socket.off("userOffline");

            socket.off("userTyping");

            socket.off("userStoppedTyping");

        };

    }, [
        addMessage,
        updateUserStatus,
    ]);

    // ==========================
    // Receiver
    // ==========================

    const receiver =
        selectedConversation?.participants.find(

            (participant) =>

                participant._id !==
                user?._id

        );

    return (

        <AppLayout>

            <div className="flex h-[80vh] overflow-hidden rounded-2xl bg-white shadow">

                {/* Conversations */}

                <div className="w-80 border-r">

                    <ConversationList />

                </div>

                {/* Messages */}

                <div className="flex flex-1 flex-col">

                    {!selectedConversation ? (

                        <div className="flex flex-1 items-center justify-center text-slate-500">

                            Select a conversation 💬

                        </div>

                    ) : (

                        <>

                            {/* Header */}

                            <div className="border-b p-4">

                                <div className="flex items-center gap-3">

                                    <div>

                                        <h2 className="text-lg font-bold">

                                            {receiver?.name}

                                        </h2>

                                        <p className="text-sm text-slate-500">

                                            {receiver?.isOnline
                                                ? "🟢 Online"
                                                : receiver?.lastSeen
                                                    ? `Last seen ${new Date(
                                                          receiver.lastSeen
                                                      ).toLocaleTimeString()}`
                                                    : "Offline"}

                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Messages */}

                            <div className="flex-1 space-y-4 overflow-y-auto p-4">

                                {messages.map(
                                    (message) => (

                                        <MessageBubble
                                            key={message._id}
                                            message={message}
                                            currentUser={user}
                                        />

                                    )
                                )}

                            </div>

                            {/* Typing */}

                            {typingUser && (

                                <TypingIndicator
                                    name={
                                        receiver?.name
                                    }
                                />

                            )}

                            {/* Input */}

                            <MessageInput
                                receiverId={
                                    receiver?._id
                                }
                            />

                        </>

                    )}

                </div>

            </div>

        </AppLayout>

    );

}

export default Chat;